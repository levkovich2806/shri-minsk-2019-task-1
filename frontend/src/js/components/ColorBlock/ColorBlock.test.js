import React from "react";
import { mount } from "enzyme";
import ColorBlock from "./index.jsx";
import renderer from "react-test-renderer";

describe("ColorBlock", function () {
  test("ColorBlock rendering", () => {
    const params = {
      color: {
        color: "#000",
        id: 0
      }
    };
    const component = renderer.create(<ColorBlock {...params} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("ColorBlock check background with color", () => {
    const params = {
      color: {
        color: "#000",
        id: 0
      }
    };
    const wrapper = mount(<ColorBlock {...params} />);

    const span = wrapper.find("span.checkmark");
    let containerStyle = span.get(0).props.style["backgroundColor"];
    expect(containerStyle).toBe("#000");
  });

  test("ColorBlock check background without send color", () => {
    const params = {
      color: {
        id: 0
      }
    };
    const wrapper = mount(<ColorBlock {...params} />);

    const span = wrapper.find("span.checkmark");
    let containerStyle = span.get(0).props.style["backgroundColor"];
    expect(containerStyle).toBe("orange");
  });

  it('ColorBlock handle click', () => {
    const handleClick = jest.fn();
    const wrapper = mount(<ColorBlock changeStatus={handleClick} color={{ id: 0 }} />);
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
