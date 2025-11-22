import { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import Webcam from 'react-webcam';
import { useApiClient } from '@/hooks/useApiClient';

const courses = ['IT101', 'IT102', 'IT103'];
const sessions = [11];

const AttendancePage = () => {
  const api = useApiClient();
  const webcamRef = useRef(null);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const capture = useCallback(async () => {
    if (loading) return;

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const newImg = {
      id: Date.now(),
      label: 'Đang kiểm tra...',
      timestamp: new Date().toISOString(),
      dataUrl: imageSrc,
      status: 'loading'
    };
    setImages((prev) => [newImg, ...prev]);
    setLoading(true);

    try {
      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append('file', blob, 'photo.jpg');
      formData.append('courseId', 7);
      formData.append('sessionId', 11);
      console.log('selectedSession', selectedSession);
      const result = await api.post('/face/identify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('result', result);

      setImages((prev) =>
        prev.map((img) =>
          img.id === newImg.id
            ? {
                ...img,
                status: result.success ? 'success' : 'fail',
                label: result.success ? result?.data?.name || 'Không nhận diện được' : 'Lỗi nhận diện'
              }
            : img
        )
      );
    } catch (err) {
      console.error('API Error:', err);
      setImages((prev) => prev.map((img) => (img.id === newImg.id ? { ...img, status: 'fail', label: 'Lỗi nhận diện' } : img)));
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAll = () => setImages([]);

  const downloadImage = (img) => {
    const link = document.createElement('a');
    link.href = img.dataUrl;
    link.download = `${img.label || 'photo'}.jpg`;
    link.click();
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Điểm danh Giảng viên
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chọn môn học, buổi học và chụp ảnh để nhận diện sinh viên.
        </Typography>
      </Box>

      {/* FILTER BAR */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3} alignItems="center">
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Chọn môn học</InputLabel>
          <Select value={selectedCourse} label="Chọn môn học" onChange={(e) => setSelectedCourse(e.target.value)}>
            {courses.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Chọn buổi học</InputLabel>
          <Select value={selectedSession} label="Chọn buổi học" onChange={(e) => setSelectedSession(e.target.value)}>
            {sessions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="primary">
          Thêm buổi học
        </Button>
      </Box>

      {/* MAIN LAYOUT: CAMERA / GALLERY */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1.1fr 1fr' }} gap={3}>
        {/* LEFT: CAMERA */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            height: { xs: 'auto', md: '80vh' }
          }}
        >
          <Typography variant="subtitle1" fontWeight="600" mb={1}>
            Camera
          </Typography>

          {/* Camera wrapper với tỷ lệ 4:3 giống CSS của bạn */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 500,
              mx: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'black',
              aspectRatio: '4 / 3'
            }}
          >
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
              className={`camera ${loading ? 'blur' : ''}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {loading && (
              <Box
                className="small-overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0,0,0,0.45)'
                }}
              >
                <div className="spinner small" />
              </Box>
            )}
          </Box>

          {/* Buttons */}
          <Box mt={2} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button variant="contained" color="primary" onClick={capture} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Chụp & Điểm danh'}
            </Button>

            <Button variant="outlined" color="inherit" onClick={clearAll} disabled={loading || images.length === 0}>
              Xoá tất cả
            </Button>
          </Box>
        </Paper>

        {/* RIGHT: GALLERY */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            height: { xs: 'auto', md: '80vh' }
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="600">
              Lịch sử điểm danh ({images.length})
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              mt: 1,
              pr: 0.5
            }}
          >
            {images.length === 0 ? (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chưa có ảnh nào — hãy chụp ảnh để điểm danh.
                </Typography>
              </Box>
            ) : (
              <Box className="gallery-grid">
                {images.map((img) => (
                  <article className={`thumb ${img.status || ''}`} key={img.id}>
                    <div className="thumb-img-wrap">
                      <img src={img.dataUrl} alt={img.label} className="thumb-img" onClick={() => setSelectedImg(img)} />
                      {img.status === 'loading' && (
                        <div className="thumb-overlay">
                          <div className="spinner small" />
                        </div>
                      )}
                    </div>
                    <div className="thumb-meta">
                      <div className="thumb-label">{img.label}</div>
                      <div className="thumb-time">{new Date(img.timestamp).toLocaleString()}</div>
                    </div>
                    <div className="thumb-actions">
                      <button className="mini-btn" onClick={() => downloadImage(img)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                          />
                        </svg>
                        Download
                      </button>

                      <button className="mini-btn danger" onClick={() => deleteImage(img.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12m-9 4v6m6-6v6M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1z"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* PREVIEW MODAL (MUI Dialog) */}
      <Dialog open={Boolean(selectedImg)} onClose={() => setSelectedImg(null)} maxWidth="md" fullWidth>
        {selectedImg && (
          <>
            <DialogTitle>Chi tiết ảnh điểm danh</DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box
                component="img"
                src={selectedImg.dataUrl}
                alt={selectedImg.label}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  borderRadius: 1,
                  objectFit: 'contain'
                }}
              />
              <Box mt={2} textAlign="center">
                <Typography fontWeight={600}>{selectedImg.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(selectedImg.timestamp).toLocaleString()}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedImg(null)}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AttendancePage;
