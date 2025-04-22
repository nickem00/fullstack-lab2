# Fullstack Lab 2

This is a fullstack project in the course Full Stack Development (DA219B) at Kristianstad University.

It uses Express and MongoDB in the backend, with React/Vite-frontend.

## How to use

1. Clone repo:

```sh
git clone https://github.com/nickem00/fullstack-lab2.git
cd fullstack-lab2
```

2. Install all dependencies (in root, client and server):

```sh
npm run install-all
```
Alternatively, you can run `npm install` in the root directory, then navigate to `client` and `server` and run `npm install` in each of those directories as well.

3. Create a `.env` file in the root directory with your MongoDB connection string:

```
MONGODB_CONNECTION_STRING=din_mongodb_url
PORT=5000
```

## Start the project

Run the following command in root:

```sh
npm run dev
```

This starts both the backend (Express) and the frontend (Vite/React) simultaneously.

- Frontend runs at: http://localhost:5173
- Backend runs at: http://localhost:5000

---

### Structure

- `client/` – React/Vite frontend
- `server/` – Express/MongoDB backend

---

### Scripts

- `npm run dev` – Starts both the backend and frontend
- `npm run install-all` – Installs dependencies in root, client, and server

---