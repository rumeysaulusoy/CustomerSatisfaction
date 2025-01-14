package com.example.customer_satisfaction.Repositories;

import com.example.customer_satisfaction.Models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
