import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../utils/redux-utils";
import ChatBox from "../../ChatBox";

test("renders ChatBox that can send messages", () => {
  // Jest does not understand scrollTo() of javascript dom object.
  Element.prototype.scrollTo = () => {};
  renderWithProviders(<ChatBox />, {
    preloadedState: {
      user: { name: "John" },
    },
  });

  const messageInput = screen.getByRole("textbox");
  expect(messageInput).toBeInTheDocument();
  const sendButton = screen.getByRole("button");
  expect(sendButton).toBeInTheDocument();

  fireEvent.change(messageInput, {
    target: { value: "Hello everyone!" },
  });
  fireEvent.click(sendButton);
  expect(screen.getByText("Hello everyone!")).toBeInTheDocument();
  expect(screen.getByText("You")).toBeInTheDocument();
});
