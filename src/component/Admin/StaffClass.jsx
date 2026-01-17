import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const StaffClass = () => {
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({ standard: '', subject: '', batch: '' });
    const [editId, setEditId] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const fetchClasses = async () => {
        const res = await axios.get('http://localhost:5000/admin/classes');
        setClasses(res.data);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:5000/admin/update-class/${editId}`, formData);
        } else {
            await axios.post('http://localhost:5000/admin/add-class', formData);
        }
        setFormData({ standard: '', subject: '', batch: '' });
        setEditId(null);
        setOpen(false);
        fetchClasses();
    };

    const handleEdit = (cls) => {
        setFormData({ standard: cls.standard, subject: cls.subject, batch: cls.batch });
        setEditId(cls.id);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this class?')) {
            await axios.delete(`http://localhost:5000/admin/delete-class/${id}`);
            fetchClasses();
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Manage Classes
            </Typography>

            <Button variant="contained" onClick={() => { navigate('/admin/classes/add'); }}>
                Add New Class
            </Button>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Standard</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Batch</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((cls, idx) => (
                            <TableRow key={cls.id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{cls.standard}</TableCell>
                                <TableCell>{cls.subject}</TableCell>
                                <TableCell>{cls.batch}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleEdit(cls)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(cls.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>    
            </TableContainer>

            {/* Dialog Modal Form */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editId ? 'Edit Class' : 'Add New Class'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Standard"
                            value={formData.standard}
                            onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Batch"
                            value={formData.batch}
                            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false); setEditId(null); setFormData({ standard: '', subject: '', batch: '' }); }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                            {editId ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default StaffClass;
