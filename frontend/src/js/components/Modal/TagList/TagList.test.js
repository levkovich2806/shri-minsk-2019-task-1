import React from 'react';
import { shallow, mount } from 'enzyme';

import TagList from './index';

describe('TagList', () => {

  it('Should match snapshot TagList', () => {

    const tags = [
      {
        "id": 0,
        "tag": "покупки"
      },
      {
        "id": 1,
        "tag": "Работа"
      },
      {
        "id": 2,
        "tag": "ШРИ"
      },
      {
        "id": 3,
        "tag": "коты"
      },
      {
        "id": 4,
        "tag": "мемы"
      },
      {
        "id": 5,
        "tag": "универ"
      },
      {
        "id": 6,
        "tag": "домашнее задание"
      },
      {
        "id": 7,
        "tag": "учеба"
      },
      {
        "id": 8,
        "tag": "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
      }
    ];
    const checkedTags = [2, 5];

    const wrapper = shallow(<TagList tags={tags} checkedTags={checkedTags} />);
    expect(wrapper).toMatchSnapshot();
  });
});
