import React, { Component } from "react";
import yoda from '../../imgs/yoda.svg';
import "./styles.scss";

export default class Main extends Component {
  state = {
    step: 1,
    name: ""
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    console.log('handleSubmit!!!');
  };

  changeStep = (step) => {
    this.setState({
      step: step
    });
  };

  render() {
    return (
      <div className="global">
        <form className="form" onSubmit={this.handleSubmit}>
          {this.state.step === 1 && (
            <>
              <label className="label">
                <span className="labelText">Qual o seu nome?</span>
                <input className="defaultInput" type="text" placeholder="Seu nome" value={this.state.name} onChange={this.handleChange} />
              </label>

              <button className={`defaultButton ${this.state.name ? 'active' : ''}`} onClick={() => this.changeStep(2)}>
                OK
              </button>
            </>
          )}

          {this.state.step === 2 && (
            <>
              <span className="labelText">Qual o seu gênero?</span>

              <div>
                <button className="defaultButton active" onClick={() => this.changeStep(3)}>
                  HOMEM
                </button>

                <button className="defaultButton active" onClick={() => this.changeStep(3)}>
                  MULHER
                </button>
              </div>
            </>
          )}

          {this.state.step === 3 && (
            <>
              <span className="labelText">Qual o seu lado da força?</span>

              <div>
                <button className="defaultButton active jedi" onClick={() => this.changeStep(4)}>
                  JEDI
                </button>

                <button className="defaultButton active sith" onClick={() => this.changeStep(4)}>
                  SITH
                </button>
              </div>
            </>
          )}

          {this.state.step === 4 && (
            <>
              <span className="labelText">Escolha o seu personagem:</span>

              <ul className="globalCharacters">
                <li className="characterItem" onClick={() => this.changeStep(5)}>
                  <img src={yoda} alt="Yoda" />

                  <span className="characterName">Mestre Yoda</span>
                </li>

                <li className="characterItem" onClick={() => this.changeStep(5)}>
                  <img src={yoda} alt="Yoda" />

                  <span className="characterName">Mestre Yoda</span>
                </li>

                <li className="characterItem" onClick={() => this.changeStep(5)}>
                  <img src={yoda} alt="Yoda" />

                  <span className="characterName">Mestre Yoda</span>
                </li>
              </ul>
            </>
          )}

          {this.state.step === 5 && (
            <>
              <img src={yoda} alt="Yoda" width="300" />

              <span class="welcome">Bem-vindo, <strong>{this.state.name}</strong></span>
            </>
          )}
        </form>
      </div>
    );
  }
}