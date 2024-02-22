import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import React, { useState } from "react";
import { Title } from "@mui/icons-material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import Hospital from "../../types/hospital";
import { updateHospitalDetails } from "../../features/hospitalSlice";
import { AppDispatch } from "../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalDetailEditModal from "../modal/hospital/HospitalDetailEditModal";
import PatientDetailEditModal from "../modal/patient/PatientDetailEditModal";
import Patient from "../../types/patient";
import { updatePatientDetails } from "../../features/appointmentSlice";

export const PatientDetailsTable: React.FC = () => {
  const { patient } = useSelector((state: RootState) => state.appointment);
  const [isPatientEditModalOpen, setIsPatientEditModalOpen] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenPatientDetailEditModal = () => {
    setIsPatientEditModalOpen(true);
  };

  const handleClosePatientDetailEditModal = () => {
    setIsPatientEditModalOpen(false);
  };

  const handleFormSubmit = (data: Patient): void => {
    dispatch(updatePatientDetails(data));
    handleClosePatientDetailEditModal();
  };

  function createData(
    id: number,
    tc: String,
    name: String,
    surname: String,
    sex: String,
    age: Number,
    adress: String
  ) {
    return { id, tc, name, surname, sex, age, adress };
  }

  const rows = [
    createData(
      1,
      patient.tc,
      patient.username,
      patient.surname,
      patient.sex,
      patient.age,
      patient.address
    ),
  ];

  return (
    <Container>
      <PatientDetailEditModal
        isOpen={isPatientEditModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleClosePatientDetailEditModal}
      />
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Bilgiler
      </Typography>
      <Table aria-labelledby="tableTitle" size="medium">
        <TableHead>
          <TableRow>
            <TableCell>TC</TableCell>
            <TableCell>Adı</TableCell>
            <TableCell>Soyadı</TableCell>
            <TableCell>Cinsiyeti</TableCell>
            <TableCell>Yaş</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Aksiyon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.tc}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.sex}</TableCell>
              <TableCell>{"" + row.age}</TableCell>
              <TableCell>{row.adress}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleOpenPatientDetailEditModal}
                >
                  Değiştir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PatientDetailsTable;
