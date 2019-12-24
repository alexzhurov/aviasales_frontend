import { ChangeEvent } from 'react';

export interface ICheckboxProps {
  text: string
  value: string
  checked: boolean
  name: string

  onChange(e: ChangeEvent<HTMLInputElement>): void
}
