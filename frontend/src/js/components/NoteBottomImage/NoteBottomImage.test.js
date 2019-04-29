import React from "react";
import NoteBottomImage from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteBottomImage", function () {
  test("NoteBottomImage rendering", () => {

    const component = renderer.create(<NoteBottomImage url={'http://test.ru/logo.png'} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
