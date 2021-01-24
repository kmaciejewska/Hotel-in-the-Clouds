import React, { useEffect, useContext } from "react";
import { withAuthenticator } from "aws-amplify-react";
import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports";
import { UserContext } from "../../context/contextU";
import Banner from "../../components/client/Banner";
import Hero from "../../components/client/Hero";
import { Link } from "react-router-dom";

Amplify.configure(config);
Auth.configure(config);

function LoginPage() {
    const {handleLoginClick} = useContext(UserContext);
    useEffect(() => {
      // Get the AWS credentials for the current user from Identity Pools.
      Auth.currentSession()
        .then((cognitoUser) => {
          const {
            idToken: { payload },
          } = cognitoUser;
          console.log(payload["cognito:username"]);
          handleLoginClick(payload["cognito:username"]);
          
        })
        .catch((err) => console.log(err));
    }, []);
    //
    return (
      <div>
        <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="spend your night in the clouds"
        >
          <Link to="/profile" className="btn-primary">
          Back to profile
          </Link>
        </Banner>
      </Hero>
      </div>
    );
  }
  export default withAuthenticator(LoginPage, true);