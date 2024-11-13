import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "../src/pages/Home.tsx";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("log out shows main home page", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("logged out is home page", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for specific elements when user is found
    expect(screen.getByText("Clipr")).toBeInTheDocument();
  });
});
