import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hospital from "../types/hospital";
import HospitalRequest from "../types/hospitalRequest";
import Patient from "../types/patient";

const API_URL = process.env.REACT_APP_API_URL;

const initialFormData: Patient = {
  username: "",
  surname: "",
  sex: "",
  age: 0,
  address: "",
  tc: "",
};

const patientService = {
  updatePatientDetails: async (patient: Patient) => {
    try {
      const data: Patient = {
        username: patient.username,
        surname: patient.surname,
        sex: patient.sex,
        age: patient.age,
        address: patient.address,
        tc: patient.tc,
      };
      const response = await axios.post(
        `${API_URL}/patient/updatePatientDetails`,
        data
      );
      if (response.data !== undefined && response.data) {
        localStorage.setItem("patient", JSON.stringify(data));
        return response.data;
      }
      return;
    } catch (error: any) {
      throw new Error(`Update failed: ${error.message}`);
    }
  },
};

export default patientService;
