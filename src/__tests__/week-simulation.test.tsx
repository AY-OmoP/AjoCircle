import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

it("simulates 1 week and updates interest", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/student name/i), {
    target: { value: "Alice" },
  });

  fireEvent.click(screen.getByText(/add member/i));

  const before = screen.getAllByText(/₦10,000/)[0];

  fireEvent.click(screen.getByText(/simulate 1 week/i));

  const interestCell = screen.getAllByText(/₦/)[3];
  expect(interestCell.textContent).not.toBe("₦0");
});
