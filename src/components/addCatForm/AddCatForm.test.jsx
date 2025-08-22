import AddCatForm from "./AddCatForm";
import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (container) => {
  return render(
    <BrowserRouter>
      {container}
    </BrowserRouter>
  );
};

const localStorage = {
  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
  },
  getItem: (key) => {
    return window.localStorage.getItem(key);
  },
};

describe("Add Cat Form", () => {

    localStorage.setItem('storedToken', 'mockToken')

 it("Should render the 'Add Cat Form component' ", () => {
    renderWithRouter(<AddCatForm />);
    const formContainer = screen.getByTestId("addCatForm");

    expect(formContainer).toBeInTheDocument()
  });

})  