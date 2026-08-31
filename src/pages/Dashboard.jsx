import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SummaryCards from '../components/SummaryCards'
import TransactionList from '../components/TransactionList'
import SpendingChart from '../components/SpendingChart'

function Dashboard() {
  const transactions = useSelector((state) => state.transactions.items)
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  return <>
    <section className="hero"><div><p className="eyebrow">Your money at a glance</p><h1>Good morning! Here’s your financial overview.</h1></div><Link className="primary-button" to="/transactions">+ Add transaction</Link></section>
    <SummaryCards income={income} expense={expense} balance={income - expense} />
    <div className="dashboard-columns"><SpendingChart transactions={transactions} /><section className="panel"><div className="panel-title"><div><p className="eyebrow">Latest activity</p><h2>Recent transactions</h2></div><Link to="/transactions">View all</Link></div><TransactionList transactions={recent} compact /></section></div>
  </>
}

export default Dashboard
