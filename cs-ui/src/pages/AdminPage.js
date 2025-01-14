import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiOutlineControl, AiOutlineAppstoreAdd, AiOutlinePieChart } from 'react-icons/ai';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
        background: 'linear-gradient(45deg, #0097A7, #4CAF50)', padding: '20px', borderRadius: '10px',
      }}>
        <Typography variant="h4" align="center" sx={{
          fontWeight: 'bold', color: '#fff', fontSize: '2rem',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <AiOutlineControl size={25} /> Admin Panel
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ marginTop: 2, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            borderRadius: '12px', boxShadow: 3, overflow: 'hidden'
          }}>
            <CardContent sx={{ padding: '16px' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Question Management
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                You can view, add new, edit, or delete existing questions.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => handleNavigation('/questions')}
              sx={{
                margin: 2, backgroundColor: '#0097A7', color: '#fff', textTransform: 'none',
                '&:hover': { backgroundColor: '#00838F' },
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1
              }}
            >
              <AiOutlineControl size={20} /> Go to Question Management
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            borderRadius: '12px', boxShadow: 3, overflow: 'hidden'
          }}>
            <CardContent sx={{ padding: '16px' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Topic Management
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                You can view, add new, edit, or delete existing topics.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => handleNavigation('/topics')}
              sx={{
                margin: 2, backgroundColor: '#BDBDBD', color: '#000', textTransform: 'none',
                '&:hover': { backgroundColor: '#9E9E9E' },
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1
              }}
            >
              <AiOutlineAppstoreAdd size={20} /> Go to Topic Management
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            borderRadius: '12px', boxShadow: 3, overflow: 'hidden'
          }}>
            <CardContent sx={{ padding: '16px' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Survey Response Distribution
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                You can visually analyze the responses given to the survey questions.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              onClick={() => handleNavigation('/analytics')}
              sx={{
                margin: 2, backgroundColor: '#4CAF50', color: '#fff', textTransform: 'none',
                '&:hover': { backgroundColor: '#388E3C' },
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1
              }}
            >
              <AiOutlinePieChart size={20} /> View Response Distribution
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPage;
