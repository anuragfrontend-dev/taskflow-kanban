import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"

export function LoginPage({ isDark }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('taskFlowUser') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('taskFlowLoggedInUser', JSON.stringify(user));
      navigate('/');
      setEmail('');
      setPassword('');
    }
    else {
      setError("Invalid email or password")
    }
  }

  const handleToggle = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={`w-full min-h-screen m-0 pt-28 pb-28 ${isDark ? 'bg-black' : 'bg-gray-200'}`}>
      <div className={`max-w-75 sm:max-w-100 p-2 box-border  sm:p-5 h-sreen shadow rounded-xl m-auto 
        ${isDark ? 'bg-[#232326] text-white' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className="font-bold text-xl">Welcome back</h1>
          <h4 className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>Please sign in to your account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-1">
            <label htmlFor="email" className={` text-sm font-medium ${isDark ? 'text-gray-200' : 'text-black'}`}>
              Email
            </label>
            <input
              type="email"
              placeholder="enter email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="py-1 px-2 bg-gray-100 text-sm font-medium rounded-lg border outline-0 text-black"
            />
          </div>
          <div className="flex flex-col mb-1 relative">
            <label htmlFor="password" className={` text-sm font-medium 
              ${isDark ? 'text-gray-200' : 'text-black'}`}
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="py-1 px-2 bg-gray-100 text-sm font-medium rounded-lg border outline-0 text-black"
            />
            {showPassword ?
              (<FaRegEye height={16} width={16}
                className="absolute right-4 top-7 cursor-pointer text-black"
                onClick={handleToggle} />) :
              (<FaRegEyeSlash hanging={16} width={16}
                className="absolute right-4 top-7 cursor-pointer text-black"
                onClick={handleToggle} />)
            }
          </div>
          <div className="mt-2">
            <label>
              <input type="checkbox" className="mr-1.5" />
              Rember me
            </label>
          </div>
          {error && (<p className="text-red-500 mt-2 font-medium ">{error}</p>)}
          <button type="submit"
            className="py-1.5 w-full cursor-pointer bg-gray-200 text-black rounded-2xl font-bold mt-2"
          >
            Log in
          </button>
          <div className="text-center cursor-pointer mt-4">Don't have an account?
            <span className="text-blue-400 ml-1 hover:underline">
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}