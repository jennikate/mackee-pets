import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Ceralie = () => {
  /*
  * Call the battlenet API with my credentials
  * This allows me to return information about
  * my characters only
  */
  const [data, setData] = useState();
  const [token, setToken] = useState();

  // setup consts (to move to const file later)
  const blizzUrl = 'api.blizzard.com';
  const region = 'eu';
  const namespace = 'profile-eu';
  const locale = 'en_US';

  /*
   * Below is converted from the curl command provided on the battlenet site
   * I get the Auth code via postman using the CURL script provided by Blizz
   * This is my code and only changes when client/secret IDs change
   * I need to
   * - put the auth code into an env and call it
   * - refactor the below to axios try/catch for consistency
   * - move to a util file
   * - store token in localStorage with expiry handling
  */
  const getAccessToken = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic ');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch('https://us.battle.net/oauth/token', requestOptions)
      .then((response) => response.text())
      .then((result) => setToken(JSON.parse(result)))
      .catch((error) => console.log('error', error));
  };

  /*
   * Returns the details of my user
   * this is a test call, all calls can be made
   * using the same structure
   * just update the url request
  */

  const getUser = async () => {
    const urlParts = 'wow/character/argent-dawn/ceralie/appearance';
    if (token) {
      try {
        const response = await axios.get(`https://${region}.${blizzUrl}/profile/${urlParts}?namespace=${namespace}&locale=${locale}&access_token=${token.access_token}`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        setData(response.data.character.name);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    getAccessToken();
  }, []);

  if (!data) { return null; }
  return (
    <>
      <h1>{data}</h1>
    </>
  );
};

export default Ceralie;
