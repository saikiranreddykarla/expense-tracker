import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store/store'
import './index.css'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error) {
    console.error('SpendWise could not load:', error)
  }

  render() {
    if (this.state.hasError) {
      return <div className="app-error"><h1>SpendWise could not load</h1><p>{this.state.errorMessage}</p><p>Refresh the page. If this message remains, clear this site’s saved data and try again.</p></div>
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppErrorBoundary>
  </React.StrictMode>,
)
