import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import React, { useState } from "react";
import { Title } from "@mui/icons-material";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Hospital from "../../types/hospital";
import { updateHospitalDetails } from "../../features/hospitalSlice";
import { AppDispatch } from "../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalDetailEditModal from "../modal/hospital/HospitalDetailEditModal";


export const HospitalDetailsTable: React.FC = () => {

    const { hospitalName, hospitalAddress, type } = useSelector((state: RootState) => state.hospital);
    const [isHospitalDetailEditModalOpen, setHospitalDetailEditModalOpen] = useState<boolean>(false);
    const dispatch=useDispatch<AppDispatch>();

    const handleOpenHospitalDetailEditModal = () => {
      setHospitalDetailEditModalOpen(true);
      };
    
      const handleCloseHospitalDetailEditModal = () => {
        setHospitalDetailEditModalOpen(false);
      };
    
      const handleFormSubmit = (data: Hospital): void => {
        dispatch(updateHospitalDetails(data)).then(()=>{
          toast.success("Hastahane bilgileri güncellendi.");
        }).catch((e)=>{
          toast.error("Bir sorun oluştu.");
        });
        handleCloseHospitalDetailEditModal();
      };

 
  
    function createData(
      id:number,
      name: String,
      address: String,
      type: String,
    ) {
      return { id,name,address,type };
    }
    
    const rows = [
      createData(
          1,
          hospitalName,
          hospitalAddress,
          type
      ),
  
    ];
    
    
return (
    <Container>
<HospitalDetailEditModal
isOpen={isHospitalDetailEditModalOpen}
onSubmit={handleFormSubmit}
onClose={handleCloseHospitalDetailEditModal} />
<Typography
sx={{ flex: '1 1 100%' }}
variant="h6"
id="tableTitle"
component="div"
>
Hastahane Bilgileri
</Typography>
      <Table aria-labelledby="tableTitle" size="medium">
  <TableHead>
      <TableRow>
          <TableCell>Hastahane Adı</TableCell>
          <TableCell>Hstahane Adresi</TableCell>
          <TableCell>Hastahane Tipi</TableCell>
          <TableCell>Aksiyonlar</TableCell>

      </TableRow>
  </TableHead>
  <TableBody>
      {rows.map((row) => (
          <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell><Button variant="outlined" color="success" onClick={handleOpenHospitalDetailEditModal}>Değiştir</Button></TableCell>
          </TableRow>
      ))}
  </TableBody>
</Table>
</Container>
);
      };

export default HospitalDetailsTable;