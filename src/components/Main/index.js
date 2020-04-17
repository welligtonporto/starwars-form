import React, { useState, useEffect } from "react";
import * as imgCharacters from '../../imgs/characters';
import "./styles.scss";
import { setUserInfo, getUserInfo } from './../../models/UserModel'
import { getCharacters } from './../../models/CharactersModel'

export function Main() {
  const [step, setStep] = useState(0); 
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [sideForce, setSideForce] = useState("");
  const [character, setCharacter] = useState('');
  const [allCharacters, setAllCharacters] = useState([]);
  const [user, setUser] = useState({});
  // const user = useState({
  //   'name'
  // })

  useEffect(() => {
    const getCharactersFromApi = async () => {
      const characters = await getCharacters();
      setAllCharacters(characters);
    }

    getCharactersFromApi();
  }, []);

  useEffect(() => {
    if (!step) return;

    const newStep = step + 1;
    
    setStep(newStep);
  }, [gender, sideForce, character]);

  const handleSubmit = async event => {
    event.preventDefault();

    const userId = await setUserInfo(name, gender, sideForce, character);
    getUser(userId);
  };

  const getUser = async (id) => {
    const response = await getUserInfo(id);

    setUser({
      id,
      ...response
    });
  };

  const handleChangeUser = (key, value) => {

  }

  return (
    <div className="global">
      <form className="form" onSubmit={handleSubmit}>
        {!step && (
          <>
            <label className="label">
              <span className="labelText">Qual o seu nome?</span>
              <input className="defaultInput" type="text" placeholder="Seu nome" value={name} onChange={(event) => setName(event.target.value)} />
            </label>

            <button type="button" className={`defaultButton ${name ? 'active' : ''}`} onClick={() => setStep(1)}>
              OK
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <span className="labelText">Qual o seu gênero?</span>

            <div>
              <button type="button" className="defaultButton active" onClick={() => handleChangeUser("gender", "male")}>
                HOMEM
              </button>

              <button type="button" className="defaultButton active" onClick={() => handleChangeUser("gender", "female")}>
                MULHER
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className="labelText">Qual o seu lado da força?</span>

            <div>
              <button type="button" className="defaultButton active jedi" onClick={() => setSideForce("jedi")}>
                JEDI
              </button>

              <button type="button" className="defaultButton active sith" onClick={() => setSideForce("sith")}>
                SITH
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className="labelText">Escolha o seu personagem:</span>

            <div className="globalCharacters">
              {allCharacters.filter(item => item.sideForce === sideForce).map(character => (
                <button key={character.id} type="submit" className="characterItem" onClick={() => setCharacter(character.id)}>
                  <div className="globalCharacterImage">
                    <img src={imgCharacters[character.slug]} alt={character.name} />
                  </div>

                <span className="characterName">{character.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && user.id && (
          <>
            <img src={imgCharacters[allCharacters[user.character].slug]} alt={allCharacters[user.character].name} />

            <span className="welcome">Bem-vindo, <strong>{user.name}</strong></span>
          </>
        )}
      </form>
    </div>
  );
}