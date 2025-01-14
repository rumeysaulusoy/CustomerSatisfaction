import React, { useState, useEffect } from "react";
import { getQuestions, saveAnswers } from "../api";  
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";

const SurveyPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    getQuestions()
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        alert("An error occurred while fetching the questions. Please try again.");
      });
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const allAnswered = questions.every(question => answers[question.id]);
    if (!allAnswered) {
      alert("Please answer all the questions.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      question: { id: questionId },
      selectedOption,
    }));

    saveAnswers(formattedAnswers)
      .then(() => {
        alert("Your answers have been successfully submitted!");
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
        alert("An error occurred while submitting your answers. Please try again.");
      });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#F4F6F8", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Airline Customer Satisfaction Survey
      </Typography>

      {questions.map((question, index) => (
        <Card
          key={question.id}
          sx={{
            marginBottom: 2,
            borderRadius: "8px",
            boxShadow: 1,
            width: "100%",
            padding: 2,
            backgroundColor: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", marginBottom: 1 }}>
              {index + 1}. {question.text}
            </Typography>
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                name={`question-${question.id}`}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio size="small" />}
                    label={option}
                    sx={{
                      marginBottom: "0.01rem",
                      paddingRight: "10px",
                      "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            padding: "10px 20px",
            backgroundColor: "#0097A7",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#00838F" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SurveyPage;
