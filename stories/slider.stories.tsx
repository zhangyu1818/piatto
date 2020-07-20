import React from 'react';
import { Slider } from 'piatto';

import Phone from './component/phone';

import 'piatto/slider/index.less';

export default {
  component: Slider,
  title: 'Slider',
};

export const Normal = () => {
  const [value, setValue] = React.useState(100);
  return (
    <Phone style={{ padding: 40 }}>
      <Slider min={0} max={100} step={1} value={value} onChange={setValue} />
    </Phone>
  );
};
