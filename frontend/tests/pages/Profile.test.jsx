import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../../src/pages/Profile";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("Profile Page", () => {
    beforeEach(() => {
        // Clear localStorage before each test to simulate different user states
        localStorage.clear();
    });

    // test("Profile Page exists", () => {
    //     render(
    //         <BrowserRouter>
    //             <Profile />
    //         </BrowserRouter>
    //     )
    // });
})