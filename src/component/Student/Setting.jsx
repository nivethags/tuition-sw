// Setting.jsx
import React from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
  createStyles,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#635bff",
    },
    secondary: {
      main: "#ff5b79",
    },
  },
  shape: { borderRadius: 12 },
});


const styles = createStyles({
  bgRemove: {
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 12,
    boxShadow: '0 14px 28px rgba(0,0,0,0.1)', // Overriding custom var
    backdropFilter: 'blur(10px)',
    backgroundImage: 'var(--Paper-overlay)', // Only works if defined
    padding: 32,
  }
});


const GlassCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  color: 'white',
  backgroundColor: "transparent", // 👈 no background color
  boxShadow: "none",
}));
const tfWhite = {
  InputProps: { sx: { color: '#fff' } },          // input text
  InputLabelProps: { sx: { color: '#fff' } },     // floating label
  sx: {                                           // white outline
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.6)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
  },
};

const FormButton = motion(Button); // gives us whileHover / whileTap

export default function Setting() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GlassCard component={{...motion.div}} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
            User Settings
          </Typography>

          <Stack component="form" spacing={3}>
            <TextField label="Username" {...tfWhite} fullWidth required />
            <TextField label="Password" type="password" {...tfWhite} fullWidth required />
            <TextField label="Confirm Password" type="password" {...tfWhite} fullWidth required />


            <FormButton
              variant="contained"
              size="large"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{ alignSelf: "flex-end", mt: 1 }}
            >
              Save
            </FormButton>
          </Stack>
        </GlassCard>
      </Container>
    </ThemeProvider>
  );
}
