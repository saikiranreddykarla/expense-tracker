import React from 'react'
import { formatMoney } from './SummaryCards'

function TransactionList({ transactions, onEdit, onDelete, compact = false }) {
  if (!transactions.length) return <div className="empty-state">No transactions found. Try a different filter or add one above.</div>

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <article className="transaction-row" key={transaction.id}>
          <div className={`transaction-symbol ${transaction.type}`}>{transaction.type === 'income' ? '↗' : '↘'}</div>
          <div className="transaction-details">
            <strong>{transaction.title}</strong>
            <span>{transaction.category} · {new Date(`${transaction.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <strong className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}>{transaction.type === 'income' ? '+' : '-'}{formatMoney(transaction.amount)}</strong>
          {!compact && <div className="row-actions"><button onClick={() => onEdit(transaction)}>Edit</button><button className="delete-button" onClick={() => onDelete(transaction.id)}>Delete</button></div>}
        </article>
      ))}
    </div>
  )
}

export default TransactionList
