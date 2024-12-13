# JusticeHub
JusticeHub is a web platform connecting users with legal professionals. It offers easy access to legal services, secure case management, and expert consultations. Users can find advocates, track cases, and communicate securely, simplifying the legal process with a user-friendly interface.




# Features
- **User Registration & Login**: Secure access for clients and advocates with role-specific features.
- **Profile Management**: Comprehensive profiles for users and legal professionals.
- **Search & Connect**: Find and connect with legal experts based on specialization and location.
- **Case Management**: Track ongoing cases and access case history.
- **Secure Messaging**: Encrypted communication between users and advocates.
- **Review System**: Rate and review legal services provided.

---

# Technologies Used
- **Front-end**: HTML, CSS, Bootstrap, JavaScript
- **Back-end**: Node.js, Express.js
- **Database**: MySQL
- **Templating Engine**: Handlebars
- **Security**: Bcrypt (for password encryption)

---

# Installation

To get started with the project locally, follow these steps:

1. Clone the repository :
   ```bash
   git clone https://github.com/yourusername/JusticeHub.git
   ```

2. Install dependencies :
   ```bash
   cd JusticeHub
   npm install
   ```

3. Set up environment variables :
   - Create a `.env` file in the root directory.
   - Add your database credentials and other required information:
     ```plaintext
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=legal
     DB_CONNECTION_LIMIT=100
     ```

4. Run the application :
   ```bash
   npm start
   ```
   - Your app should now be running at `http://localhost:3000`.
  (or)

   Directly run by using
   ```bash
   node app.js
   ```
   
