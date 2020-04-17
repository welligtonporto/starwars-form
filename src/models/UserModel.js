import firebase from './../util/firebaseUtils.js';

export const setUserInfo = async (name, gender, sideForce, character) => {
  const newPostKey = await firebase.database().ref().child('users').push().key;
  await firebase.database().ref(`users/${newPostKey}`).set({
    name,
    gender,
    sideForce,
    character
  });

  return newPostKey;
};

export const getUserInfo = async (id) => {
  const response = await firebase.database().ref(`users/${id}`).once('value');
  return response.val();
};