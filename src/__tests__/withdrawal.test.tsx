import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

it("withdraws a member and removes them from dashboard", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/student name/i), {
    target: { value: "Chris" },
  });

  fireEvent.click(screen.getByText(/add member/i));

  fireEvent.click(screen.getByText(/withdraw/i));

  expect(screen.queryByText("Chris")).not.toBeInTheDocument();
});
