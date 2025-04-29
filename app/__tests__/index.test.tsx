import { render, screen } from "@testing-library/react-native";
import Index from "@/index";

test("basic test", async () => {
  render(<Index />);
  const element = await screen.findByText(/sign in to get started/i);
  expect(element).toBeTruthy();
});
