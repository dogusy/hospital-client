import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import React, { useState } from "react";

import { AppDispatch } from "../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientDetailsTable from "./PatientDetailsTable";


export const PatientDetails: React.FC = () => {


    return (
        <React.Fragment>
      <ToastContainer />
        <PatientDetailsTable/>
        </React.Fragment>

          
    );
};
export default PatientDetails;