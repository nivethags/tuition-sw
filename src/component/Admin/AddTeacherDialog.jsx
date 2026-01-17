import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ---------- Validation schema ---------- */
const schema = yup.object({
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Subject is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Enter 10‑digit number")
    .required("Phone is required"),
  experience: yup
    .number()
    .typeError("Years must be a number")
    .min(0)
    .max(40)
    .required(),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .positive()
    .required(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTeacherDialog({ open, onClose, onCreated }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      phone: "",
      experience: "",
      salary: "",
      photo: null,
    },
  });

  /* ---------- Submit ---------- */
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) =>
      formData.append(k, v ?? "")
    );

    await fetch("/admin/teachers", {
      method: "POST",
      body: formData,
    });

    onCreated(); // refresh list in parent
    reset();
    onClose();
  };

  /* ---------- UI ---------- */
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Add Teacher
          </Typography>
          <Button
            color="inherit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid item xs={12} md={8}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ mt: 3 }}
                  {...field}
                  label="Primary Subject"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              )}
            />

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Years Experience"
                      fullWidth
                      error={!!errors.experience}
                      helperText={errors.experience?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="salary"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monthly Salary (₹)"
                      fullWidth
                      error={!!errors.salary}
                      helperText={errors.salary?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right column – photo upload */}
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{ width: 160, height: 160, mx: "auto" }}
              src=""           /* preview skipped for brevity */
            />
            <Controller
              name="photo"
              control={control}
              render={({ field }) => (
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                </Button>
              )}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              JPEG/PNG • Max 2 MB
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
