# SWE 642 Assignment 4 - Student Survey Application

**Group Project**: Vue.js + Spring Boot + MySQL

This is a full-stack student survey application re-implementing Assignment #3 using:
- **Frontend**: Vue.js 3 with Vite
- **Backend**: Spring Boot REST API
- **Persistence**: JPA/Hibernate with MySQL
- **Styling**: Bootstrap 5

---

## Technologies Used

### Backend
- Java 17
- Spring Boot 3.3.3
- Spring Data JPA
- Spring Web (REST API)
- Spring Validation
- MySQL Connector/J
- Maven

### Frontend
- Vue.js 3.4
- Vue Router 4.4
- Axios 1.7
- Bootstrap 5.3
- Vite 5.4

---

## Project Structure

```
SWE642_Assignment4/
├── survey-backend/          # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/survey/
│   │       │   ├── config/
│   │       │   │   └── CorsConfig.java
│   │       │   ├── model/
│   │       │   │   ├── Survey.java
│   │       │   │   ├── InterestSource.java
│   │       │   │   └── RecommendLikelihood.java
│   │       │   ├── repo/
│   │       │   │   └── SurveyRepository.java
│   │       │   ├── web/
│   │       │   │   └── SurveyController.java
│   │       │   └── SurveyApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── target/
│
└── vue-frontend/             # Vue.js frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Home.vue
    │   │   ├── SurveyForm.vue
    │   │   └── SurveysList.vue
    │   ├── App.vue
    │   ├── main.js
    │   ├── router.js
    │   ├── api.js
    │   └── SurveyService.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── node_modules/
```

---

## Prerequisites

1. **Java 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/

2. **Maven 3.6+**
   - Download from: https://maven.apache.org/download.cgi

3. **Node.js 16+ and npm**
   - Download from: https://nodejs.org/

4. **MySQL 8.0+**
   - Download from: https://dev.mysql.com/downloads/mysql/

---

## Database Setup

1. **Start MySQL Server**

2. **Create Database and User**
   ```sql
   CREATE DATABASE IF NOT EXISTS swe642;
   CREATE USER IF NOT EXISTS 'swe642'@'localhost' IDENTIFIED BY 'swe642pass';
   GRANT ALL PRIVILEGES ON swe642.* TO 'swe642'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Verify Connection**
   ```bash
   mysql -u swe642 -pswe642pass swe642
   ```

---

## Backend Setup & Run

### Option 1: Using Maven (Development)

1. **Navigate to backend directory**
   ```bash
   cd survey-backend
   ```

2. **Clean and compile**
   ```bash
   mvn clean compile
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Verify backend is running**
   - Backend runs on: `http://localhost:8080`
   - Test endpoint: `http://localhost:8080/api/surveys`

### Option 2: Build JAR (Production)

1. **Build executable JAR**
   ```bash
   cd survey-backend
   mvn clean package
   ```

2. **Run the JAR**
   ```bash
   java -jar target/survey-backend-0.0.1-SNAPSHOT.jar
   ```

---

## Frontend Setup & Run

### Development Mode

1. **Navigate to frontend directory**
   ```bash
   cd vue-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend runs on: `http://localhost:5173`
   - Open browser and navigate to: `http://localhost:5173`

### Production Build

1. **Build for production**
   ```bash
   cd vue-frontend
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Output**
   - Built files will be in `vue-frontend/dist/` directory
   - Deploy the `dist/` folder to any static hosting service

---

## REST API Endpoints

### Base URL: `http://localhost:8080/api/surveys`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/surveys` | Get all surveys |
| GET | `/api/surveys/{id}` | Get survey by ID |
| POST | `/api/surveys` | Create new survey |
| PUT | `/api/surveys/{id}` | Update existing survey |
| DELETE | `/api/surveys/{id}` | Delete survey |

### Example Request (POST)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "streetAddress": "4400 University Dr",
  "city": "Fairfax",
  "state": "VA",
  "zip": "22030",
  "telephone": "+1-703-555-1234",
  "email": "jdoe@gmu.edu",
  "dateOfSurvey": "2025-11-17",
  "likedMost": ["students", "campus", "location"],
  "interestSource": "INTERNET",
  "recommendLikelihood": "VERY_LIKELY",
  "comments": "Great campus!"
}
```

---

## Application Features

1. **Survey Form**
   - Create new surveys with validation
   - Edit existing surveys
   - Required fields marked with asterisk (*)
   - Client-side and server-side validation

2. **Survey List**
   - View all submitted surveys in a table
   - Edit any survey
   - Delete surveys with confirmation
   - Responsive design using Bootstrap

3. **Data Fields**
   - Personal Information: First/Last Name, Address, City, State, Zip
   - Contact: Telephone, Email
   - Survey Date
   - What did you like most? (checkboxes)
   - How did you become interested? (radio buttons)
   - Likelihood to recommend (dropdown)
   - Additional comments (textarea)

---

## Problems Found & Fixed

### Backend Issues

#### 1. CORS Configuration
**Problem**: CORS allowed `http://localhost:4200` (Angular port) but Vue/Vite runs on port `5173`

**File**: `survey-backend/src/main/java/com/example/survey/config/CorsConfig.java`

**Fix**:
```java
// BEFORE
.allowedOrigins("http://localhost:4200")

// AFTER
.allowedOrigins("http://localhost:5173", "http://localhost:8080")
.allowedHeaders("*")
.allowCredentials(true)
```

#### 2. MySQL JDBC URL
**Problem**: Missing timezone parameter can cause connection errors

**File**: `survey-backend/src/main/resources/application.properties`

**Fix**:
```properties
# BEFORE
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/swe642

# AFTER
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/swe642?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

#### 3. Survey Entity @Table Annotation
**Problem**: Missing explicit `@Table` annotation (best practice for JPA)

**File**: `survey-backend/src/main/java/com/example/survey/model/Survey.java`

**Fix**:
```java
// ADDED
@Table(name = "survey")
public class Survey {
```

#### 4. Missing Header Comments
**Problem**: Assignment requires comments on top of source files (2 points)

**Fix**: Added header comments to all Java files:
- `Survey.java` - JPA Entity
- `InterestSource.java` - Enum
- `RecommendLikelihood.java` - Enum
- `SurveyRepository.java` - Repository interface
- `SurveyController.java` - REST Controller
- `SurveyApplication.java` - Main application
- `CorsConfig.java` - CORS configuration

### Frontend Issues

#### 5. Missing Bootstrap Import
**Problem**: Bootstrap CSS included in package.json but not imported

**File**: `vue-frontend/src/main.js`

**Fix**:
```javascript
// ADDED
import 'bootstrap/dist/css/bootstrap.min.css'
```

#### 6. Missing Header Comments
**Problem**: Assignment requires comments on top of source files

**Fix**: Added HTML/JS comment headers to all Vue files:
- `App.vue` - Main component
- `Home.vue` - Home page
- `SurveyForm.vue` - Survey form component
- `SurveysList.vue` - Surveys list component
- `main.js` - Entry point
- `router.js` - Vue Router config
- `api.js` - Axios instance
- `SurveyService.js` - API service layer

---

## Testing the Application

### Full End-to-End Test

1. **Start MySQL** (ensure it's running)

2. **Start Backend**
   ```bash
   cd survey-backend
   mvn spring-boot:run
   ```
   - Wait for: "Started SurveyApplication in X seconds"

3. **Start Frontend** (in a new terminal)
   ```bash
   cd vue-frontend
   npm run dev
   ```
   - Access: `http://localhost:5173`

4. **Test Functionality**
   - Navigate to "Student Survey" button
   - Fill out the form (all required fields)
   - Click Submit
   - Verify redirect to "List All Surveys"
   - Verify survey appears in table
   - Test Edit button
   - Test Delete button

5. **Verify Database**
   ```sql
   mysql -u swe642 -pswe642pass swe642
   SELECT * FROM survey;
   ```

---

## Troubleshooting

### Backend Won't Start

**Issue**: "Access denied for user 'swe642'@'localhost'"
- **Solution**: Verify MySQL user/password, re-run database setup SQL

**Issue**: "Table doesn't exist"
- **Solution**: Check `spring.jpa.hibernate.ddl-auto=update` in application.properties

### Frontend Won't Connect

**Issue**: CORS errors in browser console
- **Solution**: Verify backend is running and CORS config includes port 5173

**Issue**: "Network Error" when submitting
- **Solution**: Check backend is running on port 8080

### Build Errors

**Issue**: Maven compilation fails
- **Solution**: Ensure Java 17+ is installed: `java -version`

**Issue**: npm install fails
- **Solution**: Ensure Node.js 16+ is installed: `node -version`

---

## Submission Checklist

- [x] Backend compiles without errors
- [x] Frontend builds without errors
- [x] JPA entities with proper annotations
- [x] REST API endpoints working (GET, POST, PUT, DELETE)
- [x] Vue components with proper routing
- [x] Form validation (client and server side)
- [x] CRUD operations functional
- [x] CORS configured correctly
- [x] Header comments on all source files
- [x] README with setup instructions
- [x] Application runs end-to-end

---

## Assignment Requirements Met

### Technical (85 points)
- ✅ Vue.js 3 frontend with routing
- ✅ RESTful web services (Spring Boot)
- ✅ JPA/Hibernate persistence
- ✅ MySQL database integration
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Form validation
- ✅ Proper HTTP methods (GET, POST, PUT, DELETE)
- ✅ JSON request/response format
- ✅ Error handling

### Artifacts (13 points)
- ✅ Source code (backend + frontend)
- ✅ pom.xml with dependencies
- ✅ application.properties with DB config
- ✅ package.json with dependencies
- ✅ All Vue components
- ✅ README with instructions

### Comments (2 points)
- ✅ Header comments on all Java files
- ✅ Header comments on all Vue/JS files

---

## Team Members

[Add your team member names here]

---

## License

This project is for educational purposes as part of SWE 642 coursework at George Mason University.
