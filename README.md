# 🧠 BrainlyShare – Backend API

This is the **backend service** for the **BrainlyShare** app – a powerful tool that lets users store, manage, and share their “brain content” via public shareable links.

Built with **Node.js, Express, MongoDB**, and structured to support secure and scalable development.

---

## 🌐 Deployed URL

> 🛠️ _Add your deployed backend URL here when available_

---

## ⚙️ Core Features

🔐 **JWT-based Authentication** (Login/Signup)  
🧠 **User Content Management** (create, delete, read)  
🔗 **Generate Shareable Links** to share your brain  
🔄 **Public API endpoint** to fetch content via hash  
🗑️ Trash system (soft delete for content)  
💾 MongoDB-based document storage  
📦 Clean, scalable folder structure

---

## 🛠️ Tech Stack

| Layer      | Tech                         |
|------------|------------------------------|
| Runtime    | Node.js                      |
| Framework  | Express                      |
| DB         | MongoDB + Mongoose           |
| Auth       | JWT                          |
| Routing    | Express Router               |
| Dev Tools  | Nodemon, CORS, dotenv        |

---

## 📁 Folder Structure

brainly-backend/ ├── models/ # Mongoose Models (User, Content, Link) ├── routes/ # Express routers (auth, brain, share) ├── middleware/ # Auth middleware ├── controllers/ # (optional) can split logic here ├── .env # Environment variables ├── server.ts # Entry point └── utils/ # Utility functions (optional)

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/brainly-backend.git
cd brainly-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env file
ini
Copy
Edit
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key
4. Run the Server
bash
Copy
Edit
npm run dev
Server starts on http://localhost:3000

🧠 API Endpoints
✅ Auth
Route	Method	Description
/api/v1/auth/signup	POST	Create a new user
/api/v1/auth/login	POST	Login + JWT token
📄 Content (Protected)
Route	Method	Description
/api/v1/brain/add	POST	Add a new content block
/api/v1/brain/get	GET	Get all your contents
/api/v1/brain/delete/:id	DELETE	Move content to trash
🔗 Sharing
Route	Method	Description
/api/v1/brain/share	POST	Generate public shareable link (hash)
/api/v1/brain/:sharelink	GET	Public API to fetch shared content
🔐 Auth Middleware
JWT tokens are passed via the Authorization header like so:

bash
Copy
Edit
Authorization: Bearer <your_token_here>
All brain/content routes are protected using this middleware.

🔍 Sample MongoDB Models
UserModel
ts
Copy
Edit
{
  username: String,
  email: String,
  password: String (hashed)
}
ContentModel
ts
Copy
Edit
{
  userId: ObjectId,
  title: String,
  link: String,
  type: String,  // (article, video, etc.)
  isTrashed: Boolean
}
LinkModel
ts
Copy
Edit
{
  userId: ObjectId,
  hash: String
}
✨ Example Shared Page Flow
User selects some content and hits "Generate Link"

A hash is created and stored in LinkModel

Anyone with the link (e.g., /brain/abc123) can view the shared content publicly

🧪 Testing
You can test routes via Postman or frontend integration. Add bearer token to protected routes and test the public share endpoint via GET /brain/:sharelink.

💡 Future Improvements
Content categorization/tags

Expiry timer for shared links

Rich content (notes, images)

Realtime collaboration

🤝 Contributing
Pull requests and suggestions are welcome!
Make sure to open an issue first to discuss what you would like to change.

📜 License
This project is under MIT License

👨‍💻 Made by
Raman Kurai
📧 Email: ramankurai27@gmail.com
🐙 GitHub: github.com/RamanKurai
