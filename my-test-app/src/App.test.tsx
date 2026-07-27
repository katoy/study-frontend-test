import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("renders the headline and counter button", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /count is 0/i })).toBeInTheDocument();
  });

  test("increments the counter on click", async () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });
    await userEvent.click(button);

    expect(screen.getByRole("button", { name: /count is 1/i })).toBeInTheDocument();
  });
});
