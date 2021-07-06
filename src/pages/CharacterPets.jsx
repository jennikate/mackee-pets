/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import getAccessToken from '../utils/getAccessToken';

const CharacterOverview = () => {
  /*
  * Call the battlenet API with my credentials
  * This allows me to return information about
  * my characters only
  */
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  // const [filteredPetList, setFilteredPetList] = useState();
  const [petsWithImages, setPetsWithImages] = useState([]);

  const wait = (ms) => new Promise(
    (resolve, reject) => setTimeout(resolve, ms),
  );

  const getCharacterData = async () => {
    const blizzUrl = 'api.blizzard.com';
    const region = 'eu';
    const namespace = 'profile-eu';
    const locale = 'en_US';
    const urlParts = 'wow/character/argent-dawn/addie/collections/pets';

    await axios
      .get(`https://${region}.${blizzUrl}/profile/${urlParts}?namespace=${namespace}&locale=${locale}&access_token=${token.access_token}`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        redirect: 'follow',
      })
      .then((resp) => {
        setUserData(resp.data);
        const pets = { ...resp.data.pets };
        const petArray = [];
        for (let i = 0; i < 3; i++) {
          wait(1000);
          axios
            .get(`${pets[i].species.key.href}&locale=${locale}&access_token=${token.access_token}`)
            .then((petResp) => {
              petArray.push({ ...pets[i], pet_image: petResp.data.icon });
            })
            .catch(() => {
              petArray.push({ ...pets[i], pet_image: null });
            });
        }
        setPetsWithImages(petArray);
      })
      .catch((err1) => console.log(err1.message));
  };

  // need to look at using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all for the above
  // as although console logging shows me the array
  // the length is returning as 0 due to async nature

  // const filterPets = () => {
  //   setFilteredPetList(userData.pets.filter((pet) => (pet.level === 25 && pet.quality.type === 'RARE')));
  // };

  // useEffect(() => {
  //   if (userData) {
  //     filterPets();
  //   }
  // }, [userData]);

  useEffect(() => {
    if (token) {
      getCharacterData();
    }
  }, [token]);

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  if (!userData) { return null; }
  // console.log(Array.isArray(petsWithImages))
  // console.log(petsWithImages)
  console.log(Array.isArray(petsWithImages))
  return (
    <>
      <h1>Rare max level pets</h1>
      <ul>
        {
          petsWithImages.map((pet) => {
            console.log('p', pet);
            return (
              <li key={pet.id}>
                {pet.species.name} - {pet.species.id}
                <ul>
                  <li>Health: {pet.stats.health}</li>
                  <li>Power: {pet.stats.power}</li>
                  <li>Speed: {pet.stats.speed}</li>
                </ul>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default CharacterOverview;
