import firebase from './../util/firebaseUtils.js';

export const getCharacters = async () => {
  const response = await firebase.database().ref("/characters").once('value');
  return response.val();
};