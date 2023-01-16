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

  const messageInput = screen.getByPlaceholderText("Enter your message");
  const sendButton = screen.getByRole("button", { name: "Send" });
  fireEvent.change(messageInput, {
    target: { value: "Hello everyone!" },
  });
  fireEvent.click(sendButton);

  expect(screen.getByText("Hello everyone!")).toBeInTheDocument();
  expect(screen.getByText("You")).toBeInTheDocument();
});
