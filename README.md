# Multi-step Registration Form & Quiz SPA

This project is a single-page web application (SPA) that includes a multi-step registration form and a quiz system. It allows users to register, log in, and take a quiz. After completing the quiz, users are scored and can view their scores. Users’ information, including high scores, is stored in the browser's localStorage.

## Features

### Multi-Step Registration Form
- The registration process is divided into multiple steps (name, email, password).
- Basic form validation ensures that fields are correctly filled before proceeding.
- Users can upload a profile picture as part of the registration process.
- All user data is stored in the browser's localStorage.

### Login System
- Users who have registered can log in using their email and password.
- If a registered user logs in, the app fetches the user’s data from localStorage and displays it.
- If login credentials are incorrect, an error message is shown.

### Quiz System
- The quiz consists of 10 random questions fetched from a local JSON file.
- Each question has multiple choices, and users can select their answers.
- Users can flag questions for review and revisit them before submitting the quiz.
- Users can navigate between quiz questions, and once submitted, their score is calculated and displayed.

### Timer
- A countdown timer for the quiz, with a time limit of 60 seconds.
- If the timer reaches zero, the quiz automatically ends and the score is calculated.

### Local Storage
- User data (first name, last name, email, password, profile image, high score) is stored in the browser's localStorage.
- After completing the quiz, the user's score is compared to their previous high score, and the higher score is saved.

### User Session
- After logging in, the user stays logged in across page refreshes until they log out.
- User session is managed with a flag (`isUser`) stored in localStorage.

## File Structure

- **HTML**: Defines the layout for registration, login, and quiz sections.
- **CSS**: Styles the application, including form validation, progress bars, and the quiz interface.
- **JavaScript**: Handles the functionality of the registration process, form validation, user authentication, quiz logic, and managing user sessions.

## How it Works

### Registration
- A user must enter their first name, last name, email, password, and confirm their password.
- After submitting the registration form, the data is stored in localStorage.
- The form validates user input, ensuring names are at least 3 characters long and passwords match.

### Login
- The user enters their email and password.
- If the credentials match a registered user, the app shows the user's dashboard with their information and the option to start the quiz.
- Users can log out, which will clear their session and show the login screen again.

### Quiz
- The quiz fetches 10 random questions from the `questions.json` file.
- Users can answer each question, flag questions for review, and navigate between them.
- After submitting, the user's score is calculated and displayed.
- The score is compared with the user's previous high score, and the higher score is saved in localStorage.

### Timers
- The quiz includes a countdown timer that gives the user 60 seconds to complete the quiz.
- If the timer reaches zero, the quiz automatically ends, and the score is submitted.

## Dependencies

This project does not have any external dependencies. All the functionality is achieved using vanilla JavaScript, HTML, and CSS.

## LocalStorage Usage

- **users**: All registered users are stored in localStorage under the key `users`. Each user has their own profile data, including their high score.
- **isUser**: A flag that indicates if a user is currently logged in.
- **user**: The currently logged-in user’s data.


