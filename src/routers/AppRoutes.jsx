import { Route, Routes } from 'react-router';
import { App } from '../App.jsx';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp.jsx';
import ProtectedLayout from '../components/layouts/ProtectedLayout.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { Settings } from '../pages/Settings.jsx';
import { Profile } from '../pages/Profile.jsx';
import { PostDetails } from '../components/features/posts/PostDetails.jsx';
import PublicLayout from '../components/layouts/PublicLayout.jsx';
import PublicRoute from '../components/layouts/PublicRoute.jsx';
import { Pictures } from '../pages/pictures.jsx';

export function AppRoutes(){
    return (
        <Routes>

            <Route element={<PublicLayout/>}>
                <Route path='/' element={<App/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
            </Route>

            {/* protected layout */}
            <Route element={<ProtectedLayout/>}>
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/posts/:id' element={<PostDetails/>} />
                <Route path='/pictures' element={<Pictures/>} />

                <Route path='/users/:userId' element={<Profile />} />
            </Route>
            
        </Routes>
    );
}