import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";

const initialTransactions = [
  {
    id: 1,
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: "1000",
  },
];

const newTransaction = {
  id: 2,
  date: "2019-12-17",
  description: "Rent",
  category: "Housing",
  amount: "400",
};

describe("Add Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (!options) {
        return Promise.resolve({
          json: () => Promise.resolve(initialTransactions),
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve(newTransaction),
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("adds a new transaction to the page after form submission", async () => {
    const { container } = render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");

    fireEvent.change(container.querySelector('input[name="date"]'), {
      target: { value: "2019-12-17" },
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Rent" },
    });

    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Housing" },
    });

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "400" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add transaction/i }));

    expect(await screen.findByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("Housing")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
  });

  test("calls POST request when a new transaction is submitted", async () => {
    const { container } = render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");

    fireEvent.change(container.querySelector('input[name="date"]'), {
      target: { value: "2019-12-17" },
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Rent" },
    });

    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Housing" },
    });

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "400" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add transaction/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:6001/transactions",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: "2019-12-17",
          description: "Rent",
          category: "Housing",
          amount: "400",
        }),
      })
    );
  });
});