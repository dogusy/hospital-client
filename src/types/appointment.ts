import HospitalRequest from "./hospitalRequest";
import Patient from "./patient";

interface Appointment{
    id:Number,
    complaint:String,
    hospitalName:String,
    hospital:HospitalRequest,
    patient:Patient

}

export default Appointment
