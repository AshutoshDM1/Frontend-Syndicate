import image from '~/assets/image.png';
import { useState } from 'react';
import { Button } from '../ui/button';

const SignupDialog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* Left side with illustration */}
        <div className="hidden w-1/2 bg-gray-100 items-center justify-center p-8 lg:flex">
          <div className="w-full">
            <img
              src={image}
              alt="Login illustration"
              className="h-[500px] 2xl:h-[600px] object-cover"
            />
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back!</h1>
            </div>

            <form className="space-y-6">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md"
                type="submit"
              >
                Login
              </Button>

              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-4 text-gray-500 text-sm">Or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="#" className="font-medium text-orange-500 hover:text-orange-600">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupDialog;
