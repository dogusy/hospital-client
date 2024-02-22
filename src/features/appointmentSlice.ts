/* eslint-disable no-param-reassign */
import { buildCreateSlice, createAsyncThunk, createSlice, Dispatch, PayloadAction, } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import hospitalService from '../services/hospitalService';
import Hospital from '../types/hospital';
import HospitalRequest from '../types/hospitalRequest';
import Appointment from '../types/appointment';
import Patient from '../types/patient';
import appointmentService from '../services/appointmentService';
import PatientAppointment from '../types/patientAppointment';
import { AppDispatch } from '../store/store';
import patientService from '../services/patientService';


interface appointmentState {
    
  complaint:String,
  hospitalName:String,
  hospital:HospitalRequest,
  patient:Patient
  patientList:Array<Appointment>
  isfetchPatientList:boolean,
  showMakeAppointmentSuccessfullMessage:boolean
  isAppointmentDeleted:boolean,
  deleteOnFail:boolean
}

  const initialAppointmentData: appointmentState = {
    hospitalName: "",
    hospital: {
        hospitalName: "",
        address: "",
        hospitalType: ""
    },
    complaint: "",
    patient:{
        username: "",
        sex: "",
        age:0 ,
        address: "",
        tc: "",
        surname:""
    },
    patientList:[],
    isfetchPatientList:false,
    showMakeAppointmentSuccessfullMessage:false,
    isAppointmentDeleted:false,
    deleteOnFail:false,
  };

const hospital = createSlice({
  name: 'appointment',
  initialState: initialAppointmentData,
  reducers: { 
    setShowMakeAppointmentSuccessfullMessage: (state, action:PayloadAction<boolean>)=>{
      state.showMakeAppointmentSuccessfullMessage = action.payload;
    },
    setPatient:(state,action:PayloadAction<Patient>)=>{
      state.patient = {
        username:action.payload.username,
        sex: action.payload.sex,
        age:action.payload.age ,
        address: action.payload.address,
        tc: action.payload.tc,
        surname:action.payload.surname
      }
    },
    setIsAppointmentDeleted: (state, action:PayloadAction<boolean>)=>{
      state.isAppointmentDeleted = action.payload;
    },
    setDeleteOnFail: (state, action:PayloadAction<boolean>)=>{
      state.deleteOnFail = action.payload;
    }
  },

  extraReducers:(builder) =>{
    builder.addCase(fetchAppointmentsInfoByHospitalId.fulfilled,(state,action: PayloadAction<any>)=>{
        state.patientList=action.payload;
});
builder.addCase(fetchAppointmentsByTC.fulfilled,(state,action:PayloadAction<any>)=>{
  state.patientList=action.payload;
});
builder.addCase(makeAppointment.fulfilled,(state)=>{
  state.showMakeAppointmentSuccessfullMessage=true;
});
builder.addCase(makeAppointment.rejected,(state)=>{
  state.showMakeAppointmentSuccessfullMessage=false;
});
builder.addCase(deleteAppointment.fulfilled,(state,action:PayloadAction<any>)=>{
  var filteredList = state.patientList;
  if(action.payload !==undefined){
    filteredList = state.patientList.filter((val)=>{
      return val.id!=action.payload;
  })}
  state.patientList = filteredList;
});
builder.addCase(deleteAppointment.rejected,(state)=>{
  state.deleteOnFail = true;
});
builder.addCase(updatePatientDetails.fulfilled,(state,action:PayloadAction<Patient>)=>{
  state.patient=action.payload;
});
  }
});

export const {
  setShowMakeAppointmentSuccessfullMessage,
  setPatient,
  setIsAppointmentDeleted,
  setDeleteOnFail,
  } = hospital.actions;

  export const fetchAppointmentsInfoByHospitalId = createAsyncThunk("hospital/fetchAppointmentInfoByHospitalId", async(id:Number) =>{
    const response = await appointmentService.fetchAppointmentsInfoByHospitalId(id);
    return response;
  })
  
    
  export const makeAppointment = createAsyncThunk("hospital/makeAppointment", async(data:PatientAppointment) =>{
    const response = await appointmentService.makeAppointment(data);
    useDispatch<AppDispatch>()(setPatient({
      username:data.username,
      sex: data.sex,
      age:data.age ,
      address: data.address,
      tc: data.tc,
      surname:data.surname
    }));
    return response;
  })
  
      
  export const deleteAppointment = createAsyncThunk("hospital/deleteAppointment", async(id:Number,thunkAPI) =>{
    const response = await appointmentService.deleteAppointment(id);
    if(response == undefined){
      thunkAPI.dispatch(setDeleteOnFail(true));
    }
    thunkAPI.dispatch(setIsAppointmentDeleted(true));

    return response;
  })
  export const fetchAppointmentsByTC = createAsyncThunk("hospital/fetchAppointmentsByTC", async(tc:String,thunkAPI) =>{

    const response = await appointmentService.fetchAppointmentsByTC(tc);

    return response;
  })
  
        
  export const updatePatientDetails = createAsyncThunk("hospital/updatePatientDetails", async(patient:Patient,thunkAPI) =>{
    const response = await patientService.updatePatientDetails(patient);
    return response;
  })

  

export default hospital.reducer;
