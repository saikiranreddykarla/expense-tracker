import React, { useEffect, useState } from 'react'

const emptyForm = {
  title: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10),
}

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Salary', 'Freelance', 'Other']

function TransactionForm({ onSave, editingTransaction, onCancel }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setForm(editingTransaction || emptyForm)
  }, [editingTransaction])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || Number(form.amount) <= 0) return
    onSave({ ...form, title: form.title.trim(), amount: Number(form.amount) })
    if (!editingTransaction) setForm(emptyForm)
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editingTransaction ? 'Update a record' : 'Keep your budget current'}</p>
          <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
        </div>
        {editingTransaction && <button type="button" className="text-button" onClick={onCancel}>Cancel</button>}
      </div>
      <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Monthly groceries" required /></label>
      <div className="two-columns">
        <label>Amount<input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0" required /></label>
        <label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></label>
      </div>
      <div className="two-columns">
        <label>Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="expense">Expense</option><option value="income">Income</option></select></label>
        <label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
      </div>
      <button className="primary-button" type="submit">{editingTransaction ? 'Save changes' : 'Add transaction'}</button>
    </form>
  )
}

export { categories }
export default TransactionForm
