# Students CRUD Demo

This project is a front-end web application that demonstrates Create, Read, Update, and Delete (CRUD) operations for a list of students. It is built using vanilla JavaScript (ES6 modules), HTML, and CSS.

The application fetches initial user data from the public API `jsonplaceholder.typicode.com/users` and maps it to a custom `Student` data model. All subsequent CRUD operations are performed on the client-side to simulate a real-world application feel.

## Features

*   **View Students**: Fetches and displays a list of students from a public API.
*   **Create Student**: Add a new student to the list via a form with input validation.
*   **Update Student**: Edit the details of an existing student in a modal overlay.
*   **Delete Student**: Remove a student from the list with a confirmation prompt.
*   **Search**: Dynamically search for students by name or email with debouncing for performance.
*   **Responsive UI**: The layout is designed to work on various screen sizes.
*   **Notifications**: Provides user feedback for CRUD operations using toast notifications.
*   **Modular Code**: The JavaScript code is organized into modules for logic and UI components.

## How to Use

To run this project locally, simply clone the repository and open the `index.html` file in your web browser.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abod-ogc/Students-CRUD.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Students-CRUD
    ```

3.  **Open `index.html` in your browser.**

## Project Structure

The repository is organized into a clear and modular structure to separate concerns.

```
.
├── app.js                   # Main application logic, state management, and event handling
├── index.html               # The main HTML file for the application
├── style.css                # All CSS styles for the application
└── Modules/
    ├── Logic/
    │   ├── student.js       # Student class and async data fetching logic
    │   └── util.js          # Utility functions (e.g., email validation)
    └── UI/
        ├── loader.js        # Controls the loading spinner display
        ├── studentsControllers.js # Generates the HTML for individual student cards
        └── toast.js         # Manages the creation and display of toast notifications
```

## Technologies Used

*   **HTML5**
*   **CSS3**
*   **Vanilla JavaScript (ES6 Modules, async/await)**
