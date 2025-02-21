# EvenSense Backend

EvenSense is a **Project Management System** designed to solve knowledge transfer issues during onboarding by creating a **project space** with relevant information, dependencies, progress tracking, and analytics.

## 🚀 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (with Prisma ORM)
- **Authentication:** JWT-based authentication
- **Architecture:** Clean Architecture, Microservices, Event-Driven Architecture (Kafka)
- **Caching & Performance:** Redis (for session management, caching)
- **Logging & Monitoring:** Winston, Prometheus, Grafana

---

## 📌 Features

### ✅ Authentication & Authorization
- User signup & login with JWT-based authentication.
- Role-based access control (RBAC).
- Refresh token mechanism for secure session management.

### ✅ Project & Task Management
- CRUD operations for projects and tasks.
- Assign team members, track progress, and manage deadlines.
- Version control & project history tracking.

### ✅ Collaboration & Communication
- Commenting & discussion threads within projects.
- Real-time notifications & updates.

### ✅ Analytics & Reporting
- Project insights & performance tracking.
- Task completion trends, workload distribution.

### ✅ Event-Driven Architecture
- Kafka-based event streaming for real-time updates.
- Microservices communication using event-driven patterns.

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/HaseebQureshi7/Evensense-server.git
cd Evensense-server
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/evensense
JWT_ACCESS_TOKEN_SECRET=youraccesstokensecret
JWT_REFRESH_TOKEN_SECRET=yourrefreshtokensecret
```

### 4️⃣ Run the server
```sh
npm start
```

---

## 🛠 API Endpoints

### 🔹 **Auth Routes**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login and receive tokens |
| POST   | `/api/auth/refresh` | Get a new access token |

### 🔹 **User Routes**
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/users/me` | Get logged-in user details |
| PATCH  | `/api/users/:id` | Update user profile |
| DELETE | `/api/users/:id` | Delete user account |

### 🔹 **Project Routes**
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/projects` | Get all projects |
| POST   | `/api/projects` | Create a new project |
| PATCH  | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

---

## 🛡 Middleware

### 🔹 **Authentication Middleware**
Ensures only authenticated users can access protected routes.
```ts
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
```

---

## 📌 Contributing
Feel free to fork, submit issues, and contribute! To get started:
```sh
git clone https://github.com/yourusername/even-sense-backend.git
cd even-sense-backend
git checkout -b feature/your-feature
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💡 Future Enhancements
- AI-powered task prioritization.
- Integration with third-party services (Jira, Slack, GitHub).
- Mobile app support for iOS & Android.

---

### Made with ❤️ by Haseeb Qureshi 🚀

