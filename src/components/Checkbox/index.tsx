import React              from 'react';
import { ICheckboxProps } from './types';
import './index.css';


const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const checkedCls = props.checked ? 'customCheckbox__active' : '';
  return (
    <label className={`customCheckbox ${checkedCls}`}>
      <input className="customCheckbox__input"
             name={props.name}
             value={props.value}
             type="checkbox"
             onChange={props.onChange}
             checked={props.checked}
      />
      <div className="customCheckbox__label">{props.text}</div>

    </label>
  );
};

export { Checkbox };
