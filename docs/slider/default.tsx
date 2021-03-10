import React from 'react'
import { Slider, Input } from 'piatto'

export default () => {
  const [value, setValue] = React.useState(100)
  return (
    <div style={{ padding: 10 }}>
      <Input value={value} onChange={({ currentTarget }) => setValue(+currentTarget.value)} />
      <div style={{ height: 20 }} />
      <Slider min={0} max={100} step={1} value={value} onChange={setValue} />
      <div style={{ height: 20 }} />
      <Slider min={0} max={100} defaultValue={70} step={10} />
      <div style={{ height: 20 }} />
      <Slider min={0} max={100} defaultValue={30} step={10} disabled />
    </div>
  )
}
