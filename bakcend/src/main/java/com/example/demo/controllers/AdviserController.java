package com.example.demo.controllers;

import com.example.demo.exceptions.RecipeBookException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviserController {

    // Global exception handler for all controllers
    @ExceptionHandler(RecipeBookException.class)
    public ProblemDetail handleRecipeBookException(RecipeBookException e){
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    }
    // Handle all the rest
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneralException(Exception e){
        System.out.println(e.getMessage());
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Something went wrong, please try again later");
    }
}
