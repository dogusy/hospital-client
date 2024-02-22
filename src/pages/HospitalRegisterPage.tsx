import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Grid,
  Box,
  Container,
  ThemeProvider,
  Typography,
  CssBaseline,
  createTheme,
} from '@mui/material';
import hospitalService from '../services/hospitalService';
import { Label } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalTypes, setHospitaAddress, setHospitaType, setHospitalName } from '../features/hospitalSlice';
import { AppDispatch } from '../store/store';
import { RootState } from '../store/rootReducer';
import { Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Hospital from '../types/hospital';
import { boolean } from 'yup';
import SiteWrapper from '../components/SiteWrapper';

  const initialFormData: Hospital = {
    hospitalName: "",
    hospitalAddress: "",
    type: "",
  };
  

const HospitalRegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<Hospital>(initialFormData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {hospitalTypes, isfetchHospitalTypesSuccess,hospitalName,hospitalAddress}  = useSelector((state: RootState) => state.hospital);
    const handleChange = (key: keyof Hospital, value: any) => {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };

    useEffect(() => {
        if(!isfetchHospitalTypesSuccess){
          dispatch(fetchHospitalTypes())
        }
        console.log("Burada");
      }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    var isValidated = validate(formData);
    if(isValidated){
    hospitalService.hospitalRegister(formData).then((data:any)=>{
        dispatch(setHospitalName(data.hospitalName));
        dispatch(setHospitaType(data.hospitalType));
        dispatch(setHospitaAddress(data.address));
        toast("Success");
        navigate("/hospitalhome");

    }).catch((e)=>{
        toast("Something happened please try again")
    });
  }
  };

  function validate(formData:Hospital){
    var isValidated = true;
    Object.entries(formData).forEach(([key, value], index) => {
      const entry = value as string ?? "";
      if(!isValidated){
        return
      }
      if(entry.trim().length ==0 ){
        toast("Lütfen tüm alanları doldurun");
        isValidated = false;
        return;
      }
      isValidated = true;
    });
    return isValidated;
  }
  const defaultTheme = createTheme();


  return (
    <SiteWrapper>
    <ThemeProvider theme={defaultTheme}>
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
            Hospital
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <FormControl required>
                <TextField
                  name="hospitalName"
                  required
                  fullWidth
                  id="hospitalName"
                  label="Hastahane Adı"
                  autoFocus
                  value={formData.hospitalName}
                  onChange={(e) => handleChange('hospitalName', e.target.value)}
                />
                                </FormControl>
                </Grid>
              <Grid item xs={12}>
              <TextareaAutosize
                    aria-label="Hastane Adresi"
                    placeholder="Hastahane Adresi"
                    value={formData.hospitalAddress as string}
                    minRows={3}
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange('hospitalAddress', e.target.value)}/>
                    </Grid>
              <Grid item xs={12}>
              <InputLabel id="hospitalTypeLabel">Hastahane Adı</InputLabel>
                <Select
                    labelId="hospitalTypeLabel"
                    id="demo-simple-select"
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    {hospitalTypes.map((type:any)=>(
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
              Hastahane Yönetim Sayfası
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </ThemeProvider>
    </SiteWrapper>
    );
}
export default HospitalRegisterPage;
