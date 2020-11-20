import { useState, useEffect } from 'react';
import './App.css';
import 'materialize-css';
import Modal from './Components/Modal';
import api from './Api/index';
import Button from './Components/Button-Lançamento';
import ButtonEditIcon from './Components/Button-Edit';

function App() {
  const getAllTransactions = async () => {
    api.get('http://localhost:3001/api/transactions').then((res) => {
      const uniqueValues = [
        ...new Set(res.data.map((transaction) => transaction.yearMonth)),
      ];
      // setTransactions(res.data);
      // res.data.map((transaction) => {
      //   setTransactions(transaction);
      // });
      console.log(res.data);
      const receita = res.data.map((transaction) =>
        transaction.type === '+' ? transaction.value : null
      );
      const profit = receita.reduce((accumulator, current) => {
        return accumulator + current;
      });

      const despesa = res.data.map((transaction) =>
        transaction.type === '-' ? transaction.value : null
      );
      const cost = despesa.reduce((accumulator, current) => {
        return accumulator + current;
      });

      const saldo = profit - cost;
      const quantity = res.data.length;

      console.log(saldo);
      console.log(cost);
      console.log(profit);
      console.log(res.data.length);

      setSaldo(saldo);
      setCost(cost);
      setProfit(profit);
      setQuantity(quantity);
      setMonths(uniqueValues);

      // setMonthSelected(uniqueValues[0]);
    });
  };
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getAllTransactions();
    // console.log(transactions);
  }, [transactions]);
  const [saldo, setSaldo] = useState(0);
  const [profit, setProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [months, setMonths] = useState([]);
  const [monthSelected, setMonthSelected] = useState('');
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

  // const getPeriod = async (yearMonth) => {
  //   await api
  //     .get(`http://localhost:3001/api/transactions?period=${yearMonth}`)
  //     .then((res) => {
  //       console.log('executou');
  //       setTransactions(res.data);
  //       console.log(transactions, 'resposta');
  //     })
  //     .catch((err) => {
  //       console.log('Não foi possível', err);
  //     });
  // };

  const handleMonth = async (yearMonth) => {
    console.log(yearMonth);
    setMonthSelected(yearMonth);
    await api
      .get(`http://localhost:3001/api/transactions?period=${yearMonth}`)
      .then((res) => {
        console.log('executou');
        setTransactions(res.data);
        console.log(transactions, 'resposta');
      })
      .catch((err) => {
        console.log('Não foi possível', err);
      });
    // getPeriod(yearMonth);
  };

  const handleDelete = async (id) => {
    await api
      .delete(`http://localhost:3001/api/transactions/${id}`)
      .then((res) => {
        console.log(res);
        handleMonth(monthSelected);
      })
      .catch((err) => console.log(err, 'Não foi possível deletar este ID'));
  };

  const setTransactionsComponent = (returnedTransactions) => {
    setTransactions(returnedTransactions);
  };
  const returnTransactions = () => {
    return (
      <div>
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="col s12"
            style={{
              height: 90,
              borderRadius: 2,
              backgroundColor: transaction.type === '+' ? '#52D142' : '#DE7265',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <div
              className="col s1"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '90%',
                width: '3%',
              }}
            >
              {' '}
              <span style={{ fontSize: 30, fontFamily: 'Roboto Slab, serif ' }}>
                {index < 10 ? `0${index + 1}` : index}
              </span>
            </div>
            <div
              className="col s3"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                height: '90%',
              }}
            >
              {' '}
              <div>
                <span style={{ fontSize: 28 }}>Lazer</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span
                  style={{ fontSize: 18, fontFamily: 'Roboto Slab, serif' }}
                >
                  {transaction.description}
                </span>
              </div>
            </div>
            <div
              className="col s4"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '90%',
              }}
            >
              {' '}
            </div>
            <div
              className="col s2"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '90%',
              }}
            >
              {' '}
              <span style={{ fontSize: 30, fontFamily: 'Roboto Slab, serif' }}>
                {`R$ ${transaction.value}`}
              </span>
            </div>
            <div
              className="col s1"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                height: '70%',
                width: '7%',
              }}
            >
              {' '}
              <div style={{ width: '50%' }}>
                <Modal
                  id={transaction.id}
                  mode={'update'}
                  Button={ButtonEditIcon}
                />
              </div>
              <div style={{ width: '50%' }}>
                <i
                  onClick={() => handleDelete(transaction.id)}
                  style={{ height: 20, width: 20 }}
                  className="icon-edit material-icons"
                >
                  delete
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
          <select
            onChange={(e) => handleMonth(e.target.value)}
            value={monthSelected}
            className="browser-default"
          >
            {months.map((month, index) => {
              return <option key={index}>{month}</option>;
            })}
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
              {quantity}
            </span>
          </div>
          <div className="values">
            <span className="label-value">Receitas:</span>
            <span id="valores" className="value-text">
              {profit}
            </span>
          </div>
          <div className="values">
            <span className="label-value">Despesas:</span>
            <span id="despesas" className="value-text">
              {cost}
            </span>
          </div>
          <div className="values">
            <span className="label-value">Saldo:</span>
            <span id="saldo" className="value-text">
              {profit}
            </span>
          </div>
        </div>
        <div class="add-values-row">
          <div className="col s2 filter-add-container">
            <Modal
              setTransactions={getAllTransactions}
              mode={'receive'}
              Button={Button}
            />
          </div>
          <div class="input-field col s10">
            <input id="input-lançamento" type="text" className="validate" />
            <label for="input-lançamento">Lançamento</label>
          </div>
        </div>
        {returnTransactions()}
      </div>
    </div>
  );
}

export default App;
