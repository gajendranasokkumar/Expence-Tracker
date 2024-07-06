// src/components/MoneyManager/index.js
import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const MoneyManager = () => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState(transactionTypeOptions[0].optionId)
  const [transactionsList, setTransactionsList] = useState([])

  const onAddTransaction = () => {
    if (title && amount) {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount: parseInt(amount),
        type,
      }
      setTransactionsList([...transactionsList, newTransaction])
      setTitle('')
      setAmount('')
      setType(transactionTypeOptions[0].optionId)
    }
  }

  const onDeleteTransaction = id => {
    setTransactionsList(
      transactionsList.filter(transaction => transaction.id !== id),
    )
  }

  const getIncome = () =>
    transactionsList
      .filter(transaction => transaction.type === 'INCOME')
      .reduce((total, transaction) => total + transaction.amount, 0)

  const getExpenses = () =>
    transactionsList
      .filter(transaction => transaction.type === 'EXPENSES')
      .reduce((total, transaction) => total + transaction.amount, 0)

  const getBalance = () => getIncome() - getExpenses()

  return (
    <div className="money-manager-container">
      <div className="header-container">
        <h1>Hi, Richard</h1>
        <p>Welcome back to your Money Manager</p>
      </div>
      <MoneyDetails
        balance={getBalance()}
        income={getIncome()}
        expenses={getExpenses()}
      />
      <div className="transaction-container">
        <form className="transaction-form" onSubmit={e => e.preventDefault()}>
          <h2>Add Transaction</h2>
          <label htmlFor="title">TITLE</label>
          <input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="TITLE"
          />
          <label htmlFor="amount">AMOUNT</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="AMOUNT"
          />
          <label htmlFor="TYPE">TYPE</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {transactionTypeOptions.map(option => (
              <option key={option.optionId} value={option.optionId}>
                {option.displayText}
              </option>
            ))}
          </select>
          <button type="button" onClick={onAddTransaction}>
            Add
          </button>
        </form>
        <div className="history-container">
          <h2>History</h2>
          <div className="titlehead">
            <p>Title</p>
            <p>Amount</p>
            <p>Type</p>
          </div>
          <ul className="transactions-list">
            {transactionsList.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={onDeleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MoneyManager
