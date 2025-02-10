import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import AccountsForm from '../components/AccountsForm';
import { getAccounts, getAccountsByBalance, createCheckingAccount, createSavingsAccount, updateAccount, deleteAccount, getAccountsByCustomer, getAccountById, getAccountsByCity } from '../services/accountsApi';
import AccountTable from '../components/AccountsTable';
import AccountsPage from '../pages/AccountsPage';

// Mock API calls
jest.mock('../services/accountsApi', () => ({
  createSavingsAccount: jest.fn(),
  createCheckingAccount: jest.fn(),
  updateAccount: jest.fn(),
  deleteAccount: jest.fn(),
  getAccounts: jest.fn(),
  getAccountsByCustomer: jest.fn(),
  getAccountById: jest.fn(),
  getAccountsByCity: jest.fn(),
  getAccountsByBalance: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
  
    getAccounts.mockResolvedValue([]);
    getAccountById.mockResolvedValue(null);
    getAccountsByCustomer.mockResolvedValue([]);
    getAccountsByCity.mockResolvedValue([]);
    getAccountsByBalance.mockResolvedValue([]);
    createCheckingAccount.mockResolvedValue({});
    createSavingsAccount.mockResolvedValue({});
    updateAccount.mockResolvedValue({});
    deleteAccount.mockResolvedValue({});
  });

describe('AccountsForm', () => {
  it('should render the form correctly for creating an account', () => {
    render(<AccountsForm onSave={jest.fn()} onError={jest.fn()} />);

    expect(screen.getByLabelText(/Balance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
  });

  it('should render the form correctly for updating an account', () => {
    const account = {
      accountId: '1',
      accountType: 'CheckingAccount',
      balance: 500,
      customerId: '123',
      interestRate: 0,
      nextCheckNumber: 100,
    };

    render(<AccountsForm account={account} onSave={jest.fn()} onError={jest.fn()} />);

    expect(screen.getByLabelText(/Balance/i).value).toBe('500');
    expect(screen.getByLabelText(/Customer ID/i).value).toBe('123');
    if (account.accountType === "CheckingAccount") {
        expect(screen.getByLabelText(/Next Check Number/i)).toBeInTheDocument();
      }
      if (account.accountType === "SavingsAccount") {
        expect(screen.getByLabelText(/Interest Rate/i)).toBeInTheDocument();
      }
  });

  it('should call the createSavingsAccount function when a savings account is created', async () => {
    const createSavingsAccountMock = require('../services/accountsApi').createSavingsAccount;
    createSavingsAccountMock.mockResolvedValue({});
  
    render(<AccountsForm accountType="SavingsAccount" onSave={jest.fn()} onError={jest.fn()} />);
  
    fireEvent.change(screen.getByLabelText(/balance/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText('Create Account'));
  
    expect(createSavingsAccountMock).toHaveBeenCalledTimes(1);
  });

  it('should call the updateAccount function when updating an account', async () => {
    const account = {
      accountId: '1',
      accountType: 'CheckingAccount',
      balance: 500,
      customerId: '123',
      interestRate: undefined,
      nextCheckNumber: 100,
    };
    updateAccount.mockResolvedValue({});

    render(<AccountsForm account={account} onSave={jest.fn()} onError={jest.fn()} />);

    await waitFor(() => {
        fireEvent.change(screen.getByLabelText(/Balance/i), { target: { value: 600 } });
        fireEvent.click(screen.getByText(/Update Account/i));
      });

    await waitFor(() => expect(updateAccount).toHaveBeenCalledWith("1", expect.objectContaining({
        balance: "600",
        accountType: 'CheckingAccount',
        customerId: '123',
        interestRate: undefined,
        nextCheckNumber: 100,
      })));
  });
});

describe('AccountTable', () => {
    it('should display the accounts correctly', async () => {
      const accounts = [
        { accountId: '1', accountType: 'CheckingAccount', balance: 1000, customerId: '123' },
        { accountId: '2', accountType: 'SavingsAccount', balance: 2000, customerId: '456' },
      ];
  
      render(<AccountTable accounts={accounts} onEdit={jest.fn()} setAccounts={jest.fn()} onDelete={jest.fn()} />);
  
      await waitFor(() => {
        const accountRow1 = screen.getByTestId('account-row-1');
        expect(accountRow1).toBeInTheDocument();
      });
    });
  
    it('should show the delete confirmation modal when delete button is clicked', () => {
      const accounts = [
        { accountId: '1', accountType: 'CheckingAccount', balance: 1000, customerId: '123' },
      ];
  
      render(<AccountTable accounts={accounts} onEdit={jest.fn()} setAccounts={jest.fn()} onDelete={jest.fn()} />);
  
      fireEvent.click(screen.getByText(/Delete/i));
  
      expect(screen.getByText(/Are you sure you want to delete account with ID 1/)).toBeInTheDocument();
    });
  
    it('should call deleteAccount and update the table after account is deleted', async () => {
        const accounts = [
          { accountId: '1', accountType: 'CheckingAccount', balance: 1000, customerId: '123' },
        ];
      
        const setAccountsMock = jest.fn();
        const onDeleteMock = jest.fn();

        deleteAccount.mockResolvedValue({});
      
        render(
          <AccountTable
            accounts={accounts}
            onEdit={jest.fn()}
            setAccounts={setAccountsMock}
            onDelete={onDeleteMock}
          />
        );
      
        fireEvent.click(screen.getByText(/Delete/i));
      
        fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
      
        await waitFor(() => {
          expect(deleteAccount).toHaveBeenCalledWith('1');
        });
      
        await waitFor(() => {
          expect(setAccountsMock).toHaveBeenCalledWith(expect.any(Function));
          const updateFunction = setAccountsMock.mock.calls[0][0];
          expect(updateFunction([])).toEqual([]);
        });
      
        expect(onDeleteMock).toHaveBeenCalledWith('Account deleted successfully');
      });      
  });

  describe('AccountsPage', () => {
    it('should display the accounts and the "Create Account" button', async () => {
      const accounts = [
        { accountId: '1', accountType: 'CheckingAccount', balance: 1000, customerId: '123' },
      ];
      getAccounts.mockResolvedValue(accounts);
  
      await act(async () => {
        render(<AccountsPage />);
      });
  
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Accounts');
    });
      expect(screen.getByText(/Create Account/)).toBeInTheDocument();
    });
  
    it('should search for accounts and display search results', async () => {
        const accounts = [
          { accountId: '1', accountType: 'CheckingAccount', balance: 1000, customerId: '123' },
        ];
        
        getAccountsByCustomer.mockResolvedValue(accounts);
    
        await act(async () => {
            render(<AccountsPage />);
          });
    
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'customerId' } });
        fireEvent.change(screen.getByPlaceholderText(/Search account/i), { target: { value: '123' } });
    
        await waitFor(() => {
            expect(screen.getByText(/Found 1 account/)).toBeInTheDocument();
          });
    });
  
    it('should open the modal when the "Create Account" button is clicked', async () => {
        await act(async () => {
            render(<AccountsPage />);
          });
  
      fireEvent.click(screen.getByText(/Create Account/));
  
      expect(screen.getByText(/Add Account/)).toBeInTheDocument();
    });
  });