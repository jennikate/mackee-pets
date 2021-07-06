// import axios from 'axios';
import React, { useEffect, useState } from 'react';

import getAccessToken from '../utils/getAccessToken';
import getCharacterData from '../utils/getCharacterData';
import getUserProfile from '../utils/getUserProfile';

const CharacterOverview = () => {
  /*
  * Call the battlenet API with my credentials
  * This allows me to return information about
  * my characters only
  */
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [token, setToken] = useState();

  async function fetchData() {
    setIsLoading(true);
    const response = await getUserProfile(token.access_token);
    setUserData(response);
    setIsLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  if (!userData) { return null; }
  return (
    <>
      <h1>name</h1>
      {
        userData.wow_accounts.map((account) => (
          <ul key={account.id}>
            {
                account.characters.map((character) => (
                  <li key={character.id}>{character.name}</li>
                ))
              }
          </ul>
        ))
      }
    </>
  );
};

export default CharacterOverview;
