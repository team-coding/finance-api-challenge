import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelector: '',
      indexType: ['lucro', 'despesa'],
    };
  }
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log('Open Start');
      },
      onOpenEnd: () => {
        console.log('Open End');
      },
      onCloseStart: () => {
        console.log('Close Start');
      },
      onCloseEnd: () => {
        console.log('Close End');
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    };
    M.Modal.init(this.Modal, options);
  }

  setSelector = (index) => {
    this.setState({ indexSelector: index });
  };
  render() {
    return (
      <>
        <a
          id="filter-add"
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          NOVO LANÇAMENTO
        </a>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content col s12">
            <div className="col s12">
              <h3>Insira as informações da transação</h3>
            </div>
            <div className="input-field col s3">
              <select
                onChange={(e) => this.setSelector(e.target.value)}
                id="type-expense"
                className="browser-default"
              >
                <option value="" disabled selected>
                  Escolha o tipo de movimentação
                </option>
                <option value="1">Receita</option>
                <option value="2">Despesa</option>
              </select>
            </div>
            <div className="input-field col s3">
              {this.state.indexSelector === '2' ? (
                <select id="type-values-selector-2" className="browser-default">
                  <option value="" disabled selected>
                    Escolha o tipo de{' '}
                    {this.state.indexType[this.state.indexSelector]}
                  </option>
                  <option value="1">Lazer</option>
                  <option value="2">Transporte</option>
                  <option value="3">Saúde</option>
                  <option value="4">Alimentação</option>
                </select>
              ) : (
                <select id="type-values-selector-1" className="browser-default">
                  <option value="" disabled selected>
                    Escolha o tipo de{' '}
                    {this.state.indexType[this.state.indexSelector]}
                  </option>
                  <option value="1">Salário</option>
                  <option value="2">Investimento</option>
                  <option value="3">Freelance</option>
                </select>
              )}
            </div>
            <div className="col s3">
              <input
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
                placeholder="Valor em R$"
                id="value-transaction"
                type="number"
                className="validate"
              />
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat">
              Disagree
            </a>
            <a className="modal-close waves-effect waves-green btn-flat">
              Agree
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
