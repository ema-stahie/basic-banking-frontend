import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export const getCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const createCustomer = async (customer) => {
  try {
    const response = await axios.post(API_URL, customer);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateCustomer = async (customerId, updatedCustomer) => {
  try {
    const response = await axios.put(`${API_URL}/${customerId}`, updatedCustomer);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    await axios.delete(`${API_URL}/${customerId}`);
  } catch (error) {
    console.error("Error deleting customer:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const searchCustomersByName = async (name) => {
  const response = await axios.get(`${API_URL}/search-by-name?name=${name}`);
  return response.data;
};

export const searchCustomersByCity = async (city) => {
  const response = await axios.get(`${API_URL}/search-by-city?city=${city}`);
  return response.data;
};

export const searchCustomerById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const searchCustomersByPostalCode = async (postalCode) => {
  try {
    const response = await axios.get(`${API_URL}/search/postalCode`, {
      params: { postalCode }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching customers with postal code ${postalCode}:`, error.response?.data?.message || error.message);
    throw error;
  }
};

export const searchCustomersByProvince = async (province) => {
  try {
    const response = await axios.get(`${API_URL}/search/province`, {
      params: { province }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching customers in province ${province}:`, error.response?.data?.message || error.message);
    throw error;
  }
};