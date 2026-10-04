package com.saswata.expensetracker;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Expense create(@Valid @RequestBody Expense expense) {
        return service.create(expense);
    }

    @GetMapping
    public List<Expense> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Expense getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        return service.update(id, expense);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/category/{category}")
    public List<Expense> byCategory(@PathVariable String category) {
        return service.byCategory(category);
    }

    @GetMapping("/total")
    public Map<String, Double> total() {
        return Map.of("totalExpenses", service.total());
    }
}
