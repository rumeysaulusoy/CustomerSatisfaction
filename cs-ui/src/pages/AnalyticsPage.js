import React, { useState, useEffect, useMemo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Box, Typography, List, ListItem, TextField, Grid, Collapse } from '@mui/material';
import { getAnswers, getQuestions } from '../api';
import { FaChartPie, FaChartBar } from 'react-icons/fa'; 
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const AnalyticsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicAverages, setTopicAverages] = useState([]);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    Promise.all([getQuestions(), getAnswers()])
      .then(([questionsData, answersData]) => {
        setQuestions(questionsData);
        setAnswers(answersData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const topicData = {};

    questions.forEach((question) => {
      const topicId = question.topic.id;

      const selectedAnswers = answers.filter(
        (answer) => answer.question.id === question.id
      );

      const answersSum = selectedAnswers.reduce((acc, answer) => {
        const answerValue = parseInt(answer.selectedOption.match(/\d+/)?.[0], 10); 
        return acc + (isNaN(answerValue) ? 0 : answerValue);
      }, 0);

      const average = selectedAnswers.length > 0 ? answersSum / selectedAnswers.length : 0;

      if (!topicData[topicId]) {
        topicData[topicId] = { topicName: question.topic.name, total: 0, count: 0 };
      }

      topicData[topicId].total += average;
      topicData[topicId].count += 1;
    });

    const averages = Object.values(topicData).map((topic) => ({
      name: topic.topicName,
      average: topic.total / topic.count,
    }));

    setTopicAverages(averages);
  }, [questions, answers]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) =>
      question.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [questions, searchQuery]);

  const renderPieChart = (questionId) => {
    const selectedQuestion = questions.find((q) => q.id === questionId);
    if (!selectedQuestion) return null;

    const selectedAnswers = answers.filter(
      (answer) => answer.question.id === questionId
    );

    const optionsCount = selectedQuestion.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});

    selectedAnswers.forEach((answer) => {
      const answerValue = answer.selectedOption;
      optionsCount[answerValue] = (optionsCount[answerValue] || 0) + 1;
    });

    const data = {
      labels: selectedQuestion.options,
      datasets: [
        {
          data: Object.values(optionsCount),
          backgroundColor: ['#6C5B7B', '#F1A7B1', '#88D8B0', '#6B8E23', '#F4A300'],
        },
      ],
    };

    return (
      <Box sx={{ textAlign: 'center', marginTop: 2, height: '300px', width: '100%' }}>
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box>
    );
  };

  const renderBarChart = () => {
    const labels = topicAverages.map((topic) => topic.name);
    const data = topicAverages.map((topic) => topic.average);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Topic Average Scores',
          data: data,
          backgroundColor: '#3A8D99',
        },
      ],
    };

    return (
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 1,
              max: 5,
              stepSize: 1,
            },
          },
        }}
      />
    );
  };

  const handleQuestionClick = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4, 
        padding: '20px', borderRadius: '10px', background: 'linear-gradient(45deg, #0097A7, #4CAF50)',
        width: 'fit-content', margin: '0 auto'
      }}>
        <Typography variant="h4" align="center" sx={{
          fontWeight: 'bold', color: '#fff', fontSize: '2rem', 
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <FaChartPie size={25} /> Survey Analytics
        </Typography>
      </Box>

      <TextField
        label="Search Question"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2, marginTop: 2 }} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={12}>
          <List>
            {filteredQuestions.map((question) => (
              <ListItem
                key={question.id}
                button
                onClick={() => handleQuestionClick(question.id)}
                sx={{
                  marginBottom: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography variant="h6">{question.text}</Typography>

                <Collapse in={openQuestionId === question.id}>
                  {renderPieChart(question.id)}
                </Collapse>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          {renderBarChart()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
