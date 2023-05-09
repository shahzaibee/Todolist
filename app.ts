#! /usr/bin/env node

import inquirer from "inquirer";

interface Todo {
  name: string;
  completed: boolean;
}

const todos: Todo[] = [];

function startTodoList() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Add a new todo", "Mark a todo as completed", "Exit"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Add a new todo":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Enter the name of the new todo:",
              },
            ])
            .then((answers) => {
              todos.push({ name: answers.name, completed: false });
              console.log(`New todo added: ${answers.name}`);
              startTodoList();
            });
          break;
        case "Mark a todo as completed":
          inquirer
            .prompt([
              {
                type: "list",
                name: "todo",
                message: "Which todo would you like to mark as completed?",
                choices: todos.map((todo) => ({
                  name: todo.name,
                  value: todo,
                })),
              },
            ])
            .then((answers) => {
              answers.todo.completed = true;
              console.log(`Todo marked as completed: ${answers.todo.name}`);
              startTodoList();
            });
          break;
        case "Exit":
          console.log("Thank you for using our todo list!");
          break;
      }
    });
}

console.log("Welcome to the todo list!");
startTodoList();
