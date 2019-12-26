import React, { Component, ReactText }         from 'react';
import { Filter }                              from '../../components/Filter';
import { Tabs }                                from '../../components/Tabs';
import { Ticket }                              from '../../components/Ticket';
import { ISearchFeedState, ITicket, sortType } from './types';
import axios                                   from 'axios';
import { API_URL }                             from '../../constants';
import './index.css';


class SearchFeed extends Component<{}> {
  constructor(props: {}) {
    super(props);
    this.getTickets = this.getTickets.bind(this);
  }

  state: ISearchFeedState = {
    tickets: [],
    filter: [],
    sort: 'cheap',
    apiKey: ''
  };

  async getTickets(): Promise<void> {
    let result: ITicket[] = [];

    // get searchId (key)
    const { data: { searchId } } = await axios.get(`${API_URL}/search`);
    this.state.apiKey = searchId;

    while (true) {
      try {
        if (this.state.apiKey !== searchId) {
          break;
        }

        const { data: { tickets, stop } }: {
          data: {
            tickets: ITicket[],
            stop: boolean
          }
        } = await axios.get(`${API_URL}/tickets`, { params: { searchId } });

        result = [
          ...result,
          ...this.filterTickets(tickets)
        ];

        if (stop) {
          break;
        }
      } catch (err) {
      }
    }
    result = this.getSortedTickets(result);
    this.setState({ tickets: result });
  }

  filterTickets(tickets: ITicket[]): ITicket[] {
    const { filter } = this.state;
    if (filter.includes('all') || filter.length === 0) {
      return tickets;
    } else {
      return tickets.filter(({ segments }) => segments.every(({ stops }) => filter.includes(stops.length)));
    }
  }

  onFilterChanged(filter: ReactText[]): void {
    console.log("SearchFeed.tsx => onFilterChanged ");
    this.setState({ filter });
  }

  onSortChange(sort: sortType): void {
    if (this.state.sort !== sort) {
      const tickets = this.getSortedTickets(this.state.tickets, sort);
      this.setState({ ...this.state, tickets, sort });
    }
    // check duplicated request
  }

  getSortedTickets(tickets: ITicket[], sort: sortType = this.state.sort): ITicket[] {
    const ticketsTmp = [...tickets];
    // @ts-ignore
    const getDuration = ({ segments: s }: ITicket): number => s.reduce((s1, s2) => s1.duration + s2.duration);

    return ticketsTmp.sort((t1, t2) => {
      if (sort === 'fast') {
        return getDuration(t1) - getDuration(t2);
      } else {
        return t1.price - t2.price;
      }
    });
  }


  async componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<ISearchFeedState>, snapshot?: any): Promise<void> {
    console.log("index.tsx => componentDidUpdate ");
    // filter changed
    if (prevState.filter !== this.state.filter) {
      await this.getTickets();
    }
  }

  render() {
    return (
      <div className='row'>
        <div className="col-xs-4">
          <Filter onFilterChanged={(d) => this.onFilterChanged(d)}/>
        </div>
        <div className="col-xs">
          <Tabs selectedSort={this.state.sort} onSortChange={(d) => this.onSortChange(d)}/>
          {this.state.tickets
            .filter((t, i) => i < 20)
            .map((ticket, i) => <Ticket
              key={`ticket-${i}`}
              ticket={ticket}/>)}
        </div>
      </div>
    );
  }
}

export { SearchFeed };
