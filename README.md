Live Demo : https://brainly-eight.vercel.app/
🧠 BrainlyShare – Backend
This is the REST API server that powers the BrainlyShare app. It handles user authentication, content storage, and link sharing using a secure hash system.

🔐 Features
✅ User registration and login (with JWT)

📦 Create and store custom brain content

🔗 Generate public hash links to share your content

👀 Retrieve and display shared content for visitors

🧠 Built with clean controller-service architecture

⚙️ Tech Stack
Node.js + Express for server-side routing

MongoDB + Mongoose for data storage

JWT for authentication

Bcrypt for password encryption

CORS and middleware-based validation

📦 Setup
bash
Copy
Edit
npm install
npm run dev
Create a .env file with:

env
Copy
Edit
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🔗 Live Demo / GitHub Repos
Frontend: github.com/RamanKurai/Second-Brain-fe
Backend: github.com/RamanKurai/Second-Brain-App
