import image from '~/assets/signupImage.png';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { SVG } from '~/constant/SVG';
import { authClient, signIn } from '~/lib/auth-client';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';
import { Loader , User } from 'lucide-react';
import { Input } from '~/components/ui/input';

const SignupDialog = () => {
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = authClient;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoadingEmail(true);
    await signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name: name, // user display name
        image: 'https://github.com/shadcn.png', // User image URL (optional)
        callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          toast.loading('Loading...');
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success('Signup successful');
          navigate('/dashboard');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          toast.dismiss();
        },
      }
    );
    setLoadingEmail(false);
  };

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    try {
      await signIn.social({
        provider: 'google',
      }, {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      });
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoadingGoogle(false);
    }
  };
  const handleGithubSignIn = async () => {
    setLoadingGithub(true);
    try {
      await signIn.social({
        provider: 'github',
      }, {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
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
            <div className="text-center flex justify-center items-center gap-5">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome To Restzo!{' '}
              </h1>
              <h1 className="text-xl font-light tracking-tight text-gray-900"></h1>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
                  <User />
                </div>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md cursor-pointer"
              type="submit"
              onClick={handleSignIn}
            >
              {loadingEmail && <Loader className="animate-spin" />}
              {loadingEmail ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500 text-sm">Or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center py-2 px-4 border gap-3 border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {loadingGoogle && <Loader className="w-4 h-4 animate-spin" />}
                <SVG.google />
                Google
              </button>
              <button
                onClick={handleGithubSignIn}
                type="button"
                className="flex items-center justify-center py-2 px-4 border gap-3 border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {loadingGithub && <Loader className="w-4 h-4 animate-spin" />}
                <SVG.github />
                Github
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupDialog;
