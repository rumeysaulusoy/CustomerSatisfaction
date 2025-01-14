package com.example.customer_satisfaction.Repositories;
import com.example.customer_satisfaction.Models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
}

