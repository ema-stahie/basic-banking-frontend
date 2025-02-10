import React, { useState, useEffect } from "react";
import AccountsTable from "../components/AccountsTable";
import AccountsForm from "../components/AccountsForm";
import Alert from "../components/Alert";
import { getAccounts, getAccountById, getAccountsByCity, getAccountsByCustomer, getAccountsByBalance } from "../services/accountsApi";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [search, setSearch] = useState({ category: "accountId", value: "" });
  const [accountType, setAccountType] = useState("CheckingAccount");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [searchError, setSearchError] = useState({ message: "", type: "" });

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(Array.isArray(data) ? data : []);
      setFilteredAccounts(Array.isArray(data) ? data : []);
      setAlert({ message: "Accounts fetched successfully!", type: "success" });
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setAlert({ message: "Error fetching accounts", type: "danger" });
    }
  };

  useEffect(() => {
    fetchAccounts();
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
        setFilteredAccounts(accounts);
        setSearchError({ message: "", type: "" });
        return;
      }

      const performSearch = async () => {
        try {
          setSearchError({ message: "", type: "" });
          let data = [];

          if (search.category === "accountId") {
            const response = await getAccountById(search.value);
            data = response ? [response] : [];
          } else if (search.category === "customerId") {
            const response = await getAccountsByCustomer(search.value);
            data = response;
          } else if (search.category === "city") {
            const response = await getAccountsByCity(search.value);
            data = response;
          } else if (search.category === "balance") {
            const response = await getAccountsByBalance(search.value);
            data = response;
          }

          if (!data.length) {
            throw new Error(`No accounts found for ${search.category}: "${search.value}"`);
          }
      
          setFilteredAccounts(data);
      
          setSearchError({
            message: `Found ${data.length} account(s) matching your search for "${search.value}".`,
            type: "success",
          });
      
        } catch (error) {
          console.error("Search error:", error);
      
          if (error.response && error.response.status === 404) {
            setSearchError({
              message: `No accounts found for ${search.category}: "${search.value}".`,
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
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search.value, search.category, accounts]);

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setAccountType(account.accountType);
    setShowModal(true);
  };

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setShowModal(true);
  };

  const handleSaveSuccess = () => {
    fetchAccounts();
    setAlert({ message: "Account saved successfully", type: "success" });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Accounts</h2>
        <div>
          <button className="btn btn-primary" onClick={handleCreateAccount}>
            Create Account
          </button>
        </div>
      </div>

      <Alert message={alert.message} type={alert.type} onClose={handleAlertClose} />

      <div className="d-flex mb-4">
        <select
          className="form-select me-2 w-auto"
          name="category"
          value={search.category}
          onChange={handleSearchChange}
        >
          <option value="accountId">Account ID</option>
          <option value="customerId">Customer ID</option>
          <option value="city">City</option>
          <option value="balance">Balance</option>
        </select>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search account by ID, customer ID, city, or balance"
          name="value"
          value={search.value}
          onChange={handleSearchChange}
        />
        {search.value && (
          <button className="btn btn-secondary ms-2" onClick={() => setSearch({ category: "accountId", value: "" })}>
            Clear
          </button>
        )}
      </div>
      {searchError.message && (
      <Alert message={searchError.message} type={searchError.type} onClose={handleSearchErrorClose} />
      )}
      <hr />

      <AccountsTable
        accounts={filteredAccounts}
        onDelete={(msg) => {
          setAlert({ message: msg, type: "success" });
          fetchAccounts();
        }}
        onEdit={handleEdit}
        setAccounts={setFilteredAccounts}
      />

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedAccount ? "Update Account" : `Add Account`}
                </h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <AccountsForm
                  account={selectedAccount}
                  accountType={accountType}
                  onSave={(msg) => {
                    setAlert({ message: msg, type: "success" });
                    fetchAccounts();
                    handleSaveSuccess();
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

export default AccountsPage;
