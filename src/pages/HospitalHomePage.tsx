import React, { useEffect, useState } from 'react';
import {
  Chip,
  Container,
  Divider,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer, { RootState } from '../store/rootReducer';
import SiteWrapper from '../components/SiteWrapper';
import HospitalDetails from "../components/hospital/HospitalDetails";
import hospitalService from '../services/hospitalService';
import { fetchHospitalNames, fetchHospitalTypes, setHospitaAddress, setHospitaType, setHospitalName } from '../features/hospitalSlice';
import Hospital from '../types/hospital';
import { AppDispatch } from '../store/store';
import AppointmentTable from '../components/appointment/AppointmentTable';
import {  fetchAppointmentsInfoByHospitalId } from '../features/appointmentSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HospitalHomePage: React.FC = (props) => {
  const { patientList } = useSelector((state: RootState) => state.appointment);


  const defaultTheme = createTheme();
  const dispatch=useDispatch<AppDispatch>();

  useEffect(()=>{
    const data = localStorage.getItem("currentHospital");
    if(data !== null){
      const hospitaInfo:Hospital = JSON.parse(data) as Hospital ;
      onload(hospitaInfo);
    }
      
  },[])

  return (
    
    <SiteWrapper >
            <ToastContainer/>

    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <HospitalDetails/>
      </Paper>
      <Container></Container>
      <Divider>
      <Chip label="" size="small" />
      </Divider>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <AppointmentTable patientList={patientList}/>
      </Paper>
      </Container>
    </ThemeProvider>
    </SiteWrapper>
  );

  async function onload(params:Hospital) {
    const data:any = await hospitalService.hospitalRegister(params).catch(()=>{
      toast.warning("Hata oluştu");
    }
      );
    dispatch(fetchHospitalNames());
    if(params.id){
      dispatch(fetchAppointmentsInfoByHospitalId(params.id));
    }
    if(data !== null && data !==undefined){
    dispatch(setHospitalName(data.hospitalName));
    dispatch(setHospitaType(data.hospitalType));
    dispatch(setHospitaAddress(data.address));
  }
  }
        }


export default HospitalHomePage;
