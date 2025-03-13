# Task Manager App

A full-stack task management application built using **Next.js**, **Redux Toolkit**, **NestJS**, and **MongoDB**.

## 🚀 Features
- Create, update, delete, and view tasks
- Task status management (`pending`, `in-progress`, `completed`)
- Redux state management
- Fully tested with **Jest** for both frontend and backend
- Dockerized setup for easy deployment

---

## 🛠️ Tech Stack
### Frontend
- **Next.js** (React Framework)
- **Redux Toolkit** (State Management)
- **Jest** & **React Testing Library** (Testing)

### Backend
- **NestJS** (Node.js Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **Jest** (Testing)
- **Docker** (Containerization)

---

## 🛠️ Setup & Installation

### Clone the Repository
```sh
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
### Backend Setup
```sh
cd backend
npm install
```
### Env Setup
```sh
MONGO_URI=mongodb://localhost:27017/task-manager
PORT=5000
```
### Run the backend server:

```sh
cd backend/
npm run start:dev
```
### Run the frontend server:

```sh
cd frontend/
npm run dev
```



