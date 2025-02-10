import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteAccount } from "../services/accountsApi";
import ConfirmDeleteModal from "./ConfirmDelete";

const AccountTable = ({ accounts, onEdit, setAccounts, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  const handleDelete = (accountId) => {
    setAccountToDelete(accounts.find((account) => account.accountId === accountId));
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (accountToDelete) {
      deleteAccount(accountToDelete.accountId)
        .then(() => {
          setAccounts((prevAccounts) =>
            prevAccounts.filter((account) => account.accountId !== accountToDelete.accountId)
          );
          onDelete("Account deleted successfully");
        })
        .catch(() => {
          onDelete("Error deleting account");
        })
        .finally(() => {
          setShowModal(false);
          setAccountToDelete(null);
        });
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Customer ID</th>
            <th colSpan={2} style={{ textAlign: "center" }}>
              Account Specific Info
            </th>
            <th>Actions</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ textAlign: "center" }}>Interest Rate</th>
            <th style={{ textAlign: "center" }}>Next Check Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr data-testid={`account-row-${account.accountId}`} key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.accountType}</td>
              <td>{account.balance}</td>
              <td>{account.customerId}</td>
              <td>
                {account.accountType === "SavingsAccount"
                  ? account.interestRate || "N/A"
                  : "N/A"}
              </td>
              <td>
                {account.accountType === "CheckingAccount"
                  ? account.nextCheckNumber || "N/A"
                  : "N/A"}
              </td>
              <td>
                <Button variant="warning" onClick={() => onEdit(account)}>
                  Update
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(account.accountId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDeleteModal
        show={showModal}
        confirmationMessage={`Are you sure you want to delete account with ID ${accountToDelete ? accountToDelete.accountId : ""}?`}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AccountTable;