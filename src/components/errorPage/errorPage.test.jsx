import ErrorPage from "./ErrorPage";
import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (container) => {
    return render(<BrowserRouter>{container}</BrowserRouter>);
};

describe("ErrorPage", () => {

  it("Should render component container", () => {
    renderWithRouter(<ErrorPage />);
    const errorPageContainer = screen.getByTestId("error-page-container");
    expect(errorPageContainer).toBeInTheDocument();
  });

    it("Should render heading with correct text", () => {
        renderWithRouter(<ErrorPage />);
        const headingElement = screen.getByRole("heading", { name: /oh no, this route doesn't exist!/i });
        expect(headingElement).toBeInTheDocument();
    });

    
})