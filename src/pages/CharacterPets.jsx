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
  const [filteredPetList, setFilteredPetList] = useState();
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
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      })
      .then((resp) => {
        setUserData(resp.data);
        resp.data.pets.forEach((pet) => {
          wait(1000);
          axios
            .get(`${pet.species.key.href}&locale=${locale}&access_token=${token.access_token}`)
            .then((petResp) => {
              setPetsWithImages({ petsWithImages: [...petsWithImages, { ...pet.data, pet_image: petResp.data.icon }] });
            })
            .catch(() => {
              setPetsWithImages({ petsWithImages: [...petsWithImages, { ...pet.data, pet_image: null }] });
            });
        });
      })
      .catch((err1) => console.log(err1.message));
  };

  const filterPets = () => {
    setFilteredPetList(userData.pets.filter((pet) => (pet.level === 25 && pet.quality.type === 'RARE')));
  };

  useEffect(() => {
    if (userData) {
      filterPets();
    }
  }, [userData]);

  useEffect(() => {
    console.log('getting');
    if (token) {
      getCharacterData();
    }
  }, [token]);

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  if (!petsWithImages) { return null; }
  console.log(petsWithImages.length);

  return (
    <>
      <h1>Rare max level pets</h1>
      <ul>
        {
          petsWithImages.map((pet) => {
            console.log(pet);
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
