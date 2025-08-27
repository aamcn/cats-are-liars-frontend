import AddCatFeederForm from "./AddCatFeederForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach} from "vitest";

const mockProps = {
    formToggle: vi.fn(),
    catData: { name: "Whiskers" },
    householdMembers: [
    { id: 1, username: "User1" },
    { id: 2, username: "User2" }
]
}

beforeEach(() => {
vi.clearAllMocks(); 
});

describe("Add Cat Feeder Form", () => {

  it("renders without crashing", () => {
    render(<AddCatFeederForm {...mockProps} />);
    const formContainer = screen.getByTestId("add-feeder-form-container");
    expect(formContainer).toBeInTheDocument();
  });

  it("renders cat name input with correct value", () => {
    render(<AddCatFeederForm {...mockProps} />);
    const catNameInput = screen.getByTestId("cat-name-input");
    expect(catNameInput.getAttribute("value")).toBe("Whiskers");
    expect(catNameInput).toBeInTheDocument();
  });

  it("calls formToggle when cancel button is clicked", () => {
    render(<AddCatFeederForm {...mockProps} />);
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);
    expect(mockProps.formToggle).toHaveBeenCalled();
  });

  it("renders feeder selection dropdown with correct number of options", () => {
    render(<AddCatFeederForm {...mockProps} />);
    const feederSelect = screen.getByRole("combobox", { name: /Choose the new feeder/i });
    expect(feederSelect).toBeInTheDocument();
    expect(feederSelect).toHaveLength(mockProps.householdMembers.length);
  });

  it("renders feeder selection dropdown with correct options", () => {
    render(<AddCatFeederForm {...mockProps} />);
    const feederSelect = screen.getByRole("combobox", { name: /Choose the new feeder/i });
    expect(feederSelect).toBeInTheDocument();
    expect(feederSelect.children[0].textContent).toBe(mockProps.householdMembers[0].username);
    expect(feederSelect.children[1].textContent).toBe(mockProps.householdMembers[1].username);
  });

}); 