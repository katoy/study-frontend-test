import { render, screen, waitFor } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

describe("UserProfile Component", () => {
  test("fetches and displays user data from mocked API", async () => {
    render(<UserProfile />);

    // loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // mocked data should show up
    await waitFor(() => {
      expect(screen.getByTestId("user-profile")).toBeInTheDocument();
    });

    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument();
  });
});
