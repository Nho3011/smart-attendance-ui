import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
const sampleResults = [
  {
    id: 1,
    code: 'SV001',
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    status: 'Có mặt',
    date: '2025-03-01',
    course: 'IT101',
    session: 'Buổi 1'
  },
  {
    id: 2,
    code: 'SV002',
    name: 'Trần Thị B',
    email: 'b@example.com',
    status: 'Vắng',
    date: '2025-03-01',
    course: 'IT101',
    session: 'Buổi 1'
  },
  {
    id: 3,
    code: 'SV003',
    name: 'Lê Văn C',
    email: 'c@example.com',
    status: 'Có phép',
    date: '2025-03-02',
    course: 'IT102',
    session: 'Buổi 2'
  }
];

const courses = ['IT101', 'IT102', 'IT103'];
const sessions = ['Buổi 1', 'Buổi 2', 'Buổi 3', 'Thi giữa kỳ', 'Thi cuối kỳ'];

const AttendanceResultPage = () => {
  const [filterCourse, setFilterCourse] = useState('');
  const [filterSession, setFilterSession] = useState('');
  const [results, setResults] = useState(sampleResults);

  const handleDelete = (id) => {
    setResults(results.filter(r => r.id !== id));
  };

  const filteredResults = results.filter(r =>
    (filterCourse ? r.course === filterCourse : true) &&
    (filterSession ? r.session === filterSession : true)
  );

  return (
    <Box p={3}>

      {/* FILTER SECTION */}
      <Box display="flex" gap={3} mb={3}>

        {/* Filter Course */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Môn học</InputLabel>
          <Select
            value={filterCourse}
            label="Môn học"
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {courses.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Filter Session */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Buổi học</InputLabel>
          <Select
            value={filterSession}
            label="Buổi học"
            onChange={(e) => setFilterSession(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {sessions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>MSSV</TableCell>
              <TableCell>Tên SV</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Buổi học</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResults.map((r, index) => (
              <TableRow key={r.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{r.code}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.course}</TableCell>
                <TableCell>{r.session}</TableCell>

                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleDelete(r.id)}>
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

export default AttendanceResultPage;
