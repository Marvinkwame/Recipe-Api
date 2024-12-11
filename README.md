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

PROJECT STRUCTURE
─src
    ├───config
    ├───controllers
    ├───middleware
    ├───models
    ├───routes
    └───types


4.Start the Server
npm run dev
