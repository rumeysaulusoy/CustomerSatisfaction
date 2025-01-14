package com.example.customer_satisfaction.Controllers;
import com.example.customer_satisfaction.Models.Answer;
import com.example.customer_satisfaction.Service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping
    public ResponseEntity<List<Answer>> saveAnswers(@RequestBody List<Answer> answers) {
        List<Answer> savedAnswers = answerService.saveAnswers(answers);
        return new ResponseEntity<>(savedAnswers, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Answer>> getAllAnswers() {
        List<Answer> answers = answerService.getAllAnswers();
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }


}
