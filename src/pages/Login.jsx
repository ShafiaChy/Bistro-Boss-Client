import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from "react-router-dom";
import illustration from "../assets/others/authentication2.png";
import SocialAuth from "../components/SocialAuth";
import { AuthContext } from "../contexts/AuthProvider";
import useToken from "../Hooks/useToken";

const Login = () => {
  const [error, setError] = useState("");
  const { user, signIn, setLoading } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [token] = useToken(loginUserEmail);
  const from = location.state?.from?.pathname || "/";
  

  if (token) {
    navigate(from, { replace: true });
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user.accessToken);
        setLoginUserEmail(user.email);
        
        form.reset();
        setError("");

      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
 

  return (
    <div className="bg-authentication min-h-screen flex items-center">
      {
        user && navigate(from, { replace: true })
      }
      <section className="container mx-auto p-12 h-full">
        <div className="grid md:grid-cols-2">
          <div className="">
            <Helmet>
              <title>BB Restaurant |  Login</title>
            </Helmet>
            <img
              src={illustration}
              className="h-4/5 block mx-auto"
              alt="Password_image"
            />
          </div>
          <div className="">
            <h1 className="font-bold text-center text-3xl">Login</h1>
            <form onSubmit={handleSubmit} className="md:w-1/2 mx-auto">
              {/* Input field with level from daisyui */}
              <div className="form-control w-full max-w-xs mb-6">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mb-6">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mb-6">
                <input
                  type="submit"
                  value={"Sign In"}
                  className="input input-bordered text-white w-full max-w-xs bg-[#d1a054] cursor-pointer"
                />
              </div>
            </form>

            <div className="md:w-1/2 mx-auto">
              <p className="font-semibold text-center my-6 text-[#d1a054]">
                New here? <Link to='/register' className="font-bold">Create a New Account</Link>
              </p>
            </div>

            <div className="md:w-1/2 mx-auto">
              <p className="font-semibold text-center my-6">Or sign in with</p>
              {/* Separate component for Social login  */}
              <SocialAuth />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
