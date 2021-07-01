import axios from 'axios';
import React, { useEffect, useState } from 'react';

// CURRENT STATUS
/*
 * getting access token via axios below returns an invalid token
 * doing it through postman using curl request
 * curl --location --request POST 'https://eu.battle.net/oauth/token' \
 * --header 'Authorization: Basic MzlhYWQ2ODY0MGMyNGRiN2I0NTU2NTFmNjg2YzM5NTc6ak5rdFE1U3Q0aDNSQjhIWHdDVXpseXNwcGk0czBrUmQ=' \
 * --header 'Content-Type: application/x-www-form-urlencoded' \
 * --data-urlencode 'grant_type=client_credentials'
 * returns a valid token which I've hardcoded below for now
 */

const Ceralie = () => {
  /*
  * Call the battlenet API with my credentials
  * This allows me to return information about
  * my characters only
  */
  const [data, setData] = useState();
  const [token, setToken] = useState();

  // setup credentials :: to move to config/env
  const blizzUrl = 'api.blizzard.com';
  // const clientId = '';
  // const clientSecret = '';
  // setup region details :: to move to const
  const region = 'eu';
  const namespace = 'profile-eu';
  const locale = 'en_US';

  // get access token :: failing to return a valid token atm
  // const getAccessToken = async () => {
  //   try {
  //     const response = await axios.post('https://eu.battle.net/oauth/token', {}, {
  //       auth: {
  //         username: clientId,
  //         password: clientSecret,
  //       },
  //       params: {
  //         grant_type: 'client_credentials',
  //         scope: 'wow.profile',
  //       },
  //     });
  //     setToken(response.data.access_token);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const getUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`https://${region}.${blizzUrl}/profile/user/wow?namespace=${namespace}&locale=${locale}&access_token=${token}`);
        console.log(response.data.wow_accounts[0].characters[0].name);
        setData(response.data.wow_accounts[0].characters[0].name);
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
    // getAccessToken();
    setToken('USMqt7HOnbE07xB008gEyWo0kLcY9lJny6');
  }, []);

  if (!data) { return null; }
  return (
    <>
      <h1>Ceralie</h1>
      <p>{data}</p>
    </>
  );
};

export default Ceralie;
