/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
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
import { useApiClient } from '@/hooks/useApiClient';

const UserPage = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'Lecturer' });
  const [users, setUsers] = useState([]);
  const api = useApiClient();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await api.get('/user');

    console.log('res', res);

    if (res.success) {
      setUsers(res.data);
    } else {
      console.error('Lỗi load user:', res.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await api.delete(`/user/${id}`);

    if (!result.success) {
      alert(result.message);
      return;
    }

    loadUsers();
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.name) return;

    await api.post(`/user`, newUser);

    setNewUser({ email: '', name: '', role: 'Lecturer' });
    setOpenModal(false);
    loadUsers();
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Tìm kiếm" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
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
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Thêm người dùng */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
          <TextField
            sx={{ mt: 1 }}
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField label="Họ và tên" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <FormControl>
            <InputLabel>Vai trò</InputLabel>
            <Select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <MenuItem value="Lecturer">Lecturer</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Hủy</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;
