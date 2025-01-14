package com.example.customer_satisfaction.Service;

import com.example.customer_satisfaction.Models.Answer;
import com.example.customer_satisfaction.Repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public List<Answer> saveAnswers(List<Answer> answers) {
        return answerRepository.saveAll(answers);
    }

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }


}
