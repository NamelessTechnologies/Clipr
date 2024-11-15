import { render, screen, fireEvent } from "@testing-library/react";
import { LogIn } from "../src/pages/Login.tsx";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Log In Page", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("Log In Page Exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Log In To Account")).toBeInTheDocument();
  });

  test("Log In Button exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  test("Sign Up link Exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("Sign Up routes to sign up page", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    const link = screen.getByText("Sign Up");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Signup");
  });

  test("Email Input exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Email:")).toBeInTheDocument();
  });

  test("Email Input exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByText("Password:")).toBeInTheDocument();
  });

  test("Placeholder text exists", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  
});
