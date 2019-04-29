import React from 'react';
import { shallow, mount } from 'enzyme';

import Title from './index';

describe('Title', () => {

  it('Should match snapshot Title', () => {
    const wrapper = shallow(<Title title="Название заметки" onChange={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Title check correct input value", () => {

    const wrapper = mount(<Title title="Название заметки" onChange={() => { }} />);

    const input = wrapper.find("input");
    let value = input.get(0).props.value;
    expect(value).toBe("Название заметки");
  });

});
