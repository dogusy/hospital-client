import { Button, Container, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import Appointment from "../../types/appointment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteAppointment, setDeleteOnFail, setIsAppointmentDeleted } from "../../features/appointmentSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../../store/rootReducer";

interface Props{
    patientList:Array<Appointment>
}
const PatientAppointmentTable: React.FC<Props>= (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { deleteOnFail, isAppointmentDeleted } = useSelector((state: RootState) => state.appointment);

    const dispatch = useDispatch<AppDispatch>();
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.patientList.length) : 0;
      
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleDelete = (id:Appointment)=>{
      console.log(id);
      dispatch(deleteAppointment(id.id));
    }
    
    useEffect(() => {
      if(isAppointmentDeleted){
        toast.success("Başarıyla silindi");
        dispatch(setIsAppointmentDeleted(false));
      }else if(deleteOnFail){
        toast.warning("Bir problem oluştu");
        dispatch(setDeleteOnFail(false));
      }
    }, [isAppointmentDeleted,deleteOnFail]);

   return(
<Container>
  <ToastContainer closeOnClick={false}></ToastContainer>
<Typography
sx={{ flex: '1 1 100%' }}
variant="h6"
id="tableTitle"
component="div"
>
Hasta Randevuları

</Typography>
      <Table aria-labelledby="tableTitle" size="medium">
  <TableHead>
      <TableRow>
          <TableCell>Şikayet</TableCell>
          <TableCell>Adress</TableCell>
          <TableCell>Hastahane</TableCell>
          <TableCell>Hastahane Tipi</TableCell>
          <TableCell>Hastahane Adresi</TableCell>
          <TableCell>Aksiyonlar</TableCell>
          </TableRow>
  </TableHead>
  <TableBody>

        {(rowsPerPage > 0
            ? props.patientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.patientList
          ).map((row) => (
<TableRow key={row.id as number}>
    <TableCell>{row.complaint}</TableCell>
    <TableCell>{row.patient.address}</TableCell>
    <TableCell>{row.hospitalName}</TableCell>
    <TableCell>{row.hospital.hospitalType as string}</TableCell>
    <TableCell>{row.hospital.address}</TableCell>
    <TableCell>
      <Button variant="outlined" color="error" onClick={()=>handleDelete(row)} >Sil</Button>
      <Button variant="outlined" color="success" >Değiştir</Button>
      </TableCell>

</TableRow>
))}      
</TableBody>
<tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.patientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                },
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

export default PatientAppointmentTable;


