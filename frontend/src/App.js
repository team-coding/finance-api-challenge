import { useState, useEffect } from 'react';
import './App.css';
import 'materialize-css';
import Modal from './Components/Modal';
function App() {
  const [options, setOpt] = useState(['', '1', '2', '3']);
  const [index, setIndex] = useState(0);
  const chooseIndex = (optionValue) => {
    let position = index;
    if (optionValue === 'raise' && index < options.length - 1) {
      position += 1;
    }
    if (optionValue === 'decrease' && index > 0) {
      position -= 1;
    }
    setIndex(position);
  };
  return (
    <div className="row">
      <div className="col s12 header">
        <h1>Bootcamp Fullstack Desafio Final</h1>
        <h2>Controle financeiro pessoal</h2>
        <div className="select-row">
          <a
            onClick={() => chooseIndex('decrease')}
            id="decrease-button"
            className="waves-effect waves-light btn"
          >
            &lt;
          </a>
          <select value={options[index]} className="browser-default">
            <option value="" disabled selected>
              Selecione o mês
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <a
            onClick={() => chooseIndex('raise')}
            id="increase-button"
            className="waves-effect waves-light btn"
          >
            &gt;
          </a>{' '}
        </div>
      </div>
      <div className="col s12 ">
        <div className="values-row">
          <div className="values">
            <span className="label-value">Lançamento:</span>
            <span id="lançamentos" className="value-text">
              Valor
            </span>
          </div>
          <div className="values">
            <span className="label-value">Receitas:</span>
            <span id="valores" className="value-text">
              Valor
            </span>
          </div>
          <div className="values">
            <span className="label-value">Despesas:</span>
            <span id="despesas" className="value-text">
              Valor
            </span>
          </div>
          <div className="values">
            <span className="label-value">Saldo:</span>
            <span id="saldo" className="value-text">
              Valor
            </span>
          </div>
        </div>
        <div class="add-values-row">
          <div className="col s2 filter-add-container">
            {/* <button
              id="filter-add"
              className="waves-effect waves-light btn modal-trigger"
              type="submit"
              name="action"
            >
              + NOVO LANÇAMENTO
            </button> */}
            <Modal />
          </div>
          <div class="input-field col s10">
            <input id="input-lançamento" type="text" className="validate" />
            <label for="input-lançamento">Lançamento</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
