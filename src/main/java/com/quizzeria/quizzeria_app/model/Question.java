package com.quizzeria.quizzeria_app.model;


import java.util.List;

public class Question {
    private String category;
    private String question;
    private List<String> options;
    private String correctAnswer;

    public Question(String category, String question, List<String> options, String correctAnswer) {
        this.category = category;
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    public String getCategory() { return category; }
    public String getQuestion() { return question; }
    public List<String> getOptions() { return options; }
    public String getCorrectAnswer() { return correctAnswer; }
}

