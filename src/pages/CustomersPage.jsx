import React, { useState, useEffect } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import Alert from "../components/Alert";
import { getCustomers, searchCustomerById, searchCustomersByCity, searchCustomersByName, searchCustomersByPostalCode, searchCustomersByProvince } from "../services/customerApi";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState({ category: "customerId", value: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [searchError, setSearchError] = useState({ message: "", type: "" });

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
      setAlert({ message: "Customers fetched successfully!", type: "success" });
    } catch (error) {
      console.error("Error fetching customers:", error);
      setAlert({message: "Error fetching customers", type: "danger"});
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAlertClose = () => setAlert({ message: "", type: "" });
  const handleSearchErrorClose = () => setSearchError({ message: "", type: "" });

  const handleSearchChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (!search.value.trim()) {
        setFilteredCustomers(customers);
        setSearchError({ message: "", type: "" });
        return;
      }

      const performSearch = async () => {
        try {
          setSearchError({ message: "", type: "" });
          let data = [];
          const searchValue = search.value.toLowerCase();

          if (search.category === "customerId") {
            const response = await searchCustomerById(search.value);
            data = response ? [response] : [];
          } else if (search.category === "customerName") {
            const response = await searchCustomersByName(search.value);
            data = response.filter((customer) =>
              customer.customerName.toLowerCase().includes(searchValue)
            );
          } else if (search.category === "city") {
            const response = await searchCustomersByCity(search.value);
            data = response.filter((customer) =>
              customer.customerAddress.city.toLowerCase().includes(searchValue)
            );
          } else if (search.category === "postalCode") {
            const response = await searchCustomersByPostalCode(search.value);
            data = response.filter((customer) =>
              customer.customerAddress.postalCode.toLowerCase().includes(searchValue)
            );
          } else if (search.category === "province") {
            const response = await searchCustomersByProvince(search.value);
            data = response.filter((customer) =>
              customer.customerAddress.province.toLowerCase().includes(searchValue)
            );
          }

          if (!data.length) {
            throw new Error(`No customers found for ${search.category}: "${search.value}"`);
          }
      
          setFilteredCustomers(data);
      
          setSearchError({
            message: `Found ${data.length} customer(s) matching your search for "${search.value}".`,
            type: "success",
          });
      
        } catch (error) {
          console.error("Search error:", error);
      
          if (error.response && error.response.status === 404) {
            setSearchError({
              message: `No customers found for ${search.category}: "${search.value}".`,
              type: "danger",
            });
          } else {
            setSearchError({
              message: "An error occurred while searching. Please try again.",
              type: "danger",
            });
          }
        }
      };

      performSearch();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [search.value, search.category, customers]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Customers</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Customer
        </button>
      </div>

      <Alert message={alert.message} type={alert.type} onClose={handleAlertClose} />

      <div className="d-flex mb-4">
        <select
          className="form-select me-2 w-auto"
          name="category"
          value={search.category}
          onChange={handleSearchChange}
        >
          <option value="customerId">ID</option>
          <option value="customerName">Name</option>
          <option value="city">City</option>
          <option value="postalCode">Postal Code</option>
          <option value="province">Province</option>
        </select>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search customer by ID, name, city, postal code, or province"
          name="value"
          value={search.value}
          onChange={handleSearchChange}
        />
        {search.value && (
          <button className="btn btn-secondary ms-2" onClick={() => setSearch({ category: "customerId", value: "" })}>
            Clear
          </button>
        )}
      </div>

      {searchError.message && (
        <Alert message={searchError.message} type={searchError.type} onClose={handleSearchErrorClose} />
      )}
      <hr />

      <CustomerTable
        customers={filteredCustomers}
        onDelete={(msg) => {
          setAlert({ message: msg, type: "success" });
          fetchCustomers();
        }}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setShowModal(true);
        }}
        setCustomers={setCustomers}
      />

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCustomer ? "Update Customer" : "Add New Customer"}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <CustomerForm
                  customer={selectedCustomer}
                  onSave={(msg) => {
                    setAlert({ message: msg, type: "success" });
                    fetchCustomers();
                  }}
                  onError={(msg) => setAlert({ message: msg, type: "danger" })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
