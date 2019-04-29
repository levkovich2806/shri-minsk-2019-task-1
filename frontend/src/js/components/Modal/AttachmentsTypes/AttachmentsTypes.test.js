import React from "react";
import { mount } from "enzyme";
import AttachmentsTypes from "./index.jsx";
import renderer from "react-test-renderer";

describe("AttachmentsTypes", function () {
  test("AttachmentsTypes rendering with type Link", () => {

    const props = {
      attachmentType: "link",
      onChange: () => { }
    }

    const component = renderer.create(<AttachmentsTypes {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("AttachmentsTypes rendering with type Image", () => {

    const props = {
      attachmentType: "image",
      onChange: () => { }
    }

    const component = renderer.create(<AttachmentsTypes {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
