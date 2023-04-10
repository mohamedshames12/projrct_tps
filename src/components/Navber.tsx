import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const logUserOut = async () => {
    await signOut(auth);  
  }

  return (
    <div className='container'>
      <p>sample project</p>
      <nav>
      <Link  to="/" className="nav-link">Home</Link>
      <Link  to="/contact" className="nav-link">Contact</Link>
        {user ? <Link to='/create' className="nav-link">Create Post</Link> :    <Link  to="/login" className="nav-link">Login</Link>}
      </nav>
      {user && (
           <div className='user'>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL || ""} alt="" />
              <button onClick={logUserOut}>logout</button>
          </div>
        )}
    </div>
  );
};

export default Navbar;