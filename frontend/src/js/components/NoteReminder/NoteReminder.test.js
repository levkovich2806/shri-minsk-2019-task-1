import React from "react";
import NoteReminder from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteReminder", function () {
  test("NoteReminder rendering", () => {

    const component = renderer.create(<NoteReminder reminder={1555527778000} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
