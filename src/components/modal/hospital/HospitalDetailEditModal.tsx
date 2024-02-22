import { Box, Button, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Hospital from "../../../types/hospital";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";


  
  interface HospitalDetailEditModal {
    isOpen: boolean;
    onSubmit: (data: Hospital) => void;
    onClose: () => void;
    
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const initialHospitalDetailEditModalData: Hospital = {
      hospitalName: "",
      hospitalAddress: "",
      type: ""
  }
  
  const HospitalDetailEditModal: React.FC<HospitalDetailEditModal> = ({
    onSubmit,
    isOpen,
    onClose,
  }) => {
    const { hospitalName, hospitalAddress, type,hospitalTypes } = useSelector((state: RootState) => state.hospital);
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [formState, setFormState] = useState<Hospital>(
      initialHospitalDetailEditModalData
    );
  
    useEffect(() => {
      if (isOpen) {
        setFormState({hospitalName,hospitalAddress,type});  
        if(focusInputRef.current){
            setTimeout(() => {
                focusInputRef.current!.focus();
            }, 0);
        }

      }
      
    }, [isOpen]);
  
    const handleSubmit = (event: React.FormEvent): void => {
      event.preventDefault();
      onSubmit(formState);
    };
    const handleChange = (key: keyof Hospital, value: any) => {
        setFormState((prevFormData) => ({
          ...prevFormData,
          [key]: value,
        }));
      };
  
  
    return (
      <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
            <Grid container spacing={3}>
            <Typography component="h1" variant="h4" >
            Hastahane Bilgileri
          </Typography>
              <Grid item xs={12} >
                <TextField
                  name="hospitalName"
                  required
                  fullWidth
                  id="hospitalName"
                  label="Hastahane Adı"
                  autoFocus
                  defaultValue={hospitalName}
                  onChange={(e) => handleChange("hospitalName",e.target.value)}
                />
                </Grid>
              <Grid item xs={12}>
              <TextareaAutosize
                    aria-label="Hastane Adresi"
                    placeholder="Hastahane Adresi"
                    name="hospitalAddress"
                    defaultValue={hospitalAddress as string}
                    minRows={3}
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange("hospitalAddress",e.target.value)}
                    />
                    </Grid>
              <Grid item xs={12}>
              <InputLabel id="hospitalTypeLabel">Hastahane Tipi</InputLabel>
                <Select
                    labelId="hospitalTypeLabel"
                    id="demo-simple-select"
                    defaultValue={type}
                    name="type"
                    onChange={(e) => handleChange("type",e.target.value)}
                >
                    {hospitalTypes.map((type:any)=>(
                    <MenuItem value={type}>{type}</MenuItem>
                    ))}
  </Select>
      </Grid>
            <Grid item xs={12}   >
            <Stack  justifyContent={"flex-end"}  direction="row" spacing={2}>
            <Button 
            variant="contained" 
            onClick={handleSubmit}
            color="success">
                Güncelle
                </Button>
            <Button variant="contained" color="error" onClick={onClose} >
                İptal
            </Button>
            </Stack>
            </Grid>
            </Grid>
          </Box>
        </Box>
    </Modal>
    );
  };

  export default HospitalDetailEditModal;