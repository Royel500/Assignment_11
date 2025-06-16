import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import SocialLogIn from '../SocialLogIn';

const SignIn = () => {
  const {logIn,user} =use(AuthContext)

  const handleSubmit = e => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  console.log("Creating user with:",name, email, password); 

  logIn(email, password) 
    .then(result => {
      console.log("User created:", result.user);
        Swal.fire({
        title: "Success!",
        text: "You are logIn successfully! 🎉",
        icon: "success",
        confirmButtonText: "OK",
      });
    })
    .catch(error => {
      console.error("Firebase error:", error.code, error.message);
    });
};



    return (
      <div className="hero bg-pink-100 min-h-screen">
  
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
           <h1 className='text-center font-bold'> Your Email : {
            user ? user.email : 'LogIn Please !'
            }</h1>
          <h1 className="text-3xl text-center text-blue-700 font-bold">Login now!</h1>
        <form onSubmit={handleSubmit} >
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral w-full my-2 mt-4">Login</button>
          <p>Have no Account ? <span className='text-fuchsia-800 text-[15px]  font-bold'>
            <NavLink to='/signUp'  >SignUp</NavLink></span>  </p>
        </form>
        <SocialLogIn></SocialLogIn>
      </div>
    </div>
</div>
    );
};

export default SignIn;