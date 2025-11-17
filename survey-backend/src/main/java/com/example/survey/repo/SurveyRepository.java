/**
 * JPA Repository interface for Survey entity, providing CRUD operations.
 */
package com.example.survey.repo;

import com.example.survey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {}
