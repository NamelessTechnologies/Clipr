import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Search Bar Component", () => {
    beforeEach(() => {
        // Clear localStorage before each test to simulate different user states
        localStorage.clear();
    });

    test("Placeholder text exists", () => {
        render(
          <BrowserRouter>
            <SearchBar />
          </BrowserRouter>
        );
    
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
      });
})