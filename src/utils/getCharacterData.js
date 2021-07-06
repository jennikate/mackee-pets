import axios from 'axios';
/*
   * Returns the details of my user
   * this is a test call, all calls can be made
   * using the same structure
   * just update the url request
  */

const getCharacterData = async (token, realm, character, item) => {
  const blizzUrl = 'api.blizzard.com';
  const region = 'eu';
  const namespace = 'profile-eu';
  const locale = 'en_US';

  const urlParts = `wow/character/${realm}/${character}/${item}`;
  let characterData;

  try {
    const response = await axios.get(`https://${region}.${blizzUrl}/profile/${urlParts}?namespace=${namespace}&locale=${locale}&access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    characterData = response.data;
  } catch (error) {
    console.error(error);
  }

  return characterData;
};

export default getCharacterData;
