import React from "react";
import NoteActions from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteActions", function () {
  test("NoteActions rendering", () => {

    const component = renderer.create(<NoteActions id={0} editNote={() => { }} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
