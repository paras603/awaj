import { Route, Routes } from 'react-router';
import { App } from '../App.jsx';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp.jsx';
import Dashboard from '../pages/dashboard.jsx';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    );
}