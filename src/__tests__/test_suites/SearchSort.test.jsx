import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
  {
    id: 3,
    date: "2019-12-03",
    description: "Pizza",
    category: "Food",
    amount: "-10",
  },
];

describe("Search Transactions", () => {
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

  test("updates displayed transactions when user types in the search input", async () => {
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    await screen.findByText("Chipotle");
    await screen.findByText("Pizza");

    const searchInput = screen.getByPlaceholderText(
      /search your recent transactions/i
    );

    fireEvent.change(searchInput, { target: { value: "chip" } });

    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Paycheck from Bob's Burgers")
    ).not.toBeInTheDocument();
  });
});