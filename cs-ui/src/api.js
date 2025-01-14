const API_BASE_URL = 'http://localhost:8080/api';  // Backend API URL

// Get questions
export const getQuestions = async () => {
  const response = await fetch(`${API_BASE_URL}/questions`);
  return await response.json();
};

// Add new question
export const createQuestion = async (question) => {
  const response = await fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  return await response.json();
};

// Update question
export const updateQuestion = async (id, updatedQuestion) => {
  const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedQuestion),
  });
  return await response.json();
};

// Delete question
export const deleteQuestion = async (id) => {
  await fetch(`${API_BASE_URL}/questions/${id}`, {
    method: 'DELETE',
  });
};

// Get topics
export const getTopics = async () => {
  const response = await fetch(`${API_BASE_URL}/topics`);
  return await response.json();
};

// Add new topic
export const createTopic = async (topic) => {
  const response = await fetch(`${API_BASE_URL}/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  });
  if (!response.ok) throw new Error('Failed to create topic');
  return await response.json();
};

// Update topic
export const updateTopic = async (id, updatedTopic) => {
  const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTopic),
  });
  if (!response.ok) throw new Error('Failed to update topic');
  return await response.json();
};

// Delete topic
export const deleteTopic = async (id) => {
  const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete topic');
};


// Save answers 
export const saveAnswers = async (answers) => {
  const response = await fetch(`${API_BASE_URL}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answers),
  });

  if (!response.ok) throw new Error('Failed to save answers');
  return await response.json(); 
};


// Get Answers
export const getAnswers = async () => {
  const response = await fetch(`${API_BASE_URL}/answers`);
  if (!response.ok) throw new Error('Failed to fetch answers');
  return await response.json();
};


