import { createSlice } from '@reduxjs/toolkit'

const exampleTransactions = [
  { id: '1', title: 'Salary', amount: 52000, type: 'income', category: 'Salary', date: '2026-08-01' },
  { id: '2', title: 'Apartment rent', amount: 15000, type: 'expense', category: 'Bills', date: '2026-08-03' },
  { id: '3', title: 'Groceries', amount: 2350, type: 'expense', category: 'Food', date: '2026-08-12' },
  { id: '4', title: 'Freelance website', amount: 6000, type: 'income', category: 'Freelance', date: '2026-08-18' },
]
const storageKey = 'spendwise-transactions'

const getSavedTransactions = () => {
  try {
    const savedTransactions = localStorage.getItem(storageKey)
    const parsedTransactions = savedTransactions ? JSON.parse(savedTransactions) : exampleTransactions
    return Array.isArray(parsedTransactions) ? parsedTransactions : exampleTransactions
  } catch {
    return exampleTransactions
  }
}

const initialState = {
  items: getSavedTransactions(),
}

const saveTransactions = (transactions) => {
  localStorage.setItem(storageKey, JSON.stringify(transactions))
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.push(action.payload)
      saveTransactions(state.items)
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
      saveTransactions(state.items)
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveTransactions(state.items)
    },
  },
})

export const { addTransaction, updateTransaction, deleteTransaction } = transactionSlice.actions
export default transactionSlice.reducer
