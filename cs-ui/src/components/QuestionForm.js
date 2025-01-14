import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const QuestionForm = ({ question, onSave, onCreate, topics }) => {
  const [text, setText] = useState(question ? question.text : '');
  const [topicId, setTopicId] = useState(question ? question.topic.id : '');
  const [options, setOptions] = useState(question ? question.options : ['']);

  useEffect(() => {
    if (question) {
      setText(question.text);
      setTopicId(question.topic.id);
      setOptions(question.options || ['']); 
    }
  }, [question]);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    setOptions(options.map((option, i) => (i === index ? value : option)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.length === 0) {
      setOptions(['']); 
    }

    const newQuestion = {
      text,
      topic: { id: topicId },
      options,
    };

    if (question) {
      onSave(question.id, newQuestion);
    } else {
      onCreate(newQuestion);
    }

    // Form sıfırlama işlemi
    setText('');
    setTopicId('');
    setOptions(['']);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', backgroundColor: '#ffffff',
      padding: 3, borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" align="center" sx={{ color: '#333', fontWeight: 'bold' }}>
        {question ? 'Edit Question' : 'Add New Question'}
      </Typography>

      <TextField
        label="Question Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        fullWidth
        sx={{
          '& .MuiInputLabel-root': { color: '#000000' },
          '& .MuiOutlinedInput-root': {
            borderColor: '#0097A7', '&:hover fieldset': { borderColor: '#007C8A' },
            '&.Mui-focused fieldset': { borderColor: '#007C8A' }, '& input': { color: '#000000' }
          }
        }}
      />

      <TextField
        label="Topic"
        select
        value={topicId}
        onChange={(e) => setTopicId(e.target.value)}
        required
        fullWidth
        sx={{
          '& .MuiInputLabel-root': { color: '#000000' },
          '& .MuiOutlinedInput-root': {
            borderColor: '#0097A7', '&:hover fieldset': { borderColor: '#007C8A' },
            '&.Mui-focused fieldset': { borderColor: '#007C8A' }, '& input': { color: '#000000' }
          }
        }}
      >
        <MenuItem value="">
          <em>Select Topic</em>
        </MenuItem>
        {topics.map((topic) => (
          <MenuItem key={topic.id} value={topic.id}>
            {topic.name}
          </MenuItem>
        ))}
      </TextField>

      <Box>
        <Typography variant="subtitle1" sx={{ color: '#000000' }}>Options:</Typography>
        {options.map((option, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TextField
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderColor: '#0097A7', '&:hover fieldset': { borderColor: '#007C8A' },
                  '&.Mui-focused fieldset': { borderColor: '#007C8A' }, '& input': { color: '#000000' }
                }
              }}
            />
            <IconButton onClick={() => handleRemoveOption(index)}>
              <RemoveCircle color="error" />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddCircle />}
          onClick={handleAddOption}
          variant="outlined"
          sx={{
            borderColor: '#0097A7', color: '#0097A7', '&:hover': { backgroundColor: '#0097A7', color: '#fff' }
          }}
        >
          Add Option
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ backgroundColor: '#0097A7', '&:hover': { backgroundColor: '#007C8A' } }}
      >
        {question ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
};

export default QuestionForm;
