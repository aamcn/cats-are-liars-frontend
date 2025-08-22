import ToolBar from "./ToolBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  formToggle: vi.fn(),
  formNames: ["Form1", "Form2", "Form3"],
  toggleToolBar: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ToolBar", () => {
  describe("basic render tests", () => {
    it("renders correctly", () => {
      render(<ToolBar {...mockProps} />);
      const toolBar = screen.getByTestId("tool-bar-container");
      expect(toolBar).toBeInTheDocument();
    });

    it("renders the correct number of buttons in the toolbar (3)", () => {
      render(<ToolBar {...mockProps} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(mockProps.formNames.length);
      expect(buttons).toHaveLength(3);
    });

    it("renders buttons with the correct text", () => {
      render(<ToolBar {...mockProps} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveTextContent("Form1");
      expect(buttons[1]).toHaveTextContent("Form2");
      expect(buttons[2]).toHaveTextContent("Form3");
    });

    
  });

  describe("button click events", () => {
    it("calls the toggleToolBar function when the toolbar container is clicked", () => {
      render(<ToolBar {...mockProps} />);
      const toolBar = screen.getByTestId("tool-bar-container");
      fireEvent.click(toolBar);
      expect(mockProps.toggleToolBar).toHaveBeenCalled();
    });

    it("does *NOT*callthe toggleToolBar function when the toolbar container is clicked", () => {
      render(<ToolBar {...mockProps} />);
      expect(mockProps.toggleToolBar).not.toHaveBeenCalled();
    });

    it("calls the formToggle function when a form button is clicked", () => {
      render(<ToolBar {...mockProps} />);
      const buttons = screen.getAllByRole("button");

      fireEvent.click(buttons[0]);
      expect(mockProps.formToggle).toHaveBeenCalled();
      expect(mockProps.formToggle).toHaveBeenCalledWith(
        mockProps.formToggle.mock.calls[0][0],
      );

      fireEvent.click(buttons[1]);
      expect(mockProps.formToggle).toHaveBeenCalled();
      expect(mockProps.formToggle).toHaveBeenCalledWith(
        mockProps.formToggle.mock.calls[1][0],
      );

      fireEvent.click(buttons[2]);
      expect(mockProps.formToggle).toHaveBeenCalled();
      expect(mockProps.formToggle).toHaveBeenCalledWith(
        mockProps.formToggle.mock.calls[2][0],
      );

      expect(mockProps.formToggle).toHaveBeenCalledTimes(3);
    });

    it("does *NOT* call the formToggle function when a no form button is clicked", () => {
      render(<ToolBar {...mockProps} />);
      expect(mockProps.formToggle).not.toHaveBeenCalled();
      expect(mockProps.formToggle).toHaveBeenCalledTimes(0);
    });

  });

});
