# React Application for Customer and Account Management

This project is split into two separate repositories:

- **Frontend:** A React application that provides a user-friendly interface for managing customers and accounts.
- **Backend:** A Spring Boot application that exposes RESTful APIs for customer and account management and uses H2 as its database.

---

## Repositories

- **Frontend Repository:**  
  [basic-banking-frontend](https://github.com/ema-stahie/basic-banking-frontend.git)

- **Backend Repository:**  
  [basic-banking-backend](https://github.com/ema-stahie/basic-banking-backend.git)

---

## Table of Contents

1. [Installation](#installation)
    - [Frontend Installation](#frontend-installation)
    - [Backend Installation](#backend-installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Technologies](#technologies)
5. [License](#license)
6. [Acknowledgments](#acknowledgments)

---

## Installation

### Frontend Installation

1. **Clone the Frontend Repository:**
    ```bash
    git clone https://github.com/ema-stahie/basic-banking-frontend.git
    ```

2. **Navigate to the Project Folder:**
    ```bash
    cd basic-banking-frontend
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Run the Application:**
    ```bash
    npm start
    ```
    This will start the development server and open the application in your default web browser.

---

### Backend Installation

1. **Clone the Backend Repository:**
    ```bash
    git clone https://github.com/ema-stahie/basic-banking-backend.git
    ```

2. **Navigate to the Project Folder:**
    ```bash
    cd basic-banking-backend
    ```

3. **Build and Run the Spring Boot Application:**

   If you're using Maven:
   ```bash
   mvn spring-boot:run

---

## Usage

Once the app is running, you can interact with the following features:

1. **Customers**:
   - Add, update, delete, and search customers by various criteria (ID, name, city, postal code, province).
   
2. **Accounts**:
   - Add, update, delete, and search accounts by different filters (account ID, customer ID, city, balance).
   
3. **Search Functionality**:
   - You can search for customers or accounts with a live search feature that updates results as you type.
   
4. **Modals**:
   - Use modals to add or update customer and account information.

---

## Features

- **Customer Management**:
  - Add new customers
  - Edit customer details
  - Delete customers
  - Search customers by ID, name, city, postal code, or province
  
- **Account Management**:
  - Add new accounts
  - Edit account details
  - Delete accounts
  - Search accounts by ID, customer ID, city, or balance

- **Responsive Design**:
  - The application is fully responsive and works on both desktop and mobile devices.

---

## Technologies

This application uses the following technologies:

- **Frontend**:
  - React
  - JavaScript (ES6+)
  - React Hooks (useState, useEffect)
  - Bootstrap (for responsive design)
  - Axios (for API requests)
  
- **Backend**:
  - Spring Boot
  - Java
  - RESTful API design
  - H2 Database

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **React Documentation**: [React Docs](https://reactjs.org/docs/getting-started.html)
- **Bootstrap**: [Bootstrap Docs](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- **Axios**: [Axios Docs](https://axios-http.com/docs/intro)


---

- Contributions are welcome! Please submit a pull request to contribute to the project.
