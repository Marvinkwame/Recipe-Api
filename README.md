Recipe Management API

Description

The Recipe Management API allows users to create, view, update, and delete recipes. 
It includes features for user authentication, category management, and public/private recipe visibility. 
The API is designed to make it easy for users to organize and share their recipes while ensuring 
secure access and efficient data management.


How To Run Locally
1.Clone  the Repository
git clone <repository-url>
cd <project-folder>


2.Install Dependencies
npm install


3.Set Up Environment Variables
MONGODB_CONNECTION_URL=<your-mongodb-connection-string>
JWT_SECRET_KEY=<your-jwt-secret-key>
NODE_ENV=development


PROJECT FOLDER

├── src/
│   ├── config/
│   │   ├── mongo.ts       # MongoDB configuration
│   │   ├── rateLimit.ts      # Rate limiting configuration
│   │
│   ├── controllers/
│   │   ├── AuthController.ts # User authentication logic
│   │   ├── RecipeController.ts # Recipe management logic
│   │   ├── CategoryController.ts # Category CRUD logic
│   │   ├── PublicController.ts  # Logic for public recipe views
│   │
│   ├── middlewares/
│   │   ├── verifyToken.ts # Middleware for authentication
│   │   ├── validation.ts # Middleware for authentication
│   │
│   ├── models/
│   │   ├── UserModel.ts           # User model schema
│   │   ├── RecipeModel.ts         # Recipe model schema
│   │   ├── CategoryModel.ts       # Category model schema
│   │
│   ├── routes/
│   │   ├── UserRoutes.ts     # Routes for user authentication
│   │   ├── RecipeRoutes.ts   # Routes for recipe management
│   │   ├── CategoryRoutes.ts # Routes for category management
│   │   ├── PublicRoutes.ts   # Routes for public access
│   │
│   ├── types/
│   │   ├── Recipe.ts         # Type definitions for Recipe
│   │   ├── User.ts           # Type definitions for User
│   │   ├── Category.ts      # Type definitions for Category
│   │
│   ├── index.ts             # Entry point for the application
│
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
├── README.md                 # Documentation for the project



4.Start the Server
npm run dev
