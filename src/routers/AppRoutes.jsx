import { Route, Routes } from 'react-router';
import { App } from '../App.jsx';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp.jsx';
import ProtectedLayout from '../components/layouts/ProtectedLayout.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { Settings } from '../pages/Settings.jsx';
import { Profile } from '../pages/Profile.jsx';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/profile' element={<Profile/>} />



            {/* protected layout */}
            <Route element={<ProtectedLayout/>}>
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/settings' element={<Settings/>} />
            </Route>
        </Routes>
    );
}