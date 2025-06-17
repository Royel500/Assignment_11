import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
// import { auth } from '../../Firebase/FireBase';
import Swal from 'sweetalert2';
import SocialLogIn from '../SocialLogIn';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  
const handleSubmit = e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;



  createUser(email, password) 
    .then(result => {
 
           Swal.fire({
        title: "Success!",
        text: "Account created successfully! 🎉",
        icon: "success",
        confirmButtonText: "OK",
      });
    })
    .catch(error => {
      alert(error.code, error.message)

    });
};


  return (
    <div className="hero bg-pink-100 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl text-center italic text-blue-800 font-bold">
            Register Your Account!
          </h1>
          <form onSubmit={handleSubmit}>

            <label className="label">Name</label>
            <input type="text" name="name" className="input" placeholder="Name" required />

            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" required />

            <label className="label">Password</label>
<input type="password" name="password" className="input" placeholder="Password" required />


            <label className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" required />
              I agree to the Terms and Conditions
            </label>

            <button type="submit" className="btn w-full  bg-blue-300 mt-4">Sign Up</button>
          </form>

          <p className="mt-4">
            Already have an account?
            <span className="text-fuchsia-800 text-lg font-bold ml-1">
              <NavLink to="/signIn">Sign In</NavLink>
            </span>
          </p>
           <SocialLogIn></SocialLogIn>
        </div>
       
      </div>
    </div>
  );
};

export default SignUp;
