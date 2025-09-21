import {Navbar} from "../components/Navbar";

const user = {
  name: 'John',
  email: 'john@awaj.co',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export function Profile(){
    return (
        <>
            <Navbar user={user}/>
            <p>This is profile page.</p>
        </>
    );
}