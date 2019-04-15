import React from "react";
import { mount } from "enzyme";
import Footer from "./index.jsx";
import renderer from "react-test-renderer";

describe("Footer", function() {
  test("Footer rendering", () => {
    const params = {
      author: "Сергей Левкович",
      copyright: "Яндекс ШРИ"
    };
    const component = renderer.create(<Footer {...params} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Footer renders the text inside it", () => {
    const params = {
      author: "Сергей Левкович",
      copyright: "Яндекс ШРИ"
    };
    const wrapper = mount(<Footer {...params} />);
    const p = wrapper.find(".footer__author");
    expect(p.text()).toBe("Сергей Левкович");
  });
});
