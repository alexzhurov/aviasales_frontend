import React, { ChangeEvent, Component } from 'react';
import { IFilterProps, IState }          from './types';
import { Checkbox }                      from '../Checkbox';
import './index.css';


class Filter extends Component<IFilterProps> {

  state: IState = {
    checkboxes: [{
      steps: 'all',
      text: 'Все',
      checked: false
    }, {
      steps: 0,
      text: 'Без пересадок',
      checked: false
    }, {
      steps: 1,
      text: '1 пересадка',
      checked: false
    }, {
      steps: 2,
      text: '2 пересадки',
      checked: false
    }, {
      steps: 3,
      text: '3 пересадки',
      checked: false
    }]
  };

  onCheckboxChanged(e: ChangeEvent<HTMLInputElement>, number: number): void {
    const { checked } = e.target;
    const newCheckboxes = this.state.checkboxes.map((data, i) => i === number ? {
      ...data,
      checked
    } : data);

    this.setState({
      ...this.state,
      checkboxes: newCheckboxes
    });
    this.updateFilter({ checkboxes: newCheckboxes });
  }

  updateFilter(state: IState): void {
    const filters = state.checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.steps);

    this.props.onFilterChanged(filters);
  }

  componentDidMount(): void {
    this.updateFilter(this.state);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="Filter">
        <div className="Filter__title">Количество пересадок</div>
        {this.state.checkboxes.map((data, i) => {
          const name = 'steps';
          return (
            <Checkbox
              key={`${name}-${i}`}
              checked={data.checked}
              value={`${data.steps}`}
              text={data.text}
              name={name}
              onChange={(e) => this.onCheckboxChanged(e, i)}
            />
          );
        })}
      </div>
    );
  }
}

export { Filter };
