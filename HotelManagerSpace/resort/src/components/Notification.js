import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Title from '../components/Title';

class Notification extends React.Component {
    
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'infoReservation':
          NotificationManager.info('New reservation', '', 3000);
          break;
        case 'successCheckIn':
          NotificationManager.success('A quest has just checked-in in room ...', 'New check-in', 3000);
          break;
        case 'successCheckOut':
          NotificationManager.success('A quest has just checked-out from room ...', 'New check-out', 3000);
          break;
        case 'infoCancelledReservation':
          NotificationManager.warning('Cancelled reservation', '', 3000);
          break;
        case 'infoFood':
          NotificationManager.info('A quest from room ... has just ordered food from restaurant', 'Ordered food', 3000);
          break;
      }
    };
  };
 
  render() {
    return (
        <section className="bgComponent">
        <Title title="Notifications"/>
        <div className="component">
        <button className='btn btn-info' className='btn-primary'
          onClick={this.createNotification('infoReservation')}>Info about reservation
        </button>
        <p/>
        <button className='btn btn-info' className='btn-primary'
          onClick={this.createNotification('successCheckIn')}>Info about check-in
        </button>
        <p/>
        <button className='btn btn-info' className='btn-primary'
          onClick={this.createNotification('successCheckOut')}>Info about check-out
        </button>
        <p/>
        <button className='btn btn-success' className='btn-primary'
          onClick={this.createNotification('infoFood')}>Info about ordered food from restaurant
        </button>
        <p/>
        <button className='btn btn-warning' className='btn-primary'
          onClick={this.createNotification('infoCancelledReservation')}>Info about cancelled reservation
        </button>
        <p/>
        <NotificationContainer/>
      </div>
      </section>
    );
  }
}
 
export default Notification;
