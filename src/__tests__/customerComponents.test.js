import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import CustomersPage from "../pages/CustomersPage";
import { createCustomer, updateCustomer, deleteCustomer, getCustomers } from "../services/customerApi";

jest.mock("../services/customerApi");

// Sample customer data
const mockCustomer = {
  customerId: "1",
  customerName: "John Doe",
  customerType: "Person",
  customerAddress: {
    streetNumber: "123",
    postalCode: "A1B2C3",
    city: "Toronto",
    province: "ON",
  },
};

// CustomerForm Tests
describe("CustomerForm Component", () => {
  test("renders form with correct initial values", () => {
    render(<CustomerForm customer={mockCustomer} onSave={jest.fn()} onError={jest.fn()} />);
    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/street number/i)).toHaveValue("123");
  });

  test("updates form input values", () => {
    render(<CustomerForm customer={mockCustomer} onSave={jest.fn()} onError={jest.fn()} />);
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    expect(nameInput).toHaveValue("Jane Doe");
  });

  test("calls createCustomer on form submit", async () => {
    createCustomer.mockResolvedValue({});
    const onSave = jest.fn();
    render(<CustomerForm onSave={onSave} onError={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "New Customer" } });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(createCustomer).toHaveBeenCalled());
  });
});

// CustomerTable Tests
describe("CustomerTable Component", () => {
  test("renders customer data correctly", () => {
    render(<CustomerTable customers={[mockCustomer]} onEdit={jest.fn()} onDelete={jest.fn()} setCustomers={jest.fn()} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("calls onEdit when update button is clicked", () => {
    const onEdit = jest.fn();
    render(<CustomerTable customers={[mockCustomer]} onEdit={onEdit} onDelete={jest.fn()} setCustomers={jest.fn()} />);
    fireEvent.click(screen.getByText(/update/i));
    expect(onEdit).toHaveBeenCalledWith(mockCustomer);
  });
});

// CustomersPage Tests
describe("CustomersPage Component", () => {
  test("fetches and displays customers", async () => {
    getCustomers.mockResolvedValue([mockCustomer]);
    render(<CustomersPage />);
    await waitFor(() => expect(getCustomers).toHaveBeenCalled());
    const customerName = await screen.findByText("John Doe");
    expect(customerName).toBeInTheDocument();
  });

  test("deletes a customer when delete button is clicked", async () => {
    getCustomers.mockResolvedValue([mockCustomer]);
    deleteCustomer.mockResolvedValue({ success: true });
    render(<CustomersPage />);
    await waitFor(() => expect(getCustomers).toHaveBeenCalled());
    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);
    await waitFor(() => expect(deleteCustomer).toHaveBeenCalled());
  });
});
