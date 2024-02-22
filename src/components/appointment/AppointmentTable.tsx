import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Appointment from "../../types/appointment";
import React, { useState } from "react";
import {
  deleteAppointment,
  fetchAppointmentsInfoByHospitalId,
  setPatient,
  updatePatientDetails,
  updatePatientDetailsByHospital,
} from "../../features/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import Patient from "../../types/patient";
import PatientDetailEditModal from "../modal/patient/PatientDetailEditModal";
import { RootState } from "../../store/rootReducer";

interface Props {
  patientList: Array<Appointment>;
}
const AppointmentTable: React.FC<Props> = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isPatientEditModalOpen, setIsPatientEditModalOpen] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.patientList.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: Appointment) => {
    dispatch(deleteAppointment(id.id));
  };

  const handleOpenPatientDetailEditModal = (data: Patient) => {
    const patient: Patient = {
      username: data.username,
      surname: data.surname,
      sex: data.sex,
      age: data.age,
      address: data.address,
      tc: data.tc,
    };
    dispatch(setPatient(patient));
    setIsPatientEditModalOpen(true);
  };

  const handleClosePatientDetailEditModal = () => {
    setIsPatientEditModalOpen(false);
  };

  const handleFormSubmit = (data: Patient): void => {
    dispatch(updatePatientDetailsByHospital(data));
    const currentHospital = localStorage.getItem("currentHospital");
    const id = currentHospital ? JSON.parse(currentHospital).id : null;
    if (id) {
      dispatch(fetchAppointmentsInfoByHospitalId(id));
    }

    handleClosePatientDetailEditModal();
  };

  return (
    <Container>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
        textAlign="center"
      >
        Hasta Bilgileri
      </Typography>
      <PatientDetailEditModal
        isOpen={isPatientEditModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleClosePatientDetailEditModal}
      />
      <Table aria-labelledby="tableTitle" size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Hasta Adı</TableCell>
            <TableCell>Hasta Soyadı</TableCell>
            <TableCell>TC</TableCell>
            <TableCell>Yaş</TableCell>
            <TableCell>Cinsiyet</TableCell>
            <TableCell>Şikayet</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Aksiyonlar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.patientList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.patientList
          ).map((row) => (
            <TableRow key={row.id as number}>
              <TableCell>{row.patient.username}</TableCell>
              <TableCell>{row.patient.surname}</TableCell>
              <TableCell>{row.patient.tc}</TableCell>
              <TableCell>{row.patient.age as number}</TableCell>
              <TableCell>{row.patient.sex}</TableCell>
              <TableCell>{row.complaint}</TableCell>
              <TableCell>{row.patient.address}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(row)}
                >
                  Sil
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleOpenPatientDetailEditModal(row.patient)}
                >
                  Değiştir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={props.patientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {},
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default AppointmentTable;
