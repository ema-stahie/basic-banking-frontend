import React, { useState, useEffect } from "react";
import { createCustomer, updateCustomer } from "../services/customerApi";

const CustomerForm = ({ customer, onSave, onError}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Person",
    customerAddress: {
      streetNumber: "",
      postalCode: "",
      city: "",
      province: "",
    }
  });

  const isUpdateMode = Boolean(customer);

  useEffect(() => {
    if (customer) {
      setFormData((prevData) => {
        const newData = {
          name: customer.customerName,
          type: customer.customerType,
          customerAddress: { 
            streetNumber: customer.customerAddress.streetNumber,
            postalCode: customer.customerAddress.postalCode,
            city: customer.customerAddress.city,
            province: customer.customerAddress.province,
           }
        };
        return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      customerAddress: {
        ...prevData.customerAddress,
        [name]: value,
      },
      ...(name === "name" || name === "type" ? { [name]: value } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerData = {
      customerId: customer?.customerId,
      customerName: formData.name,
      customerType: formData.type,
      customerAddress: formData.customerAddress,
    };

    const apiCall = customer
      ? updateCustomer(customer.customerId, customerData)
      : createCustomer(customerData);

    apiCall
      .then(() => {
        onSave(customer ? "Customer updated successfully" : "Customer created successfully");
      })
      .catch(() => {
        onError(customer ? "Error updating customer" : "Error creating customer");
      });
  };

  return (
    <form role="form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      {!customer && (
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="Person">Person</option>
            <option value="Company">Company</option>
          </select>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="streetNumber" className="form-label">Street Number</label>
        <input
          type="text"
          className="form-control"
          id="streetNumber"
          name="streetNumber"
          value={formData.customerAddress.streetNumber}
          onChange={handleInputChange}
          disabled={isUpdateMode}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="postalCode" className="form-label">Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          name="postalCode"
          value={formData.customerAddress.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={formData.customerAddress.city}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="province" className="form-label">Province</label>
        <input
          type="text"
          className="form-control"
          id="province"
          name="province"
          value={formData.customerAddress.province}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-success">
        {customer ? "Update Customer" : "Add Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
