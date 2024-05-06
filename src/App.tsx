import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import Bookshelf from './components/BookShelf'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App: FC = () => {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/books" element={<Bookshelf />} />
            <Route path="/login" element={<Signin />} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </Provider>
      </Router>
    </>
  )
}

export default App
