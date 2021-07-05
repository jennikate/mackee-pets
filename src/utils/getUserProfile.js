import axios from 'axios';

/*
  * Returns the details of the user that
  * is associated with the token supplied
*/

const getUserProfile = async (token) => {
  const blizzUrl = 'api.blizzard.com';
  const region = 'eu';
  const namespace = 'profile-eu';
  const locale = 'en_US';

  const urlParts = 'user/wow';
  let response;

  try {
    response = await axios.get(`https://${region}.${blizzUrl}/profile/${urlParts}?namespace=${namespace}&locale=${locale}&access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      redirect: 'follow',
    });
  } catch (error) {
    console.error(error);
  }

  return response.data;
};

export default getUserProfile;
