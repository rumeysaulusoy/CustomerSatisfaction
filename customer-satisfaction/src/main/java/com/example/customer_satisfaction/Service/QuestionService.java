package com.example.customer_satisfaction.Service;

import com.example.customer_satisfaction.Models.Question;
import com.example.customer_satisfaction.Models.Topic;
import com.example.customer_satisfaction.Repositories.QuestionRepository;
import com.example.customer_satisfaction.Repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question saveQuestionWithOptions(Question question) {
        if (question.getTopic() != null) {
            Topic topic = topicRepository.findById(question.getTopic().getId())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
            question.setTopic(topic);
        }
        return questionRepository.save(question);
    }


    public Question updateQuestion(Long id, Question updatedQuestion) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        existingQuestion.setText(updatedQuestion.getText());
        if (updatedQuestion.getTopic() != null) {
            Topic topic = topicRepository.findById(updatedQuestion.getTopic().getId())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
            existingQuestion.setTopic(topic);
        }
        existingQuestion.setOptions(updatedQuestion.getOptions());
        return questionRepository.save(existingQuestion);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
