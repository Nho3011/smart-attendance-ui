import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const sampleUsers = [
  { id: 1, email: 'abc@example.com', role: 'Lecturer', name: 'Nguyễn Văn A' },
  { id: 2, email: 'def@example.com', role: 'Admin', name: 'Trần Thị B' },
];

const UserPage = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'Lecturer' });

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.email || !newUser.name) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ email: '', name: '', role: 'Lecturer' });
    setOpenModal(false);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Thêm người dùng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter(u =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Thêm người dùng */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Họ và tên"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <FormControl>
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="Lecturer">Lecturer</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Hủy</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;
