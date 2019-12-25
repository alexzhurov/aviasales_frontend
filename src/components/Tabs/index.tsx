import React          from 'react';
import './index.css';
import { ITabsProps } from './types';
import { sortType }   from '../../pages/SearchFeed/types';


const Tabs: React.FC<ITabsProps> = ({ selectedSort, onSortChange }) => {
  const buttons: {
    sortType: sortType
    text: string
  }[] = [
    {
      sortType: 'cheap',
      text: 'Самый дешевый'
    }, {
      sortType: 'fast',
      text: 'Самый быстрый'
    }
  ];

  return (
    <div className='Tabs'>
      {
        buttons.map(({ text, sortType }, index) => {
          return (
            <div className={`Tabs__item ${sortType === selectedSort ? 'Tabs__item-active' : ''}`}
                 key={`tab-${index}`}
                 onClick={(e) => onSortChange(sortType)}>
              <div>{text}</div>
            </div>
          );
        })
      }

      {/*
      <div className="Tabs__item Tabs__item-active"
           onClick={(e) => onSortChange('cheap')}>
        <div>Самый дешевый</div>
      </div>
      <div className="Tabs__item"
           onClick={(e) => onSortChange('fast')}>
        <div>Самый быстрый</div>
      </div>
*/}
    </div>
  );
};

export { Tabs };
