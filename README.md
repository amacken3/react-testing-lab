# React Testing Lab

This application is a simple banking transaction tracker built with React. It allows users to view a list of transactions, add new transactions through a form, search transactions by description, and sort transactions by description or category.

## Features

- View all transactions loaded from the backend
- Add a new transaction using the transaction form
- Search transactions by typing into the search bar
- Sort transactions by description or category

## Components

### `AccountContainer`
Handles the main application logic:
- fetches transactions from the backend when the app loads
- stores transactions in state
- stores search input in state
- stores sort selection in state
- filters and sorts transactions before passing them to the transaction list
- sends new transactions to the backend and updates the UI

### `AddTransactionForm`
Allows the user to submit a new transaction by entering:
- date
- description
- category
- amount

### `Search`
Updates the displayed transactions based on the user’s search input.

### `Sort`
Allows the user to sort transactions by:
- description
- category

### `TransactionsList`
Displays the transaction data in a table.

### `Transaction`
Renders an individual transaction row.

## Testing

This project includes tests for the main application functionality:

- **Display Transactions**
  - confirms transactions render after being fetched
  - confirms transaction details appear in the table

- **Add Transactions**
  - confirms a new transaction appears after form submission
  - confirms a POST request is made when a transaction is submitted

- **Search Transactions**
  - confirms typing in the search bar updates the displayed transactions

## Learning Goals

This lab practices:
- writing tests with Vitest and React Testing Library
- testing rendered data
- testing user input and form submission
- testing filtered UI output
- using state to control displayed data in React