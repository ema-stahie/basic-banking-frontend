import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

const extractErrorMessage = (error) => {
  if (error.response) {
    return `Error ${error.response.status}: ${error.response.data?.message || "Unexpected server error"}`;
  } else if (error.request) {
    return "No response received from server. Please check your network.";
  } else {
    return `Request error: ${error.message}`;
  }
};

export const getAccounts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(extractErrorMessage(error));
    throw new Error(extractErrorMessage(error));
  }
};

export const createSavingsAccount = async (savingsAccount) => {
  try {
    const response = await axios.post(`${API_URL}/savings`, savingsAccount);
    return response.data;
  } catch (error) {
    console.error(extractErrorMessage(error));
    throw new Error(extractErrorMessage(error));
  }
};

export const createCheckingAccount = async (checkingAccount) => {
  try {
    const response = await axios.post(`${API_URL}/checking`, checkingAccount);
    return response.data;
  } catch (error) {
    console.error(extractErrorMessage(error));
    throw new Error(extractErrorMessage(error));
  }
};

export const updateAccount = async (accountId, updatedAccount) => {
  try {
    const response = await axios.put(`${API_URL}/${accountId}`, updatedAccount);
    return response.data;
  } catch (error) {
    console.error(`Failed to update account ${accountId}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteAccount = async (accountId) => {
  try {
    await axios.delete(`${API_URL}/${accountId}`);
  } catch (error) {
    console.error(`Failed to delete account ${accountId}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await axios.get(`${API_URL}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch account ${accountId}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const getAccountsByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch accounts for customer ${customerId}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const getAccountsByCity = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/search/city/${city}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching accounts for city ${city}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};

export const getAccountsByBalance = async (balance) => {
  try {
    const response = await axios.get(`${API_URL}/search/balance/${balance}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching accounts with balance ${balance}: ${extractErrorMessage(error)}`);
    throw new Error(extractErrorMessage(error));
  }
};
