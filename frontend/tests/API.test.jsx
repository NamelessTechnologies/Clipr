import { render, screen, fireEvent, userEvent } from "@testing-library/react";
import { App } from "../src/App";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom"; // Use MemoryRouter to control the route history

describe("API Test", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("Starts off in root page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check for specific elements when user is found
    expect(screen.getByText("Clipr")).toBeInTheDocument();
  });
});
