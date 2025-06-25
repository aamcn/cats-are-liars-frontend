import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("blah", () => {


 it("Should render a card displaying the arguments from the pokemonCardDetails object prop", () => {
    
    render(
          <Header/>
    )
    const headerDiv = screen.getByTestId("header");

    expect(headerDiv).toBeInTheDocument()
  });

})