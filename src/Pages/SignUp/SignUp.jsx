import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router'; // Correct import
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import SocialLogIn from '../SocialLogIn';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/FireBase'; // Make sure this exports `auth`

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    setError('');

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters',
      });
      return;
    }

    try {
      // Create user
      const userCredential = await createUser(email, password);

      // Update profile with displayName and photoURL
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo || null,
      });

      // Show success
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome, ${email}`,
      });

      // Optionally: Reset form
      form.reset();
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
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

            <label className="label">Photo URL</label>
            <input type="text" name="photo" className="input" placeholder="Photo URL" required />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />

            <label className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" required />
              I agree to the Terms and Conditions
            </label>

            <button type="submit" className="btn w-full bg-blue-300 mt-4">
              Sign Up
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <p className="mt-4">
            Already have an account?
            <span className="text-fuchsia-800 text-lg font-bold ml-1">
              <NavLink to="/signIn">Sign In</NavLink>
            </span>
          </p>

          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
