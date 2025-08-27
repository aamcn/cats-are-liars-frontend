import CatTabTemplate from "./CatTabTemplate";
import { describe, it, expect, afterEach, vi } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router";

// const renderWithRouter = (container) => {
//   return render(<BrowserRouter>{container}</BrowserRouter>);
// };

const renderWithRouter = (container) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: container,
    },
  ]);

  return render(
    <RouterProvider router={router} />
  );
};

const mockProps = {
  cat: { name: "Whiskers" },
};

afterEach(() => {
  vi.resetAllMocks();
});

describe("catTabTemplate", () => {
  it("Should render component container", () => {
    renderWithRouter(<CatTabTemplate {...mockProps} />);
    const catTabCardContainer = screen.getByTestId("cat-card-container");
    expect(catTabCardContainer).toBeInTheDocument();
  });

    it("Should render cat name link", () => {
        renderWithRouter(<CatTabTemplate {...mockProps} />);
        const catNameLink = screen.getByRole("link", { name: /whiskers/i });
        expect(catNameLink).toBeInTheDocument();
    });

    it("Cat name link should have correct href attribute", () => {
        renderWithRouter(<CatTabTemplate {...mockProps} />);
        const catNameLink = screen.getByRole("link", { name: /whiskers/i });
        expect(catNameLink).toHaveAttribute("href", "/cat-view/Whiskers");
    });



});

