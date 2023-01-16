import { screen, fireEvent } from "@testing-library/react";
import OpenDialog from "../../OpenDialog";
import renderWithProviders from "../utils/redux-utils";

test("renders OpenDialog that fully functional", () => {
  renderWithProviders(<OpenDialog />);

  const getInButton = screen.getByRole("button", { name: "GET IN" });
  expect(getInButton).toBeDisabled();
  const nameInput = screen.getByRole("textbox", { name: "Your Name" });

  fireEvent.change(nameInput, {
    target: { value: "T" },
  });
  expect(getInButton).toBeEnabled();

  fireEvent.change(nameInput, {
    target: { value: "" },
  });
  expect(getInButton).toBeDisabled();
});
