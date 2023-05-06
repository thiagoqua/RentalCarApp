import './pages/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Reserve } from './pages/Reserve';
import { MyRents } from './pages/MyRents';
import { Auth } from './pages/Auth';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App():JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/reserve' element={<Reserve/>}/>
        <Route path='/authenticate' element={<Auth/>}/>
        <Route path='/me' element={<MyRents/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}