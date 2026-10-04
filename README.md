# 💰 ExpenseFlow — Expense Tracker

A full-stack **Expense Tracker application** built with **Java Spring Boot, PostgreSQL, and HTML/CSS/JavaScript**.

The application allows users to add, view, update, delete, search, and analyze their expenses through a clean and interactive dashboard.

---

## 🚀 Features

### 💸 Expense Management
- Add new expenses
- View all expenses
- Update existing expenses
- Delete expenses
- Search expenses
- Filter expenses by category
- View total expenses

### 📊 Dashboard & Analytics
- Total expenses
- Total number of transactions
- Average expense
- Top spending category
- Category-wise spending analytics
- Recent expenses table
- Interactive expense dashboard

### 🛡️ Backend
- RESTful API architecture
- Spring Boot
- Spring Data JPA
- Hibernate ORM
- Bean Validation
- PostgreSQL database
- Global exception handling

### 🎨 Frontend
- Responsive dashboard
- Expense management interface
- Add/Edit expense modal
- Category filtering
- Search functionality
- Spending analytics

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA
- Hibernate
- Bean Validation
- Maven

### Database
- PostgreSQL

### Frontend
- HTML5
- CSS3
- JavaScript

---

## 🏗️ Project Architecture

```text
Frontend
   │
   │ HTTP Requests
   ▼
Spring Boot REST API
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
JPA / Hibernate
   │
   ▼
PostgreSQL
```

---

## 📁 Project Structure

```text
ExpenseTrackerAPI/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── saswata/
│       │           └── expensetracker/
│       │               ├── Expense.java
│       │               ├── ExpenseController.java
│       │               ├── ExpenseService.java
│       │               ├── ExpenseRepository.java
│       │               ├── GlobalExceptionHandler.java
│       │               └── ExpenseTrackerApiApplication.java
│       │
│       └── resources/
│           ├── application.properties
│           └── static/
│               ├── index.html
│               ├── style.css
│               └── script.js
│
├── pom.xml
├── README.md
└── .gitignore
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/expenses` | Add a new expense |
| `GET` | `/api/expenses` | Get all expenses |
| `GET` | `/api/expenses/{id}` | Get expense by ID |
| `PUT` | `/api/expenses/{id}` | Update an expense |
| `DELETE` | `/api/expenses/{id}` | Delete an expense |
| `GET` | `/api/expenses/category/{category}` | Get expenses by category |
| `GET` | `/api/expenses/total` | Calculate total expenses |

---

## 📝 Example API Request

### POST `/api/expenses`

```json
{
  "title": "Groceries",
  "amount": 850.50,
  "category": "Food",
  "expenseDate": "2026-10-05",
  "description": "Weekly groceries"
}
```

### Example Response

```json
{
  "id": 1,
  "title": "Groceries",
  "amount": 850.50,
  "category": "Food",
  "expenseDate": "2026-10-05",
  "description": "Weekly groceries"
}
```

---

## 🗄️ Database Configuration

The application uses **PostgreSQL**.

Create a database named:

```sql
CREATE DATABASE expense_tracker;
```

Then configure your PostgreSQL credentials in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/expense_tracker
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> ⚠️ Do not upload your real PostgreSQL password to a public GitHub repository.

---

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ExpenseTrackerAPI.git
```

### 2. Navigate into the project

```bash
cd ExpenseTrackerAPI
```

### 3. Make sure PostgreSQL is running

Create the database:

```sql
CREATE DATABASE expense_tracker;
```

### 4. Configure database credentials

Update:

```text
src/main/resources/application.properties
```

with your PostgreSQL username and password.

### 5. Start the application

```bash
mvn spring-boot:run
```

The application will start at:

```text
http://localhost:8080
```

---

## 🖥️ Dashboard

The application provides a web-based dashboard where users can:

- Add expenses directly from the frontend
- Search expenses
- Filter expenses by category
- Edit expenses
- Delete expenses
- View total spending
- View transaction count
- View average expense
- Analyze spending by category

---

## 📊 Analytics

The dashboard provides category-based spending analytics to help users understand where their money is being spent.

Example categories include:

- 🍔 Food
- 🚗 Transport
- 🛍️ Shopping
- 💡 Bills
- 🎬 Entertainment
- 🏥 Health
- 📚 Education
- ✈️ Travel
- 📦 Other

---

## 🔮 Future Improvements

- User authentication and authorization
- Monthly budget management
- Monthly spending analytics
- Income tracking
- Advanced charts and reports
- Export expenses to CSV/PDF
- Swagger/OpenAPI documentation
- JWT authentication
- Cloud deployment
- Responsive mobile interface

---

## 👨‍💻 Author

**Saswata Pati**

🎓 B.Tech — Information Technology

🔗 LinkedIn:  
https://www.linkedin.com/in/saswata-pati-66614317b/

💻 GitHub:  
https://github.com/codexsaswata

---

## ⭐ If you find this project useful

Give the repository a ⭐ on GitHub!