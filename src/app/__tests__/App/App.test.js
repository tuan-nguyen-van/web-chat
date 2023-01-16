import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../utils/redux-utils";
import App from "../../App";

test("renders App with OpenDialog showed first then ChatBox showed after", () => {
  // Jest does not understand scrollTo() of javascript dom object.
  Element.prototype.scrollTo = () => {};
  renderWithProviders(<App />);

  const getInButton = screen.getByRole("button", { name: "GET IN" });
  const nameInput = screen.getByRole("textbox", { name: "Your Name" });

  // The ChatBox does not exist
  expect(
    screen.queryByRole("button", { name: "Send" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByPlaceholderText("Enter your message")
  ).not.toBeInTheDocument();

  fireEvent.change(nameInput, {
    target: { value: "T" },
  });
  fireEvent.click(getInButton);

  // The ChatBox is showed
  setTimeout(() => {
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your message")
    ).toBeInTheDocument();
  }, 5);
});
