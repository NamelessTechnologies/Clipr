import { render, screen, fireEvent } from "@testing-library/react";
import ProfileHeader from "../../src/components/profile/ProfileHeader";
import { MemoryRouter, BrowserRouter } from "react-router-dom"; 

// Wrapper function to render NavBar with Router context
const renderWithRouter = (ui) => {
    return render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>);
  };

describe("ProfileHeader Component", () => {
    beforeEach(() => {
        // Clear localStorage before each test to simulate different user states
        localStorage.clear();
    });

    
    test("renders all the links when user is loaded", () => {
        const mockUser = { user_id: 1 };
        localStorage.setItem("user", JSON.stringify(mockUser));

        renderWithRouter(<ProfileHeader />)

        expect(screen.getByText(/Followers/i)).toBeInTheDocument();
        expect(screen.getByText(/Following/i)).toBeInTheDocument();
        expect(screen.getByText(/Friends/i)).toBeInTheDocument();

    })
     
})