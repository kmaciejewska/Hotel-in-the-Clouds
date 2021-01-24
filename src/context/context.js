import React, {Component } from  'react'
import { API, graphqlOperation } from 'aws-amplify';
import { listRooms } from "../api/queries";
import { processBooking } from "../api/mutations";
import { v4 as uuidv4 } from "uuid";
import awsmobile from '../aws-exports';

API.configure(awsmobile);


const RoomContext = React.createContext();


 class RoomProvider extends
Component {
  state={
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData from Database
  fetchRooms = async () => {
    try {
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listRooms,
        authMode: "API_KEY"
      });

      let rooms = data.listRooms.items;
      console.log(rooms);
      let featuredRooms = rooms.filter(room => room.featured === true);

      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
               rooms,
               featuredRooms,
               sortedRooms: rooms,
               loading: false,
               price: maxPrice,
               maxPrice: maxPrice,
               maxSize: maxSize
              });
      
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.fetchRooms();
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = {...item.fields,image:images,id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room)=>room.slug ===slug);
    return room;
  };


  checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    try {
      await API.graphql(graphqlOperation(processBooking, { input: payload }));
      console.log("Order is successful");
    } catch (err) {
      console.log(err);
    }
  };

  getRoomID = (sid) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room)=>room.id ===sid);
    return room;
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  };

m

  render() {
    return(
    <RoomContext.Provider value={
      {...this.state,
        getRoom:this.getRoom,
        getRoomID:this.getRoomID,
        checkout:this.checkout,
        handleChange: this.handleChange
      }
    }>
      {this.props.children}
    </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;


export {RoomProvider,RoomConsumer,RoomContext}

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}