const getAccessToken = () => ({ access_token: '' });

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

// const myHeaders = new Headers();
// myHeaders.append('Authorization', 'Basic =');
// myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

// const urlencoded = new URLSearchParams();
// urlencoded.append('grant_type', 'client_credentials');

// const requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: 'follow',
// };

// fetch('https://us.battle.net/oauth/token', requestOptions)
//   .then((response) => response.text())
//   .then((result) => setToken(JSON.parse(result)))
//   .catch((error) => console.log('error', error));
// ;

export default getAccessToken;
