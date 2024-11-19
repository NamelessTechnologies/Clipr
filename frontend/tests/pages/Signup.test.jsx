import { render, screen, fireEvent } from "@testing-library/react";
import { CreateAccount } from "../../src/pages/CreateAccount.tsx";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Log In Page", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("Sign up Page Exists", () => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>,
    );

    expect(screen.getByText("Welcome to Clipr")).toBeInTheDocument();
  });

  test("Submit Button exists", () => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>,
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("Login link Exists", () => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>,
    );

    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("Login routes to login page", () => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>,
    );

    const link = screen.getByText("Log in");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Login");
  });
});
