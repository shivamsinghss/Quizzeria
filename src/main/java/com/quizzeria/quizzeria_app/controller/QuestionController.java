package com.quizzeria.quizzeria_app.controller;


import com.quizzeria.quizzeria_app.model.Question;
import com.quizzeria.quizzeria_app.service.ExcelQuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final ExcelQuestionService excelService;

    public QuestionController(ExcelQuestionService excelService) {
        this.excelService = excelService;
    }

    @GetMapping("/random")
    public List<Question> getRandom(
            @RequestParam String category,
            @RequestParam int count
    ) {
        return excelService.getQuestions(category, count);
    }
}
