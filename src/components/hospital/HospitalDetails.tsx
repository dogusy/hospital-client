import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import React, { useState } from "react";

import { AppDispatch } from "../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalDetailsTable from "./HospitalDetailsTable";
import AppointmentTable from "../appointment/AppointmentTable";


export const HospitalDetails: React.FC = () => {


    return (
        <React.Fragment>
      <ToastContainer />
        <HospitalDetailsTable/>
        </React.Fragment>

          
    );
};
export default HospitalDetails;