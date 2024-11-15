import { render, screen, fireEvent } from "@testing-library/react";
import { MessageBox } from "../src/components/MessageBox.tsx";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

test("Message Box Exists", () => {
  render(
    <BrowserRouter>
      <MessageBox username="Skibidi" content="He Getting Rizzy!!!!!!" />;
    </BrowserRouter>
  );

  expect(screen.getByText("He Getting Rizzy!!!!!!")).toBeInTheDocument();
  expect(screen.getByText("Skibidi")).toBeInTheDocument();
});
