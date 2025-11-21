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
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

const sampleCourses = [
  { id: 1, code: 'IT101', name: 'Lập trình Cơ bản', start: '2025-01-15', end: '2025-05-15', lecturer: 'Nguyễn Văn A' },
  { id: 2, code: 'IT102', name: 'Cấu trúc dữ liệu', start: '2025-01-16', end: '2025-05-16', lecturer: 'Trần Thị B' },
];

const CoursePage = () => {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState(sampleCourses);
  const [openModal, setOpenModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: '', name: '', start: '', end: '', lecturer: '' });
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleViewLessons = (courseId) => {
    navigate(`/course/${courseId}/lessons`);
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.start || !newCourse.end || !newCourse.lecturer) return;
    setCourses([...courses, { id: Date.now(), ...newCourse }]);
    setNewCourse({ code: '', name: '', start: '', end: '', lecturer: '' });
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
          Thêm MH mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã môn học</TableCell>
              <TableCell>Tên MH</TableCell>
              <TableCell>TG BĐ</TableCell>
              <TableCell>TG KT</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              .filter(c =>
                c.code.toLowerCase().includes(search.toLowerCase()) ||
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.lecturer.toLowerCase().includes(search.toLowerCase())
              )
              .map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.start}</TableCell>
                  <TableCell>{course.end}</TableCell>
                  <TableCell>{course.lecturer}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleViewLessons(course.id)}>
                      <MenuBookIcon titleAccess="Xem buổi học" />
                    </IconButton>
                    <IconButton color="primary"><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(course.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Thêm môn học mới */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Thêm môn học mới</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
          <TextField
            label="Mã môn học"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          />
          <TextField
            label="Tên môn học"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <TextField
            label="Thời gian BĐ"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newCourse.start}
            onChange={(e) => setNewCourse({ ...newCourse, start: e.target.value })}
          />
          <TextField
            label="Thời gian KT"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newCourse.end}
            onChange={(e) => setNewCourse({ ...newCourse, end: e.target.value })}
          />
          <TextField
            label="Giảng viên"
            value={newCourse.lecturer}
            onChange={(e) => setNewCourse({ ...newCourse, lecturer: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Hủy</Button>
          <Button onClick={handleAddCourse} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursePage;
