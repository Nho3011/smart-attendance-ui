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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const sampleStudents = [
  { id: 1, mssv: 'SV001', name: 'Nguyễn Văn A', email: 'a@example.com', faceId: 'face_001', status: 'Đang học', course: 'IT101' },
  { id: 2, mssv: 'SV002', name: 'Trần Thị B', email: 'b@example.com', faceId: 'face_002', status: 'Đang học', course: 'IT102' },
  { id: 3, mssv: 'SV003', name: 'Lê Thị C', email: 'c@example.com', faceId: 'face_003', status: 'Đang học', course: 'IT101' },
];

const courses = [
  { code: 'IT101', name: 'Lập trình Cơ bản' },
  { code: 'IT102', name: 'Cấu trúc dữ liệu' },
];

const StudentPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState(sampleStudents);
  const [openAdd, setOpenAdd] = useState(false);
  const [newStudent, setNewStudent] = useState({
    mssv: '',
    name: '',
    email: '',
    faceId: '',
    status: 'Đang học',
    course: ''
  });

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleAddOpen = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleAddStudent = () => {
    setStudents([
      ...students,
      { id: Date.now(), ...newStudent }
    ]);
    setNewStudent({ mssv: '', name: '', email: '', faceId: '', status: 'Đang học', course: '' });
    handleAddClose();
  };

  const filteredStudents = students.filter(s => 
    (selectedCourse ? s.course === selectedCourse : true) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.mssv.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box p={3} bgcolor="#ffffff" minHeight="100vh">
      {/* Hàng chọn môn học */}
      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <FormControl style={{ minWidth: 220 }}>
          <InputLabel>Môn học</InputLabel>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {courses.map(c => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="textSecondary">
          Bộ lọc môn học
        </Typography>
      </Box>

      {/* Hàng tìm kiếm + Thêm SV */}
      <Box mb={3} display="flex" gap={2} alignItems="center">
        <TextField
          label="Tìm kiếm sinh viên"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Thêm SV mới
        </Button>
      </Box>

      {/* Bảng sinh viên */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#e1f5fe' }}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>MSSV</TableCell>
              <TableCell>Tên SV</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Face ID</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((s, index) => (
              <TableRow key={s.id} hover sx={{ '&:hover': { bgcolor: '#f1f8e9' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{s.mssv}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.faceId}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(s.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Không có sinh viên phù hợp
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm sinh viên */}
      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Thêm sinh viên mới</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
          <TextField
            label="MSSV"
            value={newStudent.mssv}
            onChange={(e) => setNewStudent({ ...newStudent, mssv: e.target.value })}
          />
          <TextField
            label="Họ và tên"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            label="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <TextField
            label="Face ID"
            value={newStudent.faceId}
            onChange={(e) => setNewStudent({ ...newStudent, faceId: e.target.value })}
          />
          <FormControl>
            <InputLabel>Môn học</InputLabel>
            <Select
              value={newStudent.course}
              onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
            >
              {courses.map(c => (
                <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleAddStudent}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentPage;
