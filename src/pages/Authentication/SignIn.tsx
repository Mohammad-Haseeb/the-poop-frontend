import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo.png';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate(); // Create an instance of useNavigate

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = 'https://api.needtopoop.com/users/token'; // Use the correct URL
    const body = { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('user', JSON.stringify(data)); // Save the token or user data in localStorage
        navigate('/'); // Redirect to the home page or dashboard after successful login
      } else {
        setStatus('Invalid Credentials');
        console.error('Login failed:', response.status);
        // Handle login failure, e.g., show error message
      }
    } catch (error) {
      setStatus('Login Failed');
      console.error('Network error:', error);
      // Handle network error, e.g., show error message
    }
  };

  return (
    <div className="rounded-sm dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <div
                className="mt-28
              "
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: '70%', height: '70%' }}
                  // className="w-24 h-24 lg:w-52  lg:h-36"
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Logo"
                // style={{ width: '50px', height: '50px' }}
                className="w-20 h-20 lg:w-52  lg:h-36"
              />
            </div>
            <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to The Poop
            </h2>

            <form onSubmit={submit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="password"
                  required
                  className="w-full rounded-lg border border-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <p className="text-red-800 font-medium">{status}</p>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-red-900 bg-red-800 p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
