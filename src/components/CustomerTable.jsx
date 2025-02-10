import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { deleteCustomer } from "../services/customerApi";
import ConfirmDeleteModal from "../components/ConfirmDelete";

const CustomerTable = ({ customers, onEdit, onDelete, setCustomers }) => {
  const [showModal, setShowModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleDelete = (customerId) => {
    setCustomerToDelete(customers.find((customer) => customer.customerId === customerId));
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete.customerId)
        .then(() => {
          setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.customerId !== customerToDelete)
          );
          onDelete("Customer deleted successfully");
        })
        .catch(() => {
          onDelete("Error deleting customer");
        })
        .finally(() => {
          setShowModal(false);
          setCustomerToDelete(null);
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCustomerToDelete(null);
  };

  if (!customers || customers.length === 0) return <p>No customers found.</p>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>City</th>
            <th>Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.customerName}</td>
              <td>{customer.customerType}</td>
              <td>{customer.customerAddress.streetNumber}</td>
              <td>{customer.customerAddress.postalCode}</td>
              <td>{customer.customerAddress.city}</td>
              <td>{customer.customerAddress.province}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(customer)}>
                  Update
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(customer.customerId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDeleteModal
        show={showModal}
        confirmationMessage={`Are you sure you want to delete customer ${customerToDelete ? customerToDelete.customerName : ""}?`}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CustomerTable;
