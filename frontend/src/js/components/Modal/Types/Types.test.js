import React from 'react';
import { shallow, mount } from 'enzyme';

import Types from './index';

describe('Types', () => {

  it('Should match snapshot Types', () => {
    const wrapper = shallow(<Types type="image" />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Types - check correct checked radio", () => {

    const type = "image";

    const wrapper = mount(<Types type={"image"} onChange={() => { }} />);

    const input = wrapper.find("input[type='radio']");
    input.forEach(item => {
      const { checked, value } = item.get(0).props;
      if (type === value) {
        expect(checked).toBe(true);
      }
    });
  });

});
