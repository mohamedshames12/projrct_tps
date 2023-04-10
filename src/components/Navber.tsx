import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';
import {AiOutlineMenu} from 'react-icons/ai';



const Navbar = () => {

  const [user] = useAuthState(auth);

  const logUserOut = async () => {
    await signOut(auth);  
  }

  const [toggleMenu , setToggleMenu] = useState(false);
  const [screenWidth, setscreenWidth] = useState(window.innerWidth)

   const NavberMenue = () => {
     setToggleMenu(!toggleMenu)
   }


   
   useEffect(() => { 
    const changeWidth = () => {
      setscreenWidth(window.innerWidth)
    }
    window.addEventListener('resize' , changeWidth)

    return () =>{
      window.removeEventListener('resize' , changeWidth)
    }

    }, [])


  return (
    <div className='container'>
      <p>sample project</p>
      <nav>
      <Link  to="/" className="nav-link">Home</Link>
      {/* <Link  to="/contact" className="nav-link">Contact</Link> */}
        {user ? <Link to='/create' className="nav-link">Create Post</Link> :    <Link  to="/login" className="nav-link">Login</Link>}
      </nav>
    
      {user && (
           <div className='user'>
              {(toggleMenu || screenWidth > 500) && (
                <>
                  <p>{user?.displayName}</p>
                  <img src={user?.photoURL || ""} alt="" />
                  <button onClick={logUserOut}>logout</button>
                </>
              )}
          </div>
        )}
        <AiOutlineMenu onClick={NavberMenue} className='menu' />
        

    </div>
  );
};

export default Navbar;