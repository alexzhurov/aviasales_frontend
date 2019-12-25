import React            from 'react';
import { ITicketProps } from './types';
import { decOfNum }     from '../../utils/decOfNum';
import { getTime }      from '../../utils/getTime';
import moment           from 'moment';
import './index.css';


const Ticket: React.FC<ITicketProps> = ({ ticket }) => {
  const getImageUrl = (carrier: string) => `//pics.avs.io/99/36/${carrier}.png`;
  const getStopsCaption = (stops: string[]) => decOfNum({
    one: 'пересадка',
    two: 'пересадки',
    few: 'пересадок'
  }, stops.length);
  const formatNum = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format;
  const getPeriod = (start: string, durationInMin: number): string => {
    const format = 'H:mm';
    const d1 = moment(start);
    const d2 = moment(d1).add(durationInMin, 'minutes');

    return d1.format(format) + ' - ' + d2.format(format);
  };


  return (
    <div className='Ticket'>
      <div className="Ticket__header">
        <div className="Ticket__price">
          <div>{formatNum(ticket.price)}</div>
        </div>
        <div className="Ticket__logo">
          <img src={getImageUrl(ticket.carrier)} alt=""/>
        </div>
      </div>
      <div className="Ticket__content">
        {ticket.segments.map((
          {
            stops,
            origin,
            date,
            destination,
            duration
          }, index) => {
          return (
            <div className='Ticket__row' key={`ticket-${index}`}>
              <div className="Ticket__item">
                <div className="Ticket__itemTitle">{`${origin} - ${destination}`}</div>
                <div className="Ticket__itemInfo">{getPeriod(date, duration)}</div>
              </div>
              <div className="Ticket__item">
                <div className="Ticket__itemTitle">В пути</div>
                <div className="Ticket__itemInfo">{getTime(duration)}</div>
              </div>
              <div className="Ticket__item">
                <div className="Ticket__itemTitle">{stops.length} {getStopsCaption(stops)}</div>
                <div className="Ticket__itemInfo">{stops.length === 0 ? '' : stops.join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Ticket };
