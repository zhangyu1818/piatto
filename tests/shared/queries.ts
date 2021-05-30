import { screen } from '@testing-library/react'

export const getInputValueByLabelText = (label: string) => {
  return (screen.getByLabelText(label) as HTMLInputElement).value
}
