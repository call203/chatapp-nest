# Chat Platform AI
This is the backend for the [Chat Platform React](https://github.com/call203/chatapp-react) project.

# 🔧 How to Install
## Requirements
- Node.js v18/20
- npm
- MySQL server


## Setting up the Backend
1. Clone the repository.
2. Rund `npm install` to install dependencies.
3. Create a `.env.development` file in the root directory and paste the following:

   ```
   PORT=

   MYSQL_DB_HOST=
   MYSQL_DB_USERNAME=
   MYSQL_DB_PASSWORD=
   MYSQL_DB_PORT=
   MYSQL_DB_NAME=

   COOKIE_SECRET=
   ```

   - **`PORT`** The port your server will run on
   - **`MYSQL_DB_HOST`** The hostname for your MySQL database server
   - **`MYSQL_DB_USERNAME`** The username for your MySQL database
   - **`MYSQL_DB_PASSWORD`** The password for your MySQL user account
   - **`MYSQL_DB_PORT`** The port your MySQL server is running on (default 3306)
   - **`MYSQL_DB_NAME`** The name of your database (be sure to create it first otherwise an error will be thrown).
   - **`COOKIE_SECRET`** Can be any string that can be used to encrypt & decrypt your cookie.

4. Run `npm run start:dev` depending on which package manager you use to start the project in development mode.


This work is based on [chat platform open source project](https://github.com/stuyy/chat-platform-react)



