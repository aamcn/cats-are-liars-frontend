import LandingPage from "./LandingPage";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LogInForm from "../logInForm/LogInForm";

const renderWithRouter = (container) => {
    return render(<BrowserRouter>{container}</BrowserRouter>);
};

beforeEach(() => {
    vi.resetAllMocks();
});

describe("LandingPage", () => {
  
    it("renders without crashing", () => {
    renderWithRouter(<LandingPage />);
    const heading = screen.getByTestId("landing-page-container");
    expect(heading).toBeInTheDocument();
  });

  it("renders the heading with correct text content", () => {
    renderWithRouter(<LandingPage />);
    const titleElement = screen.getByRole("heading", { name: /cats are liars/i });
    expect(titleElement).toBeInTheDocument();
  });

});