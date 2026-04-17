import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";

const mockTransactions = [
  {
    id: 1,
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: "1000",
  },
  {
    id: 2,
    date: "2019-12-02",
    description: "Chipotle",
    category: "Food",
    amount: "-20",
  },
];

describe("Display Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("displays transactions on startup", async () => {
    render(<App />);

    expect(
      await screen.findByText("Paycheck from Bob's Burgers")
    ).toBeInTheDocument();
    expect(await screen.findByText("Chipotle")).toBeInTheDocument();
  });

  test("displays transaction details in the table", async () => {
    render(<App />);

    expect(await screen.findByText("2019-12-01")).toBeInTheDocument();
    expect(await screen.findByText("Income")).toBeInTheDocument();
    expect(await screen.findByText("1000")).toBeInTheDocument();
  });
});