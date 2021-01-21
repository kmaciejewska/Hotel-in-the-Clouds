import React, { Component } from 'react';
import { Inject, ScheduleComponent, Month, TimelineViews, TimelineMonth, Week, DragAndDrop, 
    Resize, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";
import Title from "./Title";

import { scheduleData } from '../scheduleData';
import { extend } from '@syncfusion/ej2-base';

class Scheduler extends Component {

    constructor(props) {
        super(props);
        this.data = extend([], scheduleData, null, true);

        this.state = {
    
            localData:  {
                dataSource: [{}]
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
            <section className="bgComponent">
                <Title title="Room availability"/>
                <div className="component">
                    <ScheduleComponent className="hotelRooms" startResizable={false} currentView='TimelinMonth' selectedDate={new Date(2020, 10, 5, 6, 30)}
                    eventSettings={{ dataSource: this.data }}
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

export default Scheduler;