import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import DatePicker from 'react-date-picker';
import ButtonJoker from '../Button-Joker';
import CRUD from '../../Functions';
import api from '../../Api';
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: new Date(),
      indexSelector: '0',
      indexType: ['lucro', 'despesa'],
      value: 0,
      type: '',
      description: '',
      category: '',
      day: '',
      month: '',
      year: '',
      yearMonth: '',
      yearMonthDay: '',
      data: null,
    };
  }
  componentDidMount() {
    CRUD.getTransactions();

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

  handleType = (index) => {
    this.setState({ indexSelector: index });
    switch (index) {
      case '0': {
        this.setState({ type: '+', category: '1' });
        break;
      }
      case '1': {
        this.setState({ type: '-', category: '1' });
        break;
      }
    }
  };

  handleDescription = (value) => {
    this.setState({ description: value });
  };

  handleValue = (value) => {
    this.setState({ value: parseInt(value) });
  };

  handleCategory = (category) => {
    if (this.state.indexSelector === '1') {
      switch (category) {
        case '1': {
          this.setState({ category: 'Lazer' });
          break;
        }
        case '2': {
          this.setState({ category: 'Transporte' });
          break;
        }
        case '3': {
          this.setState({ category: 'Saúde' });
          break;
        }
        case '4': {
          this.setState({ category: 'Alimentação' });
          break;
        }
      }
    } else {
      switch (category) {
        case '1': {
          this.setState({ category: 'Receita' });
          break;
        }
      }
    }
  };

  changeDate = (value) => {
    if (value) {
      let dateFormat = value.toLocaleString().split(',')[0];
      let date = dateFormat.split('/');
      let newDate = date.reverse().join('-');
      let yearMonth = newDate.slice(0, newDate.length - 3);
      let day = parseInt(date[2]);
      let month = parseInt(date[1]);
      let year = parseInt(date[0]);
      this.setState({
        year: year,
        month: month,
        day: day,
        yearMonth: yearMonth,
        yearMonthDay: newDate,
      });
    }

    this.setState({ dateValue: value });
  };

  // const id = this.props.id;

  sendTransactionData = async () => {
    let data = {
      description: this.state.description,
      value: this.state.value,
      category: this.state.category,
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      yearMonth: this.state.yearMonth,
      yearMonthDay: this.state.yearMonthDay,
      type: this.state.type,
    };

    console.log('enviando');
    if (this.props.mode === 'receive') {
      CRUD.receive('', data);

      this.props.setTransactions();
    } else if (this.props.mode === 'update') {
      CRUD.update(this.props.id, data);
    }
  };

  // () => transaction(id, data);
  // api
  //   .post('/', data)
  //   .then(async (response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err, ' Dados não puderam ser enviados');
  //   });
  render() {
    const Button = this.props.Button;
    return (
      <>
        {/* <a
          id="filter-add"
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          NOVO LANÇAMENTO
        </a> */}
        <Button />
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="col s12 title-modal">
            <h3>Insira as informações da transação</h3>
          </div>
          <div className="first-row col s12">
            <div className="col s3 type-movimentation-container">
              <select
                onChange={(e) => this.handleType(e.target.value)}
                id="type-expense"
                className="browser-default"
              >
                <option value="" disabled selected>
                  Escolha o tipo de movimentação
                </option>
                <option value="0">Receita</option>
                <option value="1">Despesa</option>
              </select>
            </div>
            <div className="col s3 type-transaction-container">
              {this.state.indexSelector === '1' ? (
                <select
                  onChange={(e) => this.handleCategory(e.target.value)}
                  id="type-values-selector-2"
                  className="browser-default"
                >
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
                <select
                  onChange={(e) => this.handleCategory(e.target.value)}
                  id="type-values-selector-1"
                  className="browser-default"
                >
                  <option value="" disabled selected>
                    Escolha o tipo de{' '}
                    {this.state.indexType[this.state.indexSelector]}
                  </option>
                  <option value="1">Salário</option>
                </select>
              )}
            </div>
            <div className="col s3">
              <input
                onChange={(e) => this.handleValue(e.target.value)}
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
          <div className="second-row col s12">
            <div className="col s3 date-picker-container">
              <span className="label-date">
                Data{' '}
                {this.state.indexSelector === '0'
                  ? 'do ' + this.state.indexType[this.state.indexSelector]
                  : 'da ' + this.state.indexType[this.state.indexSelector]}
              </span>
              <DatePicker
                className="calendar-picker"
                onChange={(e) => this.changeDate(e)}
                value={this.state.dateValue}
              />
            </div>
            <div className="col s8 description-container">
              <input
                onChange={(e) => this.handleDescription(e.target.value)}
                id="input-lançamento"
                placeholder="Descrição"
                type="text"
                className="validate"
              />
            </div>
          </div>
          <div className="modal-footer">
            {/* <a
              onClick={() => this.sendTransactionData()}
              className="modal-close waves-effect waves-red btn-flat"
            >
              Adicionar
            </a> */}
            <ButtonJoker
              mode={this.props.mode}
              sendData={this.sendTransactionData}
            />
            <a className="modal-close waves-effect waves-green btn-flat">
              Fechar
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
