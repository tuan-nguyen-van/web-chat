import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../utils/redux-utils";
import App from "../../App";

test("renders App with OpenDialog showed first then ChatBox showed after", () => {
  // Jest does not understand scrollTo() of javascript dom object.
  Element.prototype.scrollTo = () => {};
  renderWithProviders(<App />);

  const getInButton = document.querySelector("#get-in-button");
  const nameInput = document.querySelector("#name-input");

  fireEvent.change(nameInput, {
    target: { value: "T" },
  });
  fireEvent.click(getInButton);

  // The ChatBox is showed
  const sendButton = screen.getByText("Send");
  expect(sendButton).toBeInTheDocument();
  const messageInput = document.querySelector("#message-input");
  expect(messageInput).toBeInTheDocument();
});
