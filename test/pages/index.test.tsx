import React from "react";
import { render } from "../testUtils";
import Overview from "../../pages/overview";

describe("Overview page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Overview />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
