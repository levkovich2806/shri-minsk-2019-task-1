import React from "react";
import { mount, shallow } from "enzyme";
import ColorPicker from "./index.jsx";
import renderer from "react-test-renderer";

describe("ColorPicker", function () {

  const props = {
    colors: [
      {
        "id": 0,
        "color": "#E84747"
      },
      {
        "id": 1,
        "color": "#F2994A"
      },
      {
        "id": 2,
        "color": "#F2C94C"
      },
      {
        "id": 3,
        "color": "#219653"
      },
      {
        "id": 4,
        "color": "#56CCF2"
      },
      {
        "id": 5,
        "color": "#2F80ED"
      },
      {
        "id": 6,
        "color": "#9B51E0"
      }
    ],
    checkedColor: 2,
  }

  test("ColorPicker rendering", () => {
    const wrapper = shallow(<ColorPicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
