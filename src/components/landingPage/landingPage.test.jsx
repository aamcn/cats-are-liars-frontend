import LandingPage from "./LandingPage";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (container) => {
  return render(<BrowserRouter>{container}</BrowserRouter>);
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("LandingPage", () => {
  it("renders without crashing", () => {
    renderWithRouter(<LandingPage />);
    const pageContainer = screen.getByTestId("landing-page-container");
    expect(pageContainer).toBeInTheDocument();
  });

  it("renders the page title", () => {
    renderWithRouter(<LandingPage />);
    const titleComponent = screen.getByText("Cats Are Liars");
    expect(titleComponent).toBeInTheDocument();
  });

  it("renders the log in form", () => {
    renderWithRouter(<LandingPage />);
    const logInComponent = screen.getByTestId("log-in-form-container");
    expect(logInComponent).toBeInTheDocument();
  });
});
