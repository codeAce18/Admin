import React, { useState } from 'react'
import { authenticateAdmin } from '../scripts/fetch.ts'
import { showSuccessMessage } from '../scripts/utils.js';
import { useAppContext } from '../context/index.tsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [info, setInfo] = useState({ email: "", password: "" });
    const {setToken} =useAppContext();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await authenticateAdmin(info.email, info.password);
        if(res) {
            showSuccessMessage("Login successful!");
            setToken(res);
            navigate('/dashboard');
        }
        
    }

    return (
        <div className="container-fluid bg-dark h-full m-0">
            <div className="row justify-content-center pt-5">
                <div className="col-md-6 rounded p-5 border-tertiary m-bg-secondary text-white">
                    <h2 className="text-center  fs-6 fw-bold my-3 ">ADMIN LOGIN</h2>
                    <form method="POST" onSubmit={handleLogin} className='d-flex flex-column ff-secondary'>
                        <div className="form-group  mt-3">
                            <label htmlFor="email" className='fs-6'>Email address</label>
                            <input type="email" className="form-control m-bg-secondary" id="email" name="email" onChange={(e) => setInfo({ ...info, email: e.target.value })} value={info.email} required />
                        </div>
                        <div className="form-group  my-3">
                            <label htmlFor="password" className='fs-6'>Password</label>
                            <input type="password" className="form-control m-bg-secondary" id="password" name="password" onChange={(e) => setInfo({ ...info, password: e.target.value })} value={info.password} required />
                        </div>
                        <button type="submit" className=" text-center btn btn-block fw-bold text-white my-3 mx-auto border-0 btn-primary py-2 px-5">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login