import { screen, fireEvent } from "@testing-library/react";
import OpenDialog from "../../OpenDialog";
import renderWithProviders from "../utils/redux-utils";

test("renders OpenDialog that fully functional", () => {
  renderWithProviders(<OpenDialog />);

  const getInButton = screen.getByRole("button");
  expect(getInButton).toBeInTheDocument();
  expect(getInButton).toBeDisabled();

  const nameInput = screen.getByRole("textbox");
  expect(nameInput).toBeInTheDocument();

  // When a user entered input value then the Get In button is enabled
  fireEvent.change(nameInput, {
    target: { value: "T" },
  });
  expect(getInButton).toBeEnabled();

  //When a user emptied the input then the Get In button is disabled.
  fireEvent.change(nameInput, {
    target: { value: "" },
  });
  expect(getInButton).toBeDisabled();
});
