import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const sampleLecturer = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0948978756'
};

const LecturerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [lecturer, setLecturer] = useState(sampleLecturer);

  const handleChange = (field, value) => {
    setLecturer(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: gọi API lưu lecturer
    console.log('Saved lecturer:', lecturer);
    setEditMode(false);
  };

  return (
    <Box bgcolor="#f5f9ff" minHeight="100vh" display="flex" justifyContent="center" p={3}>
      <Paper 
        elevation={4} 
        sx={{ p: 4, width: '100%', maxWidth: 600, borderRadius: 3, bgcolor: '#ffffff' }}
      >
        <Typography variant="h4" color="primary" mb={3}>
          Thông tin giảng viên
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Họ và tên"
            value={lecturer.name}
            disabled={!editMode}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={lecturer.email}
            disabled
            fullWidth
          />
          <TextField
            label="Số điện thoại"
            value={lecturer.phone || ''}
            disabled={!editMode}
            onChange={(e) => handleChange('phone', e.target.value)}
            fullWidth
          />
        </Box>

        <Box mt={4} display="flex" justifyContent={editMode ? 'space-between' : 'flex-end'}>
          {editMode ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Lưu
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Hủy
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
              Chỉnh sửa
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LecturerProfile;
