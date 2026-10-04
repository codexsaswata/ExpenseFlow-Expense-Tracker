package com.saswata.expensetracker;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotNull
    @DecimalMin(value = "0.01")
    private Double amount;

    @NotBlank
    private String category;

    @NotNull
    private LocalDate expenseDate;

    private String description;

    public Expense() {}

    public Expense(Long id, String title, Double amount, String category, LocalDate expenseDate, String description) {
        this.id = id; this.title = title; this.amount = amount; this.category = category;
        this.expenseDate = expenseDate; this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
