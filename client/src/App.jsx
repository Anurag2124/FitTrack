import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import SignupForm from './components/SignupForm'
import SigninForm from './components/SigninForm'
import LogWorkout from './pages/LogWorkout'
import Dashboard from './pages/Dashboard'
import WorkoutHistory from './pages/WorkoutHistory'
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <Layout>

          <Navbar />
          <Routes>
            <Route exact path ='/' element = {<LandingPage />} />
            <Route path ='/signup'  element = {<SignupForm />} />
            <Route path ='/signin'  element = {<SigninForm />} />

            <Route path ='/dashboard'  element = {<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />

            <Route path ='/log-workout'  element = {<ProtectedRoute>
              <LogWorkout />
            </ProtectedRoute>} />

            <Route path ='/workout-history'  element = {<ProtectedRoute>
              <WorkoutHistory />
            </ProtectedRoute>} />
          </Routes>
          
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
