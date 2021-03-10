import React from 'react'
import { Button } from 'piatto'

export default () => {
  return (
    <>
      <Button>default</Button>
      <Button type="primary">primary</Button>
      <Button disabled>disabled</Button>
      <Button block>block</Button>
      <Button block shape="round">
        round
      </Button>
      <Button loading>default</Button>
      <Button type="link">link</Button>
    </>
  )
}
