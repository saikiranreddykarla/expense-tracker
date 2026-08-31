import React from 'react'
import { formatMoney } from './SummaryCards'

function SpendingChart({ transactions }) {
  const totals = transactions.filter((item) => item.type === 'expense').reduce((result, item) => {
    result[item.category] = (result[item.category] || 0) + item.amount
    return result
  }, {})
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1])
  const largest = entries[0]?.[1] || 1

  return (
    <section className="panel chart-panel">
      <div className="panel-title"><div><p className="eyebrow">Where it goes</p><h2>Spending by category</h2></div></div>
      {entries.length ? <div className="bars">{entries.map(([category, amount]) => <div className="bar-item" key={category}><div className="bar-label"><span>{category}</span><strong>{formatMoney(amount)}</strong></div><div className="bar-track"><div className="bar-fill" style={{ width: `${(amount / largest) * 100}%` }} /></div></div>)}</div> : <div className="empty-state">Add an expense to see your spending breakdown.</div>}
    </section>
  )
}

export default SpendingChart
