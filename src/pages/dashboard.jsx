import { Main } from "../components/Main";
import {Navbar} from "../components/Navbar";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export default function Dashboard(){
    return (
      <div className="min-h-full">
        <Navbar />
        <Main/>
      </div>
    );
}