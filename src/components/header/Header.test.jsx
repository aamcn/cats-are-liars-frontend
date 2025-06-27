import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Add Cat Form", () => {


 it("Should render component", () => {
    
    render(
          <Header/>
    )
    const headerDiv = screen.getByTestId("header");

    expect(headerDiv).toBeInTheDocument()
  });

})