import image from '~/assets/loginImage.png';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { SVG } from '~/constant/SVG';
import { authClient } from '~/lib/auth-client';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';
import { Input } from '~/components/ui/input';
import { Loader } from 'lucide-react';

const SignInDialog = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = authClient;
  const [disabled, setDisabled] = useState(false);

  const handleSignIn = async () => {
    setLoadingEmail(true);
    setDisabled(true);
    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: `${URL}/dashboard`,
      });
      console.log(data, error);
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    setDisabled(true);
    try {
      const { data, error } = await signIn.social({
        provider: 'google',
        callbackURL: `${URL}/dashboard`,
      });
      console.log(data, error);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoadingGithub(true);
    setDisabled(true);
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: `${URL}/dashboard`, // This is where users should go after auth
      });
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoadingGithub(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* Left side with illustration */}
        <div className="hidden w-1/2 bg-gray-100 items-center justify-center p-8 lg:flex">
          <div className="w-full flex items-center justify-center">
            <img
              src={image}
              alt="Login illustration"
              className="h-[400px] 2xl:h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center flex justify-center items-center gap-5">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Login to your account
              </h1>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
                  <SVG.email />
                </div>
                <Input
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
                <Input
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
              disabled={disabled}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md cursor-pointer"
              type="submit"
              onClick={handleSignIn}
            >
              {loadingEmail && <Loader className="animate-spin" />}
              {loadingEmail ? 'Logging in...' : 'Login'}
            </Button>
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500 text-sm">Or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                disabled={disabled}
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center py-2 px-4 border gap-3 border-gray-300 rounded-md cursor-pointer"
              >
                {loadingGoogle && <Loader className="w-4 h-4 animate-spin" />}
                <SVG.google />
                Google
              </Button>
              <Button
                disabled={disabled}
                onClick={handleGithubSignIn}
                type="button"
                className="flex items-center justify-center py-2 px-4 border gap-3 border-gray-300 rounded-md cursor-pointer"
              >
                {loadingGithub && <Loader className="w-4 h-4 animate-spin" />}
                <SVG.github />
                Github
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInDialog;
