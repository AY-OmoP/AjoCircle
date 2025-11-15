import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

it("adds a member successfully", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/student name/i), {
    target: { value: "John Doe" },
  });

  fireEvent.click(screen.getByText(/add member/i));

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
