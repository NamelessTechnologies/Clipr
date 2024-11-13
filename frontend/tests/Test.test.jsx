import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './Test';

describe('Hello Component', () => {
  it('renders correctly with a name', () => {
    render(<Test name="Cesar" />);  // Rendering the component

    // Assert that the text "Hello, Cesar!" is in the document
    expect(screen.getByText('Hello, Cesar!')).toBeInTheDocument();
  });
}); 