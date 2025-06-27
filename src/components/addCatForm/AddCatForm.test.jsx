import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import AddCatForm from "./AddCatForm";

describe("Add Cat Form", () => {

    localStorage.setItem('storedToken', 'mockToken')

 it("Should render the 'Add Cat Form component' ", () => {
    render(
          <AddCatForm />
    )
    const formContainer = screen.getByTestId("addCatForm");

    expect(formContainer).toBeInTheDocument()
  });

}) 