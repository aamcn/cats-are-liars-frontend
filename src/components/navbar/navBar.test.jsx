import NavBar from "../navbar/NavBar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

const mockProps = {
  logInSuccess: true,
  changeLogInSuccess: vi.fn(),
};


beforeEach(() => {
    vi.clearAllMocks();
})

describe("NavBar", () => {
  
    it("Should render NavBar component", () => {
    renderWithRouter(<NavBar {...mockProps} />);
    const navBarDiv = screen.getByTestId("navBar");
    expect(navBarDiv).toBeInTheDocument();
  });


  it("log In link should be the only rendered link when not loginSuccess = false", () => {
    renderWithRouter(<NavBar logInSuccess={false} />);
    const logInLink = screen.getByTestId("log-in-link");
    const homeLink = screen.queryByText("Home");
    const myCatsLink = screen.queryByText("My Cats");
    const feedHistoryLink = screen.queryByText("Feed History");

    expect(logInLink).toBeInTheDocument();
    expect(homeLink).not.toBeInTheDocument();
    expect(myCatsLink).not.toBeInTheDocument();
    expect(feedHistoryLink).not.toBeInTheDocument();
  });

  it("should render all links when loginSuccess = true", () => {
    renderWithRouter(<NavBar logInSuccess={true} />);
    const logInLink = screen.getByTestId("log-in-link");
    const homeLink = screen.getByTestId("home-link");
    const myCatsLink = screen.getByTestId("my-cats-link");
    const feedHistoryLink = screen.getByTestId("feed-history-link");

    expect(logInLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(myCatsLink).toBeInTheDocument();
    expect(feedHistoryLink).toBeInTheDocument();
  });

  it("should call changeLogInSuccess function after clicking log In link ", () => {
    renderWithRouter(<NavBar {...mockProps} />);
    const logInLink = screen.getByTestId("log-in-link");
    expect(logInLink).toBeInTheDocument();

    fireEvent.click(logInLink);
    expect(mockProps.changeLogInSuccess).toHaveBeenCalledTimes(1);
  });

  it("should call changeLogInSuccess function every time log In link is clicked (3 times)", () => {
    renderWithRouter(<NavBar {...mockProps} />);
    const logInLink = screen.getByTestId("log-in-link");
    expect(logInLink).toBeInTheDocument();

    fireEvent.click(logInLink);
    fireEvent.click(logInLink);
    fireEvent.click(logInLink);
    expect(mockProps.changeLogInSuccess).toHaveBeenCalledTimes(3);
  });

  it("should call changeLogInSuccess function after clicking log In link ", () => {
    renderWithRouter(<NavBar {...mockProps} />);
    const logInLink = screen.getByTestId("log-in-link");
    expect(logInLink).toBeInTheDocument();

    expect(mockProps.changeLogInSuccess).not.toHaveBeenCalled();
  });



});
