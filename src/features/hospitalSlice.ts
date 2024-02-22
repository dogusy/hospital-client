/* eslint-disable no-param-reassign */
import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import hospitalService from "../services/hospitalService";
import Hospital from "../types/hospital";
import HospitalRequest from "../types/hospitalRequest";

interface hospitalState {
  hospitalName: String;
  hospitalAddress: String;
  type: String;
  hospitalTypes: Array<String>;
  isfetchHospitalTypesSuccess: boolean;
  hospitalNames: Array<String>;
}

const initialHospitalData: hospitalState = {
  hospitalName: "",
  hospitalAddress: "",
  type: "",
  hospitalTypes: [],
  isfetchHospitalTypesSuccess: false,
  hospitalNames: [],
};

const hospital = createSlice({
  name: "hospital",
  initialState: initialHospitalData,
  reducers: {
    setHospitalName: (state, action: PayloadAction<String>) => {
      state.hospitalName = action.payload;
    },
    setHospitaAddress: (state, action: PayloadAction<String>) => {
      state.hospitalAddress = action.payload;
    },
    setHospitaType: (state, action: PayloadAction<String>) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchHospitalTypes.fulfilled,
      (state, action: PayloadAction<Array<String>>) => {
        state.hospitalTypes = action.payload;
        state.isfetchHospitalTypesSuccess = true;
      }
    );
    builder.addCase(fetchHospitalTypes.rejected, (state) => {
      state.isfetchHospitalTypesSuccess = false;
    });
    builder.addCase(
      updateHospitalDetails.fulfilled,
      (state, action: PayloadAction<HospitalRequest>) => {
        state.hospitalName = action.payload.hospitalName;
        state.hospitalAddress = action.payload.address;
        state.type = action.payload.hospitalType;
      }
    );
    builder.addCase(
      fetchHospitalNames.fulfilled,
      (state, action: PayloadAction<Array<String>>) => {
        state.hospitalNames = action.payload;
      }
    );
  },
});

export const { setHospitaAddress, setHospitaType, setHospitalName } =
  hospital.actions;

export const fetchHospitalTypes = createAsyncThunk(
  "hospital/fetchHospitalTypes",
  async () => {
    const response = await hospitalService.fetchHospitalTypes();
    return response;
  }
);

export const fetchHospitalNames = createAsyncThunk(
  "hospital/fetchHospitalNames",
  async () => {
    const response = await hospitalService.fetchHospitalNames();
    return response;
  }
);

export const updateHospitalDetails = createAsyncThunk(
  "hospital/updateHospitalDetails",
  async (hospitalData: Hospital) => {
    const response = await hospitalService.updateHospitalDetails(hospitalData);
    return response;
  }
);

export default hospital.reducer;
