import React from "react";
import { mount } from "enzyme";
import Logo from "./index.jsx";
import renderer from "react-test-renderer";

describe("Logo", function () {
  test("Logo rendering", () => {

    const component = renderer.create(<Logo />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
