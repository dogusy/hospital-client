import React, { useEffect, useState } from 'react';
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Grid,
  Box,
  Container,
  ThemeProvider,
  Checkbox,
  Typography,
  Avatar,
  CssBaseline,
  createTheme,
  Modal,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState } from '../store/rootReducer';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { fetchHospitalNames } from '../features/hospitalSlice';
import { AppDispatch } from '../store/store';
import PatientAppointment from '../types/patientAppointment';
import appointmentService from '../services/appointmentService';
import { fetchAppointmentsByTC, makeAppointment } from '../features/appointmentSlice';
import SiteWrapper from '../components/SiteWrapper';

const initialFormData: PatientAppointment = {
  username: "",
  surname: "",
  sex: "",
  age: 0,
  address: "",
  tc: "",
  hospitalName: "",
  complaint: ""
};


const MakeAppointmentPage: React.FC = () => {



  const [formData, setFormData] = useState<PatientAppointment>(initialFormData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {hospitalNames, isfetchHospitalTypesSuccess,hospitalName,hospitalAddress}  = useSelector((state: RootState) => state.hospital);
    const handleChange = (key: keyof PatientAppointment, value: any) => {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };

    useEffect(() => {
        if(!isfetchHospitalTypesSuccess){
          dispatch(fetchHospitalNames())
        }
        console.log("Burada");
      }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    var isValid= validate(formData);
    if(!isValid){
      return;
    }
    if((formData.username.trim().length===0) && (formData.tc.trim().length!==0)){
      dispatch(fetchAppointmentsByTC(formData.tc)).then( ()=>navigate("/patienthome")).catch(()=>
      toast("Bir sorun oluştu."));
    }else{
        dispatch(makeAppointment(formData)).then( ()=>navigate("/patienthome")).catch(()=>
          toast("Bir sorun oluştu."));};
        }

      
  function validate(formData:PatientAppointment){
    if(formData.tc.length !=11  ){
      toast.error("11 haneli TC giriniz");
    }else if(formData.username.trim().length==0){
      toast.error("Adınızı giriniz");

    }else if(formData.surname.trim().length==0){
      toast.error("Soyadınızı giriniz");

    }else if(formData.sex.trim().length==0){
      toast.error("Cinsiyetinizi seçinizi");

    }else if(formData.age==0){
      toast.error("Yaşınızı giriniz");

    }else if(formData.address.trim().length==0){
      toast.error("Adınızı giriniz");

    }else if(formData.hospitalName.trim().length==0){
      toast.error("Hastane seçiniz");

    }else if(formData.complaint.trim().length==0){
      toast.error("Şikayetinizi giriniz");

    }else{
      return true;
    }
    return false;
  }
    
  const defaultTheme = createTheme();
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <SiteWrapper>
    <ThemeProvider theme={defaultTheme}>
      <Paper  sx={{  display: 'flex', flexDirection: 'column' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Appointment
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField

                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Hasta Adı"
                  autoFocus
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                />
                </Grid>
                <Grid item xs={12} >
                <TextField
                  name="surname"
                  required
                  fullWidth
                  id="surname"
                  label="Hasta Soyadı"
                  autoFocus
                  value={formData.surname}
                  onChange={(e) => handleChange('surname', e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
        <FormLabel component="legend">Hasta Cinsiyeti</FormLabel>
        <RadioGroup
          row
          value={formData.sex}
          onChange={(e) => handleChange('sex', e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Erkek" />
          <FormControlLabel value="female" control={<Radio />} label="Kadın" />
        </RadioGroup>
                </Grid>
                <Grid item xs={12} >
                <TextField
                  name="age"
                  required
                  fullWidth
                  id="age"
                  label="Yaş"
                  type='number'
                  autoFocus
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                />
                </Grid>
                <Grid item xs={12} >
                <TextField
                  name="tc"
                  required
                  fullWidth
                  id="tc"
                  label="TC"
                  autoFocus
                  value={formData.tc}
                  onChange={(e) => handleChange('tc', e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
              <TextareaAutosize
                    aria-label="Adres"
                    placeholder="Adres"
                    value={formData.address as string}
                    minRows={3}
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange('address', e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
              <TextareaAutosize
                    aria-label="Hastane Şikayeti"
                    placeholder="Hastane Şikayeti"
                    value={formData.complaint as string}
                    minRows={3}
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange('complaint', e.target.value)}/>
                    </Grid>
              <Grid item xs={12}>
              <InputLabel id="hospitalTypeLabel">Hastahane Tipi</InputLabel>
                <Select
                    labelId="hospitalTypeLabel"
                    id="demo-simple-select"
                    value={formData.hospitalName}
                    onChange={(e) => handleChange('hospitalName', e.target.value)}
                >
                    {hospitalNames.map((type:any)=>(
                    <MenuItem value={type}>{type}</MenuItem>
                    ))}
  </Select>
      </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Randevu Al
            </Button>
          </Box>
        </Box>
      </Container>
      </Paper>
      <ToastContainer/>
    </ThemeProvider>
    </SiteWrapper>
  );
        }
export default MakeAppointmentPage;
