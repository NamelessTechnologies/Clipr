import { render, screen, fireEvent } from "@testing-library/react";
import { UploadBox } from "../../src/components/UploadBox";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

// Wrapper function to render NavBar with Router context
const renderWithRouter = (ui) => {
  return render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>);
};

describe("Upload Box", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("", () => {
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(<UploadBox />);

    // Check for specific elements when user is found
    expect(screen.getByText("Create New Post")).toBeInTheDocument();
  });
});
