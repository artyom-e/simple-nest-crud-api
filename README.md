# Simple TODO List CRUD API

A simple TODO list API built with NestJS, providing basic CRUD (Create, Read, Update, Delete) functionality.

## Set Up and Run

1. Clone repository
2. Run `cp .env.example .env` and configure
3. Run `docker-compose run --rm node sh -c "npm i && npx prisma generate && npx prisma migrate dev"`
4. Run `docker-compose up -d`

## Features

- Sign Up
- Sign In
- Create task lists
- View all task lists
- Edit task lists
- Delete task lists
- Create tasks
- View all tasks
- Edit tasks
- Delete tasks

## API Routes

The following API routes are available:

| Method | Endpoint                               | Description         |
|--------|----------------------------------------|---------------------|
| POST   | `/api/auth/sign-up`                    | Sign Up             |
| POST   | `/api/auth/sign-in`                    | Sign In             |
| ------ | -------------------                    | ------------------- |
| GET    | `/api/task-lists`                      | Get lists           |
| POST   | `/api/task-lists`                      | Create a list       |
| GET    | `/api/task-lists/{id}`                 | Get a single list   |
| PUT    | `/api/task-lists/{id}`                 | Update a list       |
| DELETE | `/api/task-lists/{id}`                 | Delete a list       |
| ------ | -------------------                    | ------------------- |
| GET    | `/api/task-lists/{list id}/tasks`      | Get tasks           |
| POST   | `/api/task-lists/{list id}/tasks`      | Create a task       |
| GET    | `/api/task-lists/{list id}/tasks/{id}` | Get a single task   |
| PATCH  | `/api/task-lists/{list id}/tasks/{id}` | Update a task       |
| DELETE | `/api/task-lists/{list id}/tasks/{id}` | Delete a task       |


## To be completed

- [ ] Add Swagger Doc
- [ ] Add tests
