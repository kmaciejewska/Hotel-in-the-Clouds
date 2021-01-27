import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//import './App.css';
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Link } from "react-router-dom";
import { createRoom } from "../../api/mutations";
import config from "../../aws-exports";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

Amplify.configure(config);
Auth.configure(config);

async function addToGroup() {
  let apiName = "AdminQueries";
  let path = "/addUserToGroup";
  let myInit = {
    body: {
      username: "km1",
      groupname: "Staff",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  return await API.post(apiName, path, myInit);
}

let nextToken;

async function listClients(limit) {
  let apiName = "AdminQueries";
  let path = "/listUsersInGroup";
  let myInit = {
    queryStringParameters: {
      groupname: "Clients",
      limit: limit,
      token: nextToken,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  
  const { NextToken, ...rest } = await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

const Admin = () => {
  const [image, setImage] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    capacity: "",
    price: "",
    cleaniness: "",
    featured: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!roomDetails.name || !roomDetails.type) return;
      await API.graphql(graphqlOperation(createRoom, { input: roomDetails }));
      setRoomDetails({
        name: "",
        type: "",
        description: "",
        image: "",
        capacity: "",
        price: "",
        cleaniness: "",
        featured: false,
        breakfast: false,
        pets: false
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const extension = file.name.split(".")[1];
    const name = file.name.split(".")[0];
    const key = `images/${uuidv4()}${name}.${extension}`;
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    try {
      // Upload the file to s3 with public access level.
      await Storage.put(key, file, {
        level: "public",
        contentType: file.type,
      });
      // Retrieve the uploaded file to display
      const image = await Storage.get(key, { level: "public" });
      setImage(image);
      setRoomDetails({ ...roomDetails, image: url });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
     
        <section lang="en">
          <div align="center">
            <button onClick={addToGroup}>Add to Staff Group</button>
            <button onClick={() => listClients(20)}>List Clients</button>
          </div>

          <section lang = "en" className="a-form">
            <header className="form-header">
              <h3>Add New Room</h3>
            </header>
            <form lang="en" onSubmit={handleSubmit}>
              <div className="form-image">
                {image ? (
                  <img className="img-wrapper" src={image} alt="" />
                ) : (
                  <input
                    type="file"
                    accept="image/jpg"
                    onChange={(e) => handleImageUpload(e)}
                  />
                )}
              </div>
              <div className="form-fields">
                <div className="name-form">
                  <p>
                    <label htmlFor="name">Name</label>
                  </p>
                  <p>
                    <input
                      name="name"
                      type="title"
                      placeholder="Type the room name"
                      onChange={(e) =>
                        setRoomDetails({ ...roomDetails, name: e.target.value })
                      }
                      required
                    />
                  </p>
                </div>
                <div className="type-form">
                  <p>
                    <label htmlFor="type">Type</label>
                  </p>
                  <p>
                    <input
                      name="type"
                      type="title"
                      placeholder="Type the room type"
                      onChange={(e) =>
                        setRoomDetails({ ...roomDetails, type: e.target.value })
                      }
                      required
                    />
                  </p>
                </div>
                <div className="description-form">
                  <p>
                    <label htmlFor="description">Description</label>
                  </p>
                  <p>
                    <textarea
                      name="description"
                      type="text"
                      rows="8"
                      placeholder="Type the description of the room"
                      onChange={(e) =>
                        setRoomDetails({
                          ...roomDetails,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </p>
                </div>
                <div className="capacity-form">
                  <p>
                    <label htmlFor="capacity">Capacity</label>
                  </p>
                  <p>
                    <input
                      name="capacity"
                      type="number"
                      placeholder="Type the capacity"
                      onChange={(e) =>
                        setRoomDetails({
                          ...roomDetails,
                          capacity: e.target.value,
                        })
                      }
                      required
                    />
                  </p>
                </div>
                <div className="price-form">
                  <p>
                    <label htmlFor="price">Price ($)</label>
                    <input
                      name="price"
                      type="text"
                      placeholder="What is the Price of the room (USD)?"
                      onChange={(e) =>
                        setRoomDetails({
                          ...roomDetails,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </p>
                </div>
                <div className="featured-form">
                  <p>
                    <label>Featured?</label>
                    <input
                      type="checkbox"
                      className="featured-checkbox"
                      checked={roomDetails.featured}
                      onChange={() =>
                        setRoomDetails({
                          ...roomDetails,
                          featured: !roomDetails.featured,
                        })
                      }
                    />
                  </p>
                </div>
                <div className="breakfast-form">
                  <p>
                    <label>Breakfast?</label>
                    <input
                      type="checkbox"
                      className="breakfast-checkbox"
                      checked={roomDetails.breakfast}
                      onChange={() =>
                        setRoomDetails({
                          ...roomDetails,
                          breakfast: !roomDetails.breakfast,
                        })
                      }
                    />
                  </p>
                </div>
                <div className="pets-form">
                  <p>
                    <label>Pets allowed?</label>
                    <input
                      type="checkbox"
                      className="pets-checkbox"
                      checked={roomDetails.pets}
                      onChange={() =>
                        setRoomDetails({
                          ...roomDetails,
                          pets: !roomDetails.pets,
                        })
                      }
                    />
                  </p>
                </div>
                <div className="submit-form">
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>
      
    </div>
  );
};

export default Admin;
