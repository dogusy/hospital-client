import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PatientAppointment from '../types/patientAppointment';
import Appointment from '../types/appointment';

  
  const API_URL = process.env.REACT_APP_API_URL; 

  const appointmentService = {
    fetchAppointmentsInfoByHospitalId: async (id: Number): Promise<void> => {
      try {
        const data = {
            hospitalID:id
        }
        const response = await axios({
          method: 'post',
          url: `${API_URL}/patient/appointmentListByHospitalId`,
          params: data
      });

        return response.data.appointments;
      } catch (error:any) {
        throw new Error(`Registration failed: ${error.message}`);
      }
    },
    fetchAppointmentsByTC: async (tc: String): Promise<void> => {
      try {
        const data = {
            tc:tc
        }
        const response = await axios({
          method: 'post',
          url: `${API_URL}/patient/appointmentListByTC`,
          params: data
      });

        return response.data.appointments;
      } catch (error:any) {
        return ;
      }
    },
    deleteAppointment: async (id: Number): Promise<void> => {
      try {
        const data = {
          appointmentId:id
        }
        const response = await axios({
          method: 'delete',
          url: `${API_URL}/patient`,
          params: data
      });
        return response.data;
      } catch (error:any) {
        return ;
      }
    },
    makeAppointment: async (data: PatientAppointment): Promise<void> => {
      try {
        const request = {
          username: data.username,
          surname: data.surname,
          sex: data.sex,
          age: "1",
          address: data.address,
          tc: data.tc,
          hospitalName: data.hospitalName,
          complaint: data.complaint
        }
        const response = await axios({
          method: 'post',
          url: `${API_URL}/patient/makeAppointment`,
          data: request
      });
      localStorage.setItem("patient",JSON.stringify(response.data));
        return response.data;
      } catch (error:any) {
        return;
      }
    },
 

}
export default appointmentService;
  