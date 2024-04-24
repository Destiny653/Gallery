import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './myapi-content/Home';
import Detail from './myapi-content/Detail';
import Category from './myapi-content/Category';
import AuthProvider from './auth/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<Detail />} />
            <Route path='/category/:ctg' element={<Category />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
