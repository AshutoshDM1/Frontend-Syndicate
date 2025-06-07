import image from '~/assets/image.png';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { SVG } from '~/constant/SVG';

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
                    <SVG.email />
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
                    <SVG.password />
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
                  <SVG.google />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <SVG.facebook />
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
