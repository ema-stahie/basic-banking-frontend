import React, { useState, useEffect } from "react";
import { createSavingsAccount, createCheckingAccount, updateAccount } from "../services/accountsApi";

const AccountsForm = ({ account, accountType, onSave, onError }) => {
  const [formData, setFormData] = useState({
    accountId: "",
    accountType: accountType || "CheckingAccount",
    balance: 0,
    customerId: "",
    interestRate: 0,
    nextCheckNumber: 0,
  });

  const isUpdateMode = Boolean(account);

  useEffect(() => {
    if (account) {
      setFormData({
        accountId: account.accountId,
        accountType: account.accountType,
        balance: account.balance,
        customerId: account.customerId,
        interestRate: account.interestRate || 0,
        nextCheckNumber: account.nextCheckNumber || 0,
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        accountType: accountType || "CheckingAccount",
      }));
    }
  }, [account, accountType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAccountTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      accountType: selectedType,
      nextCheckNumber: selectedType === "CheckingAccount" ? prevData.nextCheckNumber : 0,
      interestRate: selectedType === "SavingsAccount" ? prevData.interestRate : 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const accountData = {
      accountType: formData.accountType,
      balance: formData.balance,
      customerId: formData.customerId,
      interestRate: formData.accountType === "SavingsAccount" ? formData.interestRate : undefined,
      nextCheckNumber: formData.accountType === "CheckingAccount" ? formData.nextCheckNumber : undefined,
    };

    const apiCall = isUpdateMode
      ? updateAccount(account.accountId, accountData)
      : (formData.accountType === "SavingsAccount" ? createSavingsAccount : createCheckingAccount)(accountData);

    apiCall
      .then(() => {
        onSave();
      })
      .catch((err) => {
        console.error("Error:", err);
        onError("Error creating or updating account");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isUpdateMode && (
        <div className="mb-3">
          <label htmlFor="accountType" className="form-label">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleAccountTypeChange}
            className="form-control"
            required
          >
            <option value="CheckingAccount">Checking</option>
            <option value="SavingsAccount">Savings</option>
          </select>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="balance" className="form-label">Balance</label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={formData.balance}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="customerId" className="form-label">Customer ID</label>
        <input
          type="text"
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleInputChange}
          className="form-control"
          disabled={isUpdateMode}
          required
        />
      </div>

      {formData.accountType === "SavingsAccount" && (
        <div className="mb-3">
          <label htmlFor="interestRate" className="form-label">Interest Rate</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
      )}

      {formData.accountType === "CheckingAccount" && (
        <div className="mb-3">
          <label htmlFor="nextCheckNumber" className="form-label">Next Check Number</label>
          <input
            type="number"
            id="nextCheckNumber"
            name="nextCheckNumber"
            value={formData.nextCheckNumber}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        {isUpdateMode ? "Update Account" : "Create Account"}
      </button>
    </form>
  );
};

export default AccountsForm;
