import React, { useState, useEffect } from 'react';
import { getQuestions, createQuestion, updateQuestion, deleteQuestion, getTopics } from '../api';
import QuestionForm from '../components/QuestionForm';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; 

function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchQuestions();
    fetchTopics();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions.');
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const data = await getTopics();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setError('Failed to load topics.');
    }
  };

  const handleCreateQuestion = async (newQuestion) => {
    try {
      const createdQuestion = await createQuestion(newQuestion);
      setQuestions([...questions, createdQuestion]);
    } catch (error) {
      console.error('Error creating question:', error);
      setError('Failed to create question.');
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleSaveQuestion = async (id, updatedQuestion) => {
    try {
      const savedQuestion = await updateQuestion(id, updatedQuestion);
      setQuestions(questions.map((question) =>
        question.id === id ? savedQuestion : question
      ));
      setEditingQuestion(null);
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Failed to update question.');
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
      setError('Failed to delete question.');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4, 
        padding: '20px', borderRadius: '10px', background: 'linear-gradient(45deg, #0097A7, #4CAF50)',
        width: 'fit-content', margin: '0 auto'
      }}>
        <Typography variant="h4" align="center" sx={{
          fontWeight: 'bold', color: '#fff', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <AiOutlineEdit size={25} /> Question Management
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          <Box sx={{ marginTop: 4 }}>
            <QuestionForm onCreate={handleCreateQuestion} topics={topics} />
          </Box>

          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} key={question.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent>
                    <Typography variant="h6">{question.text}</Typography>
                    <Typography color="textSecondary">Topic: {question.topic.name}</Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 1 }}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEditQuestion(question)}
                      startIcon={<AiOutlineEdit />}
                      sx={{ color: '#0097A7' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteQuestion(question.id)}
                      startIcon={<AiOutlineDelete />}
                      sx={{ color: '#f44336' }}
                    >
                      Delete
                    </Button>
                  </CardActions>

                  {editingQuestion && editingQuestion.id === question.id && (
                    <Box p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', marginTop: 2 }}>
                      <QuestionForm
                        question={editingQuestion}
                        onSave={handleSaveQuestion}
                        topics={topics}
                      />
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default QuestionPage;
