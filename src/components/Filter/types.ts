import { ReactText } from 'react';

export interface IFilterProps {
  onFilterChanged(data: ReactText[]): any
}

export interface IState {
  checkboxes: {
    steps: string | number
    text: string,
    checked: boolean
  } [],
}
