import { sortType } from '../../pages/SearchFeed/types';

export interface ITabsProps {
  selectedSort: sortType

  onSortChange(type: sortType): void
}

