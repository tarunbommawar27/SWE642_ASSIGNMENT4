/**
 * Main Spring Boot application entry point for the Student Survey backend REST API.
 */
package com.example.survey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SurveyApplication {
  public static void main(String[] args) {
    SpringApplication.run(SurveyApplication.class, args);
  }
}
