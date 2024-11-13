import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home Component', () => {
  test('should redirect to login page when clicking the Login button', () => {
    // Render the Home component wrapped in MemoryRouter
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Get the Login link by its text content
    const loginButton = screen.getByText(/Login/i);

    // Simulate a click on the Login button
    fireEvent.click(loginButton);

    // Check if the URL has changed to '/Login' (route defined in Link component)
    expect(window.location.pathname).toBe('/Login');
  });

  test('should redirect to signup page when clicking the Signup button', () => {
    // Render the Home component wrapped in MemoryRouter
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Get the Signup link by its text content
    const signupButton = screen.getByText(/Signup/i);

    // Simulate a click on the Signup button
    fireEvent.click(signupButton);

    // Check if the URL has changed to '/Signup' (route defined in Link component)
    expect(window.location.pathname).toBe('/Signup');
  });
});
