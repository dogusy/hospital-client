import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Hospital from '../types/hospital';
import HospitalRequest from '../types/hospitalRequest';

  
  const API_URL = process.env.REACT_APP_API_URL; 


  const initialFormData: Hospital = {
    hospitalName: "",
    hospitalAddress: "",
    type: "",
  };


  const hospitalService = {
    hospitalRegister: async (formData: Hospital): Promise<void> => {
      try {
        const data = {
            hospitalName:formData.hospitalName,
            address:formData.hospitalAddress,
            hospitalType:formData.type
        }
        const response = await axios({
          method: 'post',
          url: `${API_URL}/hospital/register`,
          data: data
      });
        localStorage.setItem("currentHospital",JSON.stringify(response.data));
        return response.data;
      } catch (error:any) {
        return ;
      }
    },
  
    fetchHospitalTypes: async () => {
        try {

        const response = await axios.get(`${API_URL}/hospital`);
            console.log(response);
          return response.data;
        } catch (error:any) {
            throw new Error(`Registration failed: ${error.message}`);
        }
      },
        
      fetchHospitalNames: async () => {
      try {
      const response = await axios.get(`${API_URL}/hospital/hospitalNames`);
          console.log(response);
        return response.data;
      } catch (error:any) {
          throw new Error(`Registration failed: ${error.message}`);
      }
    },
        
      updateHospitalDetails: async (hospitalData:Hospital) => {
      try {
          const currentHospitalString = localStorage.getItem("currentHospital");
          const id = currentHospitalString ? JSON.parse(currentHospitalString).id : null;
          const data:HospitalRequest =   {
            id:id,
            hospitalName: hospitalData.hospitalName,
            address: hospitalData.hospitalAddress,
            hospitalType: hospitalData.type
          }        
          const response = await axios.put(`${API_URL}/hospital`,data);
          localStorage.setItem("currentHospital",JSON.stringify(response.data));
          return response.data;
      } catch (error:any) {
          throw new Error(`Logout failed: ${error.message}`);
      }
    },  
  };
  
  export default hospitalService;
  