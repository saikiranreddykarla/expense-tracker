import React from 'react'

const formatMoney = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

function SummaryCards({ income, expense, balance }) {
  const cards = [
    { label: 'Total Balance', value: balance, icon: '₹', className: 'balance' },
    { label: 'Total Income', value: income, icon: '↗', className: 'income' },
    { label: 'Total Expenses', value: expense, icon: '↘', className: 'expense' },
  ]

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article className={`summary-card ${card.className}`} key={card.label}>
          <span className="summary-icon">{card.icon}</span>
          <div>
            <p>{card.label}</p>
            <h2>{formatMoney(card.value)}</h2>
          </div>
        </article>
      ))}
    </section>
  )
}

export { formatMoney }
export default SummaryCards
