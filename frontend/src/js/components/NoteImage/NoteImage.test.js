import React from "react";
import NoteImage from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteImage", function () {
  test("NoteImage rendering", () => {

    const component = renderer.create(<NoteImage url={'http://test.ru/logo.png'} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
