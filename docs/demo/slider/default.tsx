import React from 'react';
import { Slider, Space, Input } from 'piatto';

export default () => {
  const [value, setValue] = React.useState(100);
  return (
    <Space size="large" style={{ padding: 10 }}>
      <Input value={value} onChange={({ currentTarget }) => setValue(+currentTarget.value)} />
      <Slider min={0} max={100} step={1} value={value} onChange={setValue} />
      <Slider min={0} max={100} defaultValue={70} step={10} />
      <Slider min={0} max={100} defaultValue={30} step={10} disabled />
    </Space>
  );
};
