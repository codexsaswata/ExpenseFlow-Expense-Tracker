# Expense Tracker REST API

A Spring Boot REST API for managing personal expenses. Built with Java, Spring Boot, Spring Web, Spring Data JPA, Hibernate, Bean Validation, and H2 for zero-setup local development.

## Features
- Create, read, update and delete expenses
- Search expenses by category
- Calculate total expenses
- Input validation
- RESTful endpoints
- JPA/Hibernate persistence
- H2 in-memory database for quick local setup

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/expenses` | Add expense |
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/category/{category}` | Filter by category |
| GET | `/api/expenses/total` | Calculate total |

## Run
Requirements: Java 17+ and Maven.

```bash
mvn spring-boot:run
```

API runs at `http://localhost:8080`.

## Example request

```json
{
  "title": "Groceries",
  "amount": 850.50,
  "category": "Food",
  "expenseDate": "2026-10-05",
  "description": "Weekly groceries"
}
```

## Architecture

Controller -> Service -> Repository -> JPA/Hibernate -> H2

## Future improvements
- MySQL profile
- Authentication
- Monthly budgets
- Category-wise analytics
- Swagger/OpenAPI documentation
