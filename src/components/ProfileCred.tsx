//@ts-ignore

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CodeSnippet from "./CodeBlock";

const ProfileCred: React.FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ setUserMetadata] = useState<any | null>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-72632r4cmbfwswzr.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log();
      }
    };
  
    if (isAuthenticated && user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, isAuthenticated, user?.sub]);

  return (
    isAuthenticated && (
      <div className="profile-grid">
        <div className="profile__header">
          <img
            src={user?.picture}
            alt="Profile"
            className="profile__avatar"
          />
          <div className="profile__headline">
            <h2 className="profile__title">{user?.name}</h2>
            <span className="profile__description">{user?.email}</span>
          </div>
        </div>
        <div className="profile__details">
          <CodeSnippet
            title="Your ID"
            code={JSON.stringify(user, null, 2)}
          />
        </div>
      </div>
    )
  );
}

export default ProfileCred;
