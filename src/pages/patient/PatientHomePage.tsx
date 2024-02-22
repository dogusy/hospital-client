import { Chip, Container, Divider, Paper, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsByTC, setPatient, setShowMakeAppointmentSuccessfullMessage } from "../../features/appointmentSlice";
import { RootState } from "../../store/rootReducer";
import { ToastContainer, toast } from "react-toastify";
import SiteWrapper from "../../components/SiteWrapper";
import AppointmentTable from "../../components/appointment/AppointmentTable";
import HospitalDetails from "../../components/hospital/HospitalDetails";
import Patient from "../../types/patient";
import { fetchHospitalNames } from "../../features/hospitalSlice";
import { AppDispatch } from "../../store/store";
import PatientAppointmentTable from "../../components/appointment/PatientAppointmentTable";
import PatientDetailsTable from "../../components/patient/PatientDetailsTable";

const PatientHomePage: React.FC = () =>{
    const { showMakeAppointmentSuccessfullMessage, patientList,patient } = useSelector((state: RootState) => state.appointment);
const defaultTheme = createTheme();
const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(showMakeAppointmentSuccessfullMessage){
          toast.success("Randevu alındı.");
          dispatch(setShowMakeAppointmentSuccessfullMessage(false));
        }
        const data = localStorage.getItem("patient");
        if(data !== null){
          const patientInfo:Patient = JSON.parse(data) as Patient ;
          onload(patientInfo);
        }
      }, [])

    return(
        <SiteWrapper >
        <ToastContainer/>

<ThemeProvider theme={defaultTheme} >
  <Container component="main">
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
  <PatientDetailsTable/>
  </Paper>
  <Container></Container>
  <Divider>
  <Chip label="" size="small" />
  </Divider>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <PatientAppointmentTable patientList={patientList}></PatientAppointmentTable>
  </Paper>
  </Container>
</ThemeProvider>
</SiteWrapper>
    );

     function onload(params:Patient) {
      dispatch(setPatient({
        username:params.username,
        sex: params.sex,
        age:params.age ,
        address: params.address,
        tc: params.tc,
        surname:params.surname
      }));
      dispatch(fetchHospitalNames());
      if(params.tc){
        dispatch(fetchAppointmentsByTC(params.tc));
      }
    }
    
}


export default PatientHomePage;