import React from 'react'
import appLogo from '../assets/images/pirate/Pirate.png';
import { useAppContext } from '../context/index.tsx';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const {token} = useAppContext();
  const navigate = useNavigate();
  setTimeout(() => {
    if(token){
      navigate('/dashboard');
    }else{
      navigate('/login');
    }
   
  },3000);
  return (
    <div className='w-100 h-full p-5 justify-content-center align-items-center flex-column d-flex bg-dark text-white text-center'>
      <div className='bg-initial-gradient border-tetiary rounded-circle p-5 position-relative'>
        <img src={appLogo} alt="App Logo" className="img mx-5" width={150} />
        <h4 className='fw-bold my-2'>PIRATE HUNT </h4>
        <h6 className='ff-secondary '>Admin Dashboard</h6>

      </div>
     
    </div >
  )
}

export default Splash