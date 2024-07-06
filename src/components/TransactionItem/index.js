// src/components/TransactionItem/index.js
import React from 'react'
import './index.css'

const TransactionItem = ({transaction, onDelete}) => (
  <li className="transaction-item">
    <p>{transaction.title}</p>
    <p>Rs {transaction.amount}</p>
    <p>{transaction.type}</p>
    <button data-testid="delete" onClick={() => onDelete(transaction.id)}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        alt="delete"
      />
    </button>
  </li>
)

export default TransactionItem
