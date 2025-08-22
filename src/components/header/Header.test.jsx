import Header from "./Header";
import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router";


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

const NavBar = () => <div data-testid="navBar">NavBar</div>;

describe("Header", () => {

 it("Should render header component", () => {
    renderWithRouter(<Header NavBar={<NavBar />} />)
    const headerDiv = screen.getByTestId("header");
    expect(headerDiv).toBeInTheDocument()
  });

  it("Should render NavBar component", () => {
    renderWithRouter(<Header NavBar={<NavBar />} />)
    const navBarDiv = screen.getByTestId("navBar");
    expect(navBarDiv).toBeInTheDocument()
  });

})