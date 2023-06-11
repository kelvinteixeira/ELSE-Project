import App from "./App";
import { render } from "@testing-library/react";
describe("Jest test", () => {
  it("should render", () => {
    render(<App />);
  });
});
