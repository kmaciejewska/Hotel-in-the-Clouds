import React, { Component } from 'react'
import Hero from '../../components//staff/Hero'
import Banner from '../../components//staff/Banner'
import {Link} from 'react-router-dom'
import { Inject, ScheduleComponent, Month, TimelineViews, TimelineMonth, Week, DragAndDrop, 
  Resize, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";

 class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {

        localData:  {
            dataSource: [{
                Id: 1,
                EndTime: new Date(2021, 1, 14, 6, 30),
                StartTime: new Date(2021, 1, 11, 4, 0),
                Subject: 'Reservation - not paid',
                IsAllDay: true,
                ResourceID: 1,
                GroupID: 1
            },
            {
                Id: 2,
                EndTime: new Date(2021, 1, 5, 6, 30),
                StartTime: new Date(2021, 1, 3, 4, 0),
                Subject: 'Reservation - not paid',
                IsAllDay: true,
                ResourceID: 2,
                GroupID: 6
            },
            {
                Id: 3,
                EndTime: new Date(2021, 1, 15, 6, 30),
                StartTime: new Date(2021, 1, 7, 4, 0),
                Subject: 'Reservation -  paid',
                IsAllDay: true,
                ResourceID: 2,
                GroupID: 7
            },

            {
                Id: 3,
                EndTime: new Date(2021, 1, 15, 6, 30),
                StartTime: new Date(2021, 1, 7, 4, 0),
                Subject: 'Reservation - not paid',
                IsAllDay: true,
                ResourceID: 4,
                GroupID: 5
            }
            ]
        },

        localResourceData: {
            resourceDataSource: [
                {Name: "Single Standard", Id: 1, Color: "#9370DB"},
                {Name: "Double Standard", Id: 2, Color: "#9370DB"},
                {Name: "Single Deluxe", Id: 3, Color: "#9370DB"},
                {Name: "Double Deluxe", Id: 4, Color: "#9370DB"},
                {Name: "Family Standard", Id: 5, Color: "#9370DB"},
            ]
        },

        localGroupData: {
            resources : ['Resources', 'Groups'],
            //enableCompactView: false,
            //byDate: true
            allowGroupEdit: true
        },

        localGroupDataSource: {
            groupDataSource: [
                {Name: "Room 101", Id: 1, Color: "#9370DB", GroupID: 1},
                {Name: "Room 102", Id: 6, Color: "#9370DB", GroupID: 2},
                {Name: "Room 103", Id: 7, Color: "#9370DB", GroupID: 2},
                {Name: "Room 104", Id: 8, Color: "#9370DB", GroupID: 2},
                {Name: "Room 105", Id: 11, Color: "#9370DB", GroupID: 3},
                {Name: "Room 106", Id: 3, Color: "#9370DB", GroupID: 4},
                {Name: "Room 107", Id: 4, Color: "#9370DB", GroupID: 4},
                {Name: "Room 108", Id: 5, Color: "#9370DB", GroupID: 4},
                {Name: "Room 201", Id: 15, Color: "#9370DB", GroupID: 5},
                {Name: "Room 202", Id: 16, Color: "#9370DB", GroupID: 5},
                {Name: "Room 203", Id: 17, Color: "#9370DB", GroupID: 5},
            ]
        },
   }
}

render() {
    return (
       <section className="BookingComponent">
        
         <Hero hero="bookingHero">
              <Banner title="Bookings schedule">
          <Link to='/staff' className="btn-primary">
              go back</Link>  
        </Banner>
        </Hero>   
       
            
            <div className="component">
                <ScheduleComponent className="hotelRooms" startResizable={false} currentView='TimelinMonth' selectedDate={new Date(2021, 1, 5, 6, 30)}
                eventSettings={this.state.localData}
                group={this.state.localGroupData}>
                    <ResourcesDirective>
                        <ResourceDirective className="resourceStyle" field="ResourceID" title="Resource Name" name="Resources"
                            textField="Name" idField="Id" colorField="Color"
                            dataSource={this.state.localResourceData.resourceDataSource}>
                        </ResourceDirective>
                        <ResourceDirective className="groupStyle" field="GroupID" title="Group Name" name="Groups" 
                            textField="Name" idField="Id" colorField="Color" groupIDField="GroupID" 
                            allowMultiple={true} dataSource={this.state.localGroupDataSource.groupDataSource}>
                        </ResourceDirective>
                    </ResourcesDirective>
                    <ViewsDirective>
                        <ViewDirective option='TimelineMonth'/>
                    </ViewsDirective>
                    <Inject services={[TimelineViews, TimelineMonth, Month, Week, DragAndDrop, Resize]}/>
                </ScheduleComponent>
            </div> 
           
        </section>
    );
}
}

export default Bookings;