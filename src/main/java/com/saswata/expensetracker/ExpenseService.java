package com.saswata.expensetracker;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public Expense create(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAll() {
        return repository.findAll();
    }

    public Expense getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found: " + id));
    }

    public Expense update(Long id, Expense updated) {
        Expense expense = getById(id);
        expense.setTitle(updated.getTitle());
        expense.setAmount(updated.getAmount());
        expense.setCategory(updated.getCategory());
        expense.setExpenseDate(updated.getExpenseDate());
        expense.setDescription(updated.getDescription());
        return repository.save(expense);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("Expense not found: " + id);
        repository.deleteById(id);
    }

    public List<Expense> byCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    public double total() {
        return repository.findAll().stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }
}
