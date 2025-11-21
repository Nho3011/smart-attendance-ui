import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';

const courses = ['IT101', 'IT102', 'IT103'];

const sessions = [
  'Buổi 1',
  'Buổi 2',
  'Buổi 3',
  'Thi giữa kỳ',
  'Thi cuối kỳ'
];

const AttendancePage = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  return (
    <Box p={3}>
      {/* TITLE */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Điểm danh Giảng viên
      </Typography>

      {/* SELECT SECTION */}
      <Box display="flex" gap={2} mb={3}>
        {/* Chọn môn học */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Chọn môn học</InputLabel>
          <Select
            value={selectedCourse}
            label="Chọn môn học"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Chọn buổi học (có option thi GK/CK) */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Chọn buổi học</InputLabel>
          <Select
            value={selectedSession}
            label="Chọn buổi học"
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            {sessions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Thêm buổi học */}
        <Button variant="contained" color="primary">
          Thêm buổi học
        </Button>
      </Box>

      {/* CAMERA SECTION */}
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Button variant="contained" color="success" sx={{ mb: 2 }}>
          Bật Camera
        </Button>

        <Box
          border="2px dashed gray"
          borderRadius="8px"
          height="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="gray">
            Camera preview...
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AttendancePage;
