import React, { Component, useContext } from 'react';
import Title from "./Title";
import {GlobalProvider} from '../context/GlobalState';
import {GlobalContext} from '../context/GlobalState';


export const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
      <>
        <h1>${total}</h1>
      </>
    )
  }

  export const Transaction = ({transaction}) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
          {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
      )
  }

export const TransactionList = () => {
   const { transactions } = useContext(GlobalContext);

    return (
      <>
        <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id}
                        transaction={transaction} />
                ))}
                </ul>
      </>
    )
  }

  export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext);
  
    const amounts = transactions.map(transaction => transaction.amount);
  
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    return (
      <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
    <p className="money plus">+${income}</p>
          </div>
          <div>
            <h4>Expense</h4>
    <p className="money minus">-${expense}</p>
          </div>
        </div>
    )
  }




  
class Budget extends Component {

    render() {
        return (
            <section className="bgComponent">
                <Title title="Hotel Budget"/>
                <div className="component">
                    <GlobalProvider>
                    <Balance/>
                    <IncomeExpenses/>
                   <TransactionList/>
                    </GlobalProvider>
                </div>
            </section>

        )
    }
}

export default Budget;