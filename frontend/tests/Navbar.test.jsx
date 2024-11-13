// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Navbar from '../src/components/Navbar'


// // test('renders tables link', () => {
// //     render(<Navbar />);
// // })

// describe('Navbar Component', () => {
//     test('navigates to the correct page when the button is clicked', () => {
//       render(
//         <MemoryRouter initialEntries={['/']}> {/* Set initial route */}
//           <Navbar />
//         </MemoryRouter>
//       );
  
//       // Find the "Go to Home" button
//       const button = screen.getByText('Tables');
      
//       // Simulate a click on the button
//       fireEvent.click(button);
  
//       // Check that the URL has changed to '/home'
//       expect(window.location.pathname).toBe('/Tables');
//     });
//   });

import React from "react"; // Add this line to fix the error
// import * as React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter to simulate routing
import { NavBar } from "../src/components/Navbar";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter to control the route history

// Wrapper function to render NavBar with Router context
const renderWithRouter = (ui) => {
  return render(<MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>);
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
});