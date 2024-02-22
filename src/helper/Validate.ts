import { toast } from "react-toastify";
import Hospital from "../types/hospital";
import PatientAppointment from "../types/patientAppointment";

export default class Validate {
  static validateHospitalData(formData: Hospital) {
    var isValidated = true;
    Object.entries(formData).forEach(([key, value], index) => {
      const entry = (value as string) ?? "";
      if (!isValidated) {
        return;
      }
      if (entry.trim().length == 0) {
        isValidated = false;
        return;
      }
      isValidated = true;
    });
    return isValidated;
  }

  static validatePatientAppointment(formData: PatientAppointment) {
    if (formData.tc.length != 11) {
      toast.error("11 haneli TC giriniz");
    } else if (formData.username.trim().length == 0) {
      toast.error("Adınızı giriniz");
    } else if (formData.surname.trim().length == 0) {
      toast.error("Soyadınızı giriniz");
    } else if (formData.sex.trim().length == 0) {
      toast.error("Cinsiyetinizi seçinizi");
    } else if (formData.age == 0) {
      toast.error("Yaşınızı giriniz");
    } else if (formData.address.trim().length == 0) {
      toast.error("Adınızı giriniz");
    } else if (formData.hospitalName.trim().length == 0) {
      toast.error("Hastane seçiniz");
    } else if (formData.complaint.trim().length == 0) {
      toast.error("Şikayetinizi giriniz");
    } else {
      return true;
    }
    return false;
  }
}
