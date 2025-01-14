import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import QuestionPage from './pages/QuestionPage';
import TopicsPage from './pages/TopicsPage';
import SurveyPage from './pages/SurveyPage';
import AnalyticsPage from './pages/AnalyticsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/survey" element={<SurveyPage />} /> 
        <Route path="/analytics" element={<AnalyticsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
