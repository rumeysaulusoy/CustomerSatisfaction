import React, { useState, useEffect } from 'react';
import { getTopics, createTopic, updateTopic, deleteTopic } from '../api';
import { Box, Card, CardContent, CardActions, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTopicName, setNewTopicName] = useState('');
  const [editingTopic, setEditingTopic] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const data = await getTopics();
      setTopics(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setLoading(false);
    }
  };

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) {
      setError('Topic name is required');
      return;
    }
    setError('');
    try {
      const createdTopic = await createTopic({ name: newTopicName });
      setTopics([...topics, createdTopic]);
      setNewTopicName('');
      setOpenDialog(false);
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const handleEditTopic = (topic) => {
    setEditingTopic({ ...topic });
    setOpenDialog(true);
  };

  const handleSaveTopic = async () => {
    if (!editingTopic.name.trim()) {
      setError('Topic name is required');
      return;
    }
    setError('');
    try {
      const updatedTopic = await updateTopic(editingTopic.id, { name: editingTopic.name });
      setTopics(topics.map((topic) => (topic.id === editingTopic.id ? updatedTopic : topic)));
      setEditingTopic(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      await deleteTopic(id);
      setTopics(topics.filter((topic) => topic.id !== id));
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingTopic(null);
    setNewTopicName('');
    setError('');
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#F5F5F5' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
        padding: '20px', borderRadius: '10px', background: 'linear-gradient(45deg, #0097A7, #4CAF50)',
        width: 'fit-content', margin: '0 auto'
      }}>
        <Typography variant="h4" align="center" sx={{
          fontWeight: 'bold', color: '#fff', fontSize: '2rem',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <Edit size={25} /> Topic Management
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            margin: 2,
            backgroundColor: '#0097A7',
            color: '#fff',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#757575' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          Add New Topic
        </Button>
      </Box>

      {loading ? (
        <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : (
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {topics.map((topic) => (
              <Card key={topic.id} sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#fff', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600 }}>{topic.name}</Typography>
                </CardContent>
                <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    onClick={() => handleEditTopic(topic)}
                    startIcon={<Edit />}
                    sx={{
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#388E3C' },
                      borderRadius: 2,
                      padding: '6px 12px',
                      fontWeight: 600
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    onClick={() => handleDeleteTopic(topic.id)}
                    startIcon={<Delete />}
                    sx={{
                      backgroundColor: '#F44336',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#D32F2F' },
                      borderRadius: 2,
                      padding: '6px 12px',
                      fontWeight: 600
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: '#0097A7', color: '#fff' }}>
          {editingTopic ? 'Edit Topic' : 'Add New Topic'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#fafafa' }}>
          <TextField
            label="Topic Name"
            value={editingTopic ? editingTopic.name : newTopicName}
            onChange={(e) => {
              if (editingTopic) {
                setEditingTopic({ ...editingTopic, name: e.target.value });
              } else {
                setNewTopicName(e.target.value);
              }
            }}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: '#fff' }}
          />
          {error && <Typography sx={{ color: 'red', fontSize: '12px' }}>{error}</Typography>}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#fafafa' }}>
          <Button onClick={handleDialogClose} sx={{ color: '#0097A7' }}>Cancel</Button>
          <Button
            onClick={editingTopic ? handleSaveTopic : handleCreateTopic}
            variant="contained"
            sx={{
              backgroundColor: '#0097A7',
              '&:hover': { backgroundColor: '#757575' },
              padding: '6px 12px',
              fontWeight: 600
            }}
          >
            {editingTopic ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopicsPage;
