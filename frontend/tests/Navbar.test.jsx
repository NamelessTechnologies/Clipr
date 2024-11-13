import { render, screen, fireEvent, userEvent } from "@testing-library/react";
import { NavBar } from "../src/components/Navbar";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom"; // Use MemoryRouter to control the route history

// Wrapper function to render NavBar with Router context
const renderWithRouter = (ui) => {
  return render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>);
};

describe("NavBar Component", () => {
  beforeEach(() => {
    // Clear localStorage before each test to simulate different user states
    localStorage.clear();
  });

  test("renders navigation links when user is logged in", () => {
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    renderWithRouter(<NavBar />);

    // Check for specific elements when user is found
    expect(screen.getByText(/clipr/i)).toBeInTheDocument();
    expect(screen.getByText(/tables/i)).toBeInTheDocument();
    expect(screen.getByText(/friends/i)).toBeInTheDocument();
    expect(screen.getByText(/view profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("log out succesfully logs a user out", () => {
    //Setting Login
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    renderWithRouter(<NavBar />);

    //Before Logout
    const logout = screen.getByText("Logout");
    let user = localStorage.getItem("user");
    expect(user).toBeDefined();

    //After Logout
    fireEvent.click(logout);
    user = localStorage.getItem("user");
    expect(user).toBeNull();
  });

  test("tables correctly routes", () => {
    //Setting Login
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    //Clicking on Tables
    const link = screen.getByText("Tables");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Tables");
  });

  test("friends correctly routes", () => {
    //Setting Login
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    //Clicking on Friends
    const link = screen.getByText("Friends");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Friends");
  });

  test("view profile correctly routes", () => {
    //Setting Login
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    //Clicking on View Profile
    const link = screen.getByText("View Profile");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Profile");
  });

  test("home correctly routes", () => {
    //Setting Login
    const mockUser = { user_id: 123 };
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    //Clicking on View Profile
    let link = screen.getByText("View Profile");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/Profile");

    //Going back to home
    link = screen.getByText("Clipr");
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/");
  });

  // test("search bar correctly routes", () => {
  //   //Setting Login
  //   const mockUser = { user_id: 123 };
  //   localStorage.setItem("user", JSON.stringify(mockUser));

  //   render(
  //     <BrowserRouter>
  //       <NavBar />
  //     </BrowserRouter>
  //   );

  //   //Clicking on View Profile
  //   const searchInput = screen.getByPlaceholderText("Search");
  //   const link = screen.getByRole("button", { name: "Search" });
  //   console.log(searchInput);
  //   fireEvent.keyDown(searchInput, { key: "A", code: "KeyA" });
  //   fireEvent.click(link);
  //   expect(window.location.pathname).toBe("/Search");
  // });
});
