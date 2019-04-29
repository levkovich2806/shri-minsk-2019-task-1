import React from "react";
import NoteListItem from "./index.jsx";
import renderer from "react-test-renderer";

describe("NoteListItem", function () {
  test("NoteListItem rendering", () => {

    const component = renderer.create(<NoteListItem text={'Тестовый текст'} checked={true} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
