import React, { useState, useEffect } from "react";
import * as imgCharacters from '../../imgs/characters';
import "./styles.scss";
import { setUserInfo, getUserInfo } from './../../models/UserModel'
import { getCharacters } from './../../models/CharactersModel'

export function Main() {
  const [step, setStep] = useState(0);
  const [allCharacters, setAllCharacters] = useState([]);
  const [userForm, setUserForm] = useState({
    "name": "",
    "gender": "",
    "sideForce": "",
    "character": "",
  });
  const [registeredUser, setRegisteredUser] = useState({});

  useEffect(() => {
    const getCharactersFromApi = async () => {
      const characters = await getCharacters();
      setAllCharacters(characters);
    }

    getCharactersFromApi();
  }, []);

 

  const getUser = async (id) => {
    const response = await getUserInfo(id);

    setRegisteredUser({
      id,
      ...response
    });
  };

  const handleChangeUserForm = (key, value) => {
    setUserForm(prevState => ({
      ...prevState,
      [key]: value
    }));

    if (key !== "name") setStep(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!userForm.character) return;

    const handleSubmit = async () => {
      const userId = await setUserInfo({ ...userForm });
      getUser(userId);
    };

    handleSubmit();
  }, [userForm]);

  return (
    <div className="global">
      <form className="form">
        {!step && (
          <>
            <label className="label">
              <span className="labelText">Qual o seu nome?</span>
              <input className="defaultInput" type="text" placeholder="Seu nome" value={userForm.name} onChange={(event) => handleChangeUserForm("name", event.target.value)} />
            </label>

            <button type="button" className={`defaultButton ${userForm.name ? 'active' : ''}`} onClick={() => setStep(1)}>
              OK
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <span className="labelText">Qual o seu gênero?</span>

            <div>
              <button type="button" className="defaultButton active" onClick={() => handleChangeUserForm("gender", "male")}>
                HOMEM
              </button>

              <button type="button" className="defaultButton active" onClick={() => handleChangeUserForm("gender", "female")}>
                MULHER
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className="labelText">Qual o seu lado da força?</span>

            <div>
              <button type="button" className="defaultButton active jedi" onClick={() => handleChangeUserForm("sideForce", "jedi")}>
                JEDI
              </button>

              <button type="button" className="defaultButton active sith" onClick={() => handleChangeUserForm("sideForce", "sith")}>
                SITH
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className="labelText">Escolha o seu personagem:</span>

            <ul className="globalCharacters">
              {allCharacters.filter(item => item.sideForce === userForm.sideForce).map(character => (
                <li key={character.id} className="characterItem" onClick={() => handleChangeUserForm("character", character.id)}>
                  <div className="globalCharacterImage">
                    <img src={imgCharacters[character.slug]} alt={character.name} />
                  </div>

                <span className="characterName">{character.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 4 && registeredUser.id && (
          <>
            <img src={imgCharacters[allCharacters[registeredUser.character].slug]} alt={allCharacters[registeredUser.character].name} />

            <span className="welcome">Bem-vindo, <strong>{registeredUser.name}</strong></span>
          </>
        )}
      </form>
    </div>
  );
}