import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Hospital from "../../../types/hospital";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import Patient from "../../../types/patient";

interface PatientDetailEditModal {
  isOpen: boolean;
  onSubmit: (data: Patient) => void;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialPatientDetailEditModalData: Patient = {
  username: "",
  surname: "",
  sex: "",
  age: 0,
  address: "",
  tc: "",
};

const PatientDetailEditModal: React.FC<PatientDetailEditModal> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {
  const { patient } = useSelector((state: RootState) => state.appointment);
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<Patient>(
    initialPatientDetailEditModalData
  );

  useEffect(() => {
    if (isOpen) {
      setFormState(patient);
      if (focusInputRef.current) {
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
  const handleChange = (key: keyof Patient, value: any) => {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
          <Grid container spacing={3}>
            <Typography component="h1" variant="h4">
              Hasta Bilgileri
            </Typography>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Ad"
                autoFocus
                defaultValue={patient.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="surname"
                required
                fullWidth
                id="surname"
                label="Soyadı"
                autoFocus
                defaultValue={patient.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                value={formState.sex}
                onChange={(e) => handleChange("sex", e.target.value)}
              >
                <FormControlLabel
                  value="Erkek"
                  control={<Radio />}
                  label="Erkek"
                />
                <FormControlLabel
                  value="Kadın"
                  control={<Radio />}
                  label="Kadın"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="age"
                required
                fullWidth
                id="age"
                label="Yaş"
                type="number"
                autoFocus
                defaultValue={patient.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="tc"
                required
                fullWidth
                id="tc"
                label="TC"
                autoFocus
                value={patient.tc}
                disabled={true}
                onChange={(e) => handleChange("tc", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="Adres"
                placeholder="Adres"
                defaultValue={patient.address as string}
                minRows={3}
                style={{ width: "100%" }}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
                  <Button variant="contained" type="submit" color="success">
                    Güncelle
                  </Button>
                  <Button variant="contained" color="error" onClick={onClose}>
                    İptal
                  </Button>
                </Stack>
              </Grid>
            </Grid>{" "}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailEditModal;
