import React from 'react';
import logo from './logo.svg';
import { Router, Route, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HospitalRegisterPage from './pages/HospitalRegisterPage';
import HospitalAppointmentPage from './pages/HospitalHomePage';
import Header from './components/common/Header';
import MakeAppointmentPage from './pages/MakeAppointmentPage';
import PatientHomePage from './pages/patient/PatientHomePage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      children:[
        {
          path:'hospitalregister',
          element:<HospitalRegisterPage/>
        },
        {
          path:'hospitalhome',
          element:<HospitalAppointmentPage/>
        },
        {
          path:'makeappointment',
          element:<MakeAppointmentPage/>
        },
        {
          path:'patienthome',
          element:<PatientHomePage/>
        }
      ]
    },
    
  ]);
  return (
        <React.StrictMode>
        <RouterProvider  router={router} />
      </React.StrictMode>
  );
}

export default App;





