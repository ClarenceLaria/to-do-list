## To-Do List Application
This project is a simple To-Do List application built with Next.js. It allows users to add tasks with a title, description, and a due date, ensuring that the selected date is not in the past. The app includes error handling to reject invalid dates and provides a user-friendly interface.

## Features:
- Task Creation: Users can add a task by specifying a title, description, and due date.
- Date Validation: The app ensures that the due date cannot be in the past. If the user selects a past date, an error message is displayed.
- Form Inputs: The form includes input fields for title, description, and due date, which are handled and validated accordingly.

## Tech Stack:
- Next.js: For building the frontend and handling server-side rendering.
- React: For building the interactive UI components.
- Tailwind CSS: For styling the components.
- Prisma: For interacting with the database (if you connect it to MongoDB or any other database).

## Setup Instructions:
- Clone the repository:
```bash
git clone https://github.com/ClarenceLaria/to-do-list.git
```
- Install the dependencies:
```bash
cd to-do-list
npm install
```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
- Open your browser and navigate to http://localhost:3000 to view the app.

## APIS
Currently the application has one API that creates a task for the client and the other that fetches tasks from the database, the APIs are found in the '/app/api/'. 

## How the APIs Work:
# Create Tasks API:
It performs the following steps:
- Reads and validates input: It checks if the title, description, and date are provided in the request body.
- Creates the task: If the data is valid, it creates a new task in the database using Prisma's create method.
- Returns response: On success, it returns the created task with a 201 status. If there’s an error, it logs the error and returns a 500 status with a generic error message.

# Fetch Tasks API:
- prisma.task.findMany() retrieves all records from the task table in the database.
- If successful, it returns the tasks in JSON format with a 200 status.
If an error occurs, it logs the error and returns a 500 status with an error message.
