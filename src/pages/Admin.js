import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import { API, graphqlOperation, Storage } from "aws-amplify";
import {Link} from 'react-router-dom'
import { createRoom } from '../api/mutations'



const Admin = () => {

  //check if it is admin
  const [isAdmin, updateAdminInfo] = useState(false)
  useEffect(() => {
    // Get the AWS credentials for the current user from Identity Pools.
    Auth.currentSession()
      .then(cognitoUser => {
        const { idToken: { payload }} = cognitoUser
        // Loop through the groups that the user is a member of 
        // Set isClient to true if the user is part of the Clients group 
        payload['cognito:groups'] && payload['cognito:groups'].forEach(group => {
          if (group === 'Admins') updateAdminInfo(true)
        })
      })
      .catch(err => console.log(err));
  }, [])
  //

  const [image, setImage] = useState(null);
    const [roomDetails, setRoomDetails] = useState({ name: "", type: "", description: "", image: "", capacity: "", 
        price: "", cleaniness: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!roomDetails.name || !roomDetails.type) return
            await API.graphql(graphqlOperation(createRoom, { input: roomDetails }))
            setRoomDetails({ name: "", type: "", description: "", image: "", capacity: "", 
                  price: "", cleaniness: "" })
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    /*const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setBookDetails({ ...bookDetails, image: url });
        } catch (err) {
            console.log(err);
        }
    }*/


    return (
      <div>
        {isAdmin ? 
        <section className="admin-wrapper">
                <section>
                    <header className="form-header">
                        <h3>Add New Room</h3>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg" />}

                        </div>
                        <div className="form-fields">
                            <div className="name-form">
                                <p><label htmlFor="name">Name</label></p>
                                <p><input
                                    name="name"
                                    type="title"
                                    placeholder="Type the room name"
                                    onChange={(e) => setRoomDetails({ ...roomDetails, name: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="type-form">
                                <p><label htmlFor="type">Type</label></p>
                                <p><input
                                    name="type"
                                    type="title"
                                    placeholder="Type the room type"
                                    onChange={(e) => setRoomDetails({ ...roomDetails, type: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="description-form">
                                <p><label htmlFor="description">Description</label></p>
                                <p><textarea
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description of the room"
                                    onChange={(e) => setRoomDetails({ ...roomDetails, description: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="capacity-form">
                                <p><label htmlFor="capacity">Capacity</label></p>
                                <p><input
                                    name="capacity"
                                    type="number"
                                    placeholder="Type the capacity"
                                    onChange={(e) => setRoomDetails({ ...roomDetails, capacity: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="price-form">
                                <p><label htmlFor="price">Price ($)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price of the room (USD)?"
                                        onChange={(e) => setRoomDetails({ ...roomDetails, price: e.target.value })}
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Featured?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={roomDetails.featured}
                                        onChange={() => setRoomDetails({ ...roomDetails, featured: !roomDetails.featured })}
                                    />
                                </p>
                            </div>
                            <div className="breakfast-form">
                                <p><label>Breakfast?</label>
                                    <input type="checkbox"
                                        className="breakfast-checkbox"
                                        checked={roomDetails.breakfast}
                                        onChange={() => setRoomDetails({ ...roomDetails, breakfast: !roomDetails.breakfast })}
                                    />
                                </p>
                            </div>
                            <div className="pets-form">
                                <p><label>Pets allowed?</label>
                                    <input type="checkbox"
                                        className="pets-checkbox"
                                        checked={roomDetails.pets}
                                        onChange={() => setRoomDetails({ ...roomDetails, pets: !roomDetails.pets })}
                                    />
                                </p>
                            </div>
                            <div className="submit-form">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
        </section>
        : <div className = "error">
            <h3>Error accessing page...</h3>
              <Link to='/' className="btn-primary">
          back to home
          </Link>
        </div>}
        </div>
    )
}

export default withAuthenticator(Admin, true);