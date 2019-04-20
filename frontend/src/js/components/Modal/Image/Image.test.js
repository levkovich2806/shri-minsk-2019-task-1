import React from 'react';
import { shallow, mount } from 'enzyme';

import Image from './index';

describe('Image', () => {

  it('Should match snapshot Image', () => {
    const wrapper = shallow(<Image url="http://ya.ru/images/logo.png" onChange={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Image check correct input value", () => {

    const wrapper = mount(<Image url="http://ya.ru/images/logo.png" onChange={() => { }} />);

    const input = wrapper.find("input");
    let value = input.get(0).props.value;
    expect(value).toBe("http://ya.ru/images/logo.png");
  });

});
