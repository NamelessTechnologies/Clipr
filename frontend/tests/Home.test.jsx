import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "../src/pages/Home.tsx";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("logged out: shows main home page", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Doomscrolling has never been better...")
    ).toBeInTheDocument();
  });

  test("logged out: login button exists", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const link = screen.getByText("Login");
    expect(link).toBeInTheDocument();
  });

  test("logged out: login button exists", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const link = screen.getByText("Signup");
    expect(link).toBeInTheDocument();
  });

  test("logged out: login button routes to login", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const link = screen.getByText("Login");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Login");
  });

  test("logged out: login button routes to signup", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const link = screen.getByText("Signup");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Signup");
  });
});
