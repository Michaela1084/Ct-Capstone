import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from './Logout';
import { LoginButton } from './Login';

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  

    const dropDown = () => {
        setIsVisible(!isVisible);
    };

    const clicked = () => {
       if (!isAuthenticated)  {
            loginWithRedirect()
        } 
        else {
        setIsVisible(false)
        }
        
    };
    
    return (
        <nav className='flex items-center justify-between flex-wrap bg-blue-500 p-6'>
            <div className='flex items-center flex-shrink-0 text-black mr-6'>
                <Link to='/' className='font-semibold text-xl tracking-tight hover:text-white'>Todo List</Link>
            </div>
            <div className='block'>
                <button onClick={dropDown} className='flex items-center px-3 py-2 text-white-200 border rounded border-black-400 hover:text-white hover:border-white'>
                    <i className='fas fa-bars'></i>
                </button>
            </div>
            { isVisible ? (
                <div className='w-full block flex-grow items-center'>
                    <div className="text-sm lg:flex-grow">
                        <Button className='p-3 m-5 justify-center'>
                            <div>
                                <Link to='/' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white-200 hover:text-white mr-4'>
                                    Home
                                </Link>
                            </div>
                        </Button>
                        <Button className='p-3 m-5 justify-center'>
                            <div>
                                <Link to='/profile' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white-200 hover:text-white mr-4'>
                                <img
                src={user?.picture}
                alt="Profile"
                className="profile__avatar"
              />
                                    Profile
                                </Link>
                            </div>
                        </Button>
                        
                        <Button className='p-3 m-5 justify-center'>
                            <div>
                                <Link to='/dashboard' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4'>
                                    Dashboard
                                </Link>
                            </div>
                        </Button>
                        {
                            !isAuthenticated ? 
                            <Button className='p-3 m-5 justify-center'>
                                <LoginButton />
                            </Button>
                            :
                            <><Button className='p-3 m-5 justify-center'>
                                    <LogoutButton />
                                   <Link to='/profile' onClick={ clicked } className='hover:text-white'><h1>{user?.name}</h1></Link>
                                </Button> 
                                    </>
                        }
                    </div>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}

export default Navbar;