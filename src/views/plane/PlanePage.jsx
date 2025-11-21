import React, { useState } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample data
const sampleSchedules = [
  {
    id: 1,
    course: 'IT101',
    session: 'Thứ 2 • Tiết 1-3',
    start: '07:00',
    end: '09:00',
    lecturer: 'Nguyễn Văn A'
  },
  {
    id: 2,
    course: 'IT102',
    session: 'Thứ 4 • Tiết 4-6',
    start: '09:30',
    end: '11:30',
    lecturer: 'Trần Thị B'
  }
];

const TeachingSchedulePage = () => {
  const [search, setSearch] = useState('');
  const [schedules, setSchedules] = useState(sampleSchedules);

  const handleDelete = (id) => {
    setSchedules(schedules.filter(x => x.id !== id));
  };

  const filtered = schedules.filter(x =>
    x.course.toLowerCase().includes(search.toLowerCase()) ||
    x.session.toLowerCase().includes(search.toLowerCase()) ||
    x.lecturer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>

      {/* SEARCH */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Tìm kiếm lịch giảng dạy"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Buổi học</TableCell>
              <TableCell>TG Bắt đầu</TableCell>
              <TableCell>TG Kết thúc</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.session}</TableCell>
                <TableCell>{item.start}</TableCell>
                <TableCell>{item.end}</TableCell>
                <TableCell>{item.lecturer}</TableCell>

                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  );
};

export default TeachingSchedulePage;
