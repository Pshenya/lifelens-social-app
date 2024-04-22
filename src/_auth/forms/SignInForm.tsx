import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"

import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { SigninValidation } from '@/lib/validations'
import { useUserContext } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';


const SignInForm = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Defining the form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Defining a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if (!session) {
      return toast({ title: "Oops, session creating has failed. Please, try again =)", className: "bg-error-500" })
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    } else {
      return toast({ title: "Sorry, broski, sign in has failed. Please, try again =)" });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src='/assets/images/logo-w-text.png' alt='logo' width={200} className={`${theme === 'light' && 'svg-icon-black'}`}/>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Welcome to "LifeLens"</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Log in into your account, broski</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-dark-1 shad-button_primary">
            {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader lottie={false}/>  Logging in...
            </div>
            ) : "Log in"}
          </Button>

          <p className="text-small-regular text-light-3 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm;
