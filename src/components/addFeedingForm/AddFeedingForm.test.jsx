import { describe, it, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import AddFeedingForm from "./AddFeedingForm";

describe("Add Feeding Form", () => {

    localStorage.setItem('storedToken', 'mockToken')
    localStorage.setItem('username', 'mockUsername')
    

 it("Should render the 'Add Cat Form component' ", () => {
      
    render(
          <AddFeedingForm />
    )
    
    const feedingFormContainer = screen.getByTestId("feedingFormContainer");

    expect(feedingFormContainer).toBeInTheDocument()
  });

}) 