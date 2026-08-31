import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionForm, { categories } from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import { addTransaction, deleteTransaction, updateTransaction } from '../store/transactionSlice'

function Transactions() {
  const transactions = useSelector((state) => state.transactions.items)
  const dispatch = useDispatch()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [type, setType] = useState('all')
  const [month, setMonth] = useState('all')

  const filteredTransactions = useMemo(() => [...transactions].filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || item.category === category) && (type === 'all' || item.type === type) && (month === 'all' || item.date.slice(0, 7) === month)).sort((a, b) => new Date(b.date) - new Date(a.date)), [transactions, search, category, type, month])
  const months = [...new Set(transactions.map((item) => item.date.slice(0, 7)))].sort().reverse()

  const saveTransaction = (transaction) => {
    if (editingTransaction) { dispatch(updateTransaction(transaction)); setEditingTransaction(null) }
    else dispatch(addTransaction({ ...transaction, id: crypto.randomUUID() }))
  }
  const removeTransaction = (id) => { if (window.confirm('Delete this transaction?')) dispatch(deleteTransaction(id)) }

  return <>
    <section className="page-heading"><p className="eyebrow">Manage your records</p><h1>Transactions</h1><p>Add, update, and review all of your income and expenses.</p></section>
    <div className="transactions-layout"><TransactionForm onSave={saveTransaction} editingTransaction={editingTransaction} onCancel={() => setEditingTransaction(null)} /><section className="panel transactions-panel"><div className="filter-grid"><input aria-label="Search transactions" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} /><select value={type} onChange={(e) => setType(e.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={month} onChange={(e) => setMonth(e.target.value)}><option value="all">All months</option>{months.map((item) => <option key={item} value={item}>{new Date(`${item}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</option>)}</select></div><p className="results-count">Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}</p><TransactionList transactions={filteredTransactions} onEdit={setEditingTransaction} onDelete={removeTransaction} /></section></div>
  </>
}

export default Transactions
