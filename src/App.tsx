import {Routes, Route} from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster"

import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, Settings } from './_root/pages';
import RootWrapper from './_root/RootWrapper';
import AuthWrapper from './_auth/AuthWrapper';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import NotFoundPage from './components/shared/NotFoundPage';
import UnderConstructionPage from './components/shared/UnderConstructionPage';

import './globals.css'



const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthWrapper />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootWrapper />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/settings/*' element={<Settings />} />
        </Route>
        <Route path="/under-construction" element={<UnderConstructionPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* This will match any route that hasn't been matched by the above routes */}
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
