import React from "react";
import Tag from "./index.jsx";
import renderer from "react-test-renderer";

describe("Tag", function () {
  test("Tag rendering", () => {

    const component = renderer.create(<Tag tagName="Покупки" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
