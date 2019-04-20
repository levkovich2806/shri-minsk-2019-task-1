import React from 'react';
import { shallow } from 'enzyme';

import Action from './index';

describe('Action', () => {

  it('Should match snapshot Action', () => {
    const wrapper = shallow(<Action title="Добавить" status="btn" onClick={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
