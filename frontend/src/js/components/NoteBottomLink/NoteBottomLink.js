import React from "react";
import NoteBottomLink from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteBottomLink", function () {
  test("NoteBottomLink rendering", () => {

    const component = renderer.create(<NoteBottomLink url={'http://test.ru/logo.png'} last={true} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
