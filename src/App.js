import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "@fontsource/roboto"

import PrivateRoute from './routes/privateRoute';
import Login from './components/auth/login/login'
import Register from './components/auth/register/register'
import Tasks from './components/tasks/list'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<PrivateRoute />}>
          <Route index element={<Tasks />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
