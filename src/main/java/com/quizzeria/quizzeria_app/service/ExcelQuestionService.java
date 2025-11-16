package com.quizzeria.quizzeria_app.service;

import com.quizzeria.quizzeria_app.model.Question;
import org.apache.poi.ss.usermodel.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExcelQuestionService {

    private final List<Question> allQuestions = new ArrayList<>();

    public ExcelQuestionService() {
        loadExcelData();
    }

    private void loadExcelData() {
        try {
            InputStream file = new ClassPathResource("questions.xlsx").getInputStream();
            Workbook workbook = WorkbookFactory.create(file);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // skip header

                String category = getCellValue(row.getCell(0));   // Category
                String questionText = getCellValue(row.getCell(1)); // Question

                List<String> options = new ArrayList<>();
                options.add(getCellValue(row.getCell(2))); // Option 1
                options.add(getCellValue(row.getCell(3))); // Option 2
                options.add(getCellValue(row.getCell(4))); // Option 3
                options.add(getCellValue(row.getCell(5))); // Option 4

                String correctAnswer = getCellValue(row.getCell(6)); // Correct Answer

                allQuestions.add(
                        new Question(category, questionText, options, correctAnswer)
                );
            }

            workbook.close();
        } catch (Exception e) {
            throw new RuntimeException("Failed to load Excel file: " + e.getMessage());
        }
    }

    // SAFE EXCEL CELL READER
    private String getCellValue(Cell cell) {
        if (cell == null) return "";

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> cell.getCellFormula();
            case BLANK -> "";
            default -> "";
        };
    }

    // API helper: filter & limit
    public List<Question> getQuestions(String category, int count) {
        List<Question> filtered = allQuestions.stream()
                .filter(q -> q.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());

        Collections.shuffle(filtered);

        if (count > filtered.size()) count = filtered.size();

        return filtered.subList(0, count);
    }

}
