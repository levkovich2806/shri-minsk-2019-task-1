import React from 'react';
import { shallow } from 'enzyme';

import Description from './index';

describe('Description', () => {
  it('Should match snapshot description', () => {
    const wrapper = shallow(<Description description="Описание" />);
    expect(wrapper).toMatchSnapshot();
  });
});
