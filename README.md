# 📖 Shoes Store - Ecommerce Site Backend

### Key Highlights :

✨ **User Authentication:**

- Implemented user authentication securely using `jwt tokens` and `bcyrpt` package.
- Only Admin user can `add` and `delete` shoes product
- Only Customer can place purchase order

🌐 **CRUD Operations**

- Users must be authenticated and only authorized individuals (admins) can modify, create or delete books entries.

  - `Create`: Add new book entries with details such as title, author, publication year, and genre.

  - `Read`: Retrieve books information.

  - `Update`: Modify existing book entries to update information such as title, genre, or author.

  - `Delete`: Remove book entries from the database, either individually or in bulk.

🚦 **Filtering Books**

- `filter` books based on `author`, or `year`.

- `Sort` the books in any order like (by author name, publication year,books title, books genere, etc).

**Technologies Used**

          +-------------------+
          | Technologies Used |
          +-------------------+
          |      Node.js      |
          |    Express.js     |
          |       MySQL       |
          |   Sequelize ORM   |
          +-------------------+

---

## 🥇 Project Setup

1. ⬇️ **Download**: Download the project from GitHub and open it in your favorite text editor.

2. 📥 **Install Dependencies**: Navigate to the project folder and execute the following command to install all necessary dependencies:

   ```
   cd shoes-store-backend
   npm install
   ```

3. 🔌**Environment Configuration**: In the root directory, create a `.env` file and add the following environment variables `Change values:

   ```
    PORT=4000
    SALT_ROUNDS=8
    JWT_EXPIRY='1d'
    JWT_SECRET=""
    STRIPE_SECRET_KET=""

    PAYMENT_SUCCESS_URL="https://shoes-store-frontend.onrender.com/verify?success=true&orderId="

    PAYMENT_FAILED_URL="https://shoes-store-frontend.onrender.com/verify?success=false&orderId="


    Note: Payment success and failed url will 
   ```

4. 🚀 **Initialize Sequelize**: `Navigate to the src` folder (very important) and execute the following command to initialize Sequelize:

   ```
   npx sequelize init
   ```

   This will create a `config.json` file inside the `config` folder.

5. 🔌 **Configure Database**: Open `config.json` and update the database configuration:

   - Add your database username, password, and dialect (e.g., `mysql`, `mariadb`, `mssql`, etc.).

6. 💾 **Database Setup**: Populate the database by running the following commands:

   ⚠️ **Note**: In SQL server we cannot use enums, so to implement enums I used check constrain, this will not work with mysql or any other database. If you are not using `mssql`, delete file `20240427154341-add-check-constraint.js` from `src/migrations/` folder.

   ```
   npx sequelize db:create
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

7. ⚡**Start the Server**: Begin running the server using this command:

   ```
   npm run dev
   ```

## Project Details

### 🌐 API Calls

    BASE ADDRESS : `http:localhost:3000/`

⚠️ **Note**: API Endpoints postman files `User AUTH.postman_collection.json` and `Books CRUD.postman_collection.json` can be found in project main directory.

The API endpoints use different `HTTP` methods(`GET`, `POST`, `PATCH`,`PUT`, `DELETE`) and follow `RESTful` design principles.

---

- **Books CRUD**: Endpoints for books crud operations.

  | HTTP Method | Endpoint             | Description                              | Data inside body                                                                                    | Data inside headers                                |
  | :---------- | :------------------- | :--------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
  | GET         | `/api/v1/books/ping` | `Check if the books API is live`         |                                                                                                     |                                                    |
  | GET         | `/api/v1/books/?`    | `Get all books with and without filters` | ex: /api/v1/books/ ?author=Isaac Asimov& year=2020& sort=author_asc,title_desc,genere_desc,year_asc |                                                    |
  | GET         | `/api/v1/books/:id`  | `Get a specific book by ID`              |                                                                                                     |                                                    |
  | POST        | `/api/v1/books`      | `Add a new book`                         | {title: 'Book', publicationYear: '2018', genre: ''}                                                 | x-access-token (JWT token after login)             |
  | PATCH       | `/api/v1/books/:id`  | `Update a specific book by ID`           | {title: 'Book', publicationYear: '2018', genre: ''}                                                 | x-access-token (JWT token after login)             |
  | DELETE      | `/api/v1/books/:id`  | `Delete a specific book by ID`           |                                                                                                     | x-access-token (JWT token after login) after login |

---

- **User Authentication**: Endpoints for user registration, login, and authentication management.

  ⚠️ **Note**: Manually add at least one admin role in userRoles table to perform all the api operations.

  | HTTP Method | Endpoint                | Description           | Data inside body                                       | Data inside headers                                |
  | :---------- | :---------------------- | :-------------------- | ------------------------------------------------------ | -------------------------------------------------- |
  | GET         | `/api/v1/user/ping`     | `API is live or not`  |                                                        |                                                    |
  | POST        | `/api/v1/user/register` | `Users can register`  | {name:'Manoj',email:'abc@xyz.com',password:'password'} |                                                    |
  | POST        | `/api/v1/user/login`    | `Users can login`     | {email:'abc@xyz.com',password:'password'}              |                                                    |
  | POST        | `/api/v1/user/role`     | `Give roles to users` | {role:'admin',userId:10}                               | x-access-token i.e. jwt token recieved after login |
  | DELETE      | `/api/v1/user/role`     | `Revoke user's role`  | {role:'admin',userId:10}                               | x-access-token i.e. jwt token recieved after login |

---

### 💾 Database Structure

The project uses a relational database to store data for various entities:

**DATABASE NAME** : `Books_DB`

---

- **Books** 🔗: Contains information about the books like title, author, publicationYear, etc.

  ```
    +-------------------------+
    |          Books          |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  title                  |
    |  author                 |
    |  publicationYear        |
    |  genere                 |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
  ```

- **Users** 👤: Stores user information such as name, email, hashed password, etc.

  ```
      +-------------------------+
      |          USERS          |
      +-------------------------+
      |  id  -> (PK, Identity)  |
      |  name                   |
      |  email                  |
      |  password (hashed)      |
      |  createdAt              |
      |  updatedAt              |
      +-------------------------+

  ```

---

- **Roles** 🎭: Contains information about the different roles a user can have (e.g., customer, admin).

  ```
    +-------------------------+
    |          Roles          |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  name -> (Check Const)  |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+

    name column values : ['admin', 'customer', 'flight_company']
  ```

---

- **User Roles** 🔗: A join table that establishes a many-to-many relationship between **Users** and **Roles**, allowing users to have multiple roles.

  ```
    +-------------------------+
    |        userRoles        |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  user_id -> (FK)        |
    |  role_id -> (FK)        |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
    user_id : References Users on column id
    role_id : References Roles on column id
  ```

  Foreign keys establish relationships between **Users** & **userRoles** and **Roles** & **userRoles** helping in creating `M:N` association.

---

### ⚠️ Error Handling

Error handling is a crucial aspect of the project, ensuring smooth operation and useful feedback for clients:

- **Custom Error Classes**: The project uses custom error classes like `BaseError`, `BadRequestError`, `InternalServerError`, and `AppError` to manage different types of errors and return appropriate HTTP status codes.

- **Middleware**: The `errorHandler` middleware function intercepts and handles exceptions by identifying the type of error and responding accordingly. It is executed just before express default error handler runs

- **Structured Responses**: Errors are structured as JSON objects with properties such as status code, message, and error explanation. This consistent response format simplifies troubleshooting for clients.

- **Default Handling**: If an unknown error occurs, the middleware throws a custom `InternalServerError` and log the error in `Logger`.

- **Logging**: All errors are logged for monitoring and troubleshooting purposes, enabling quick identification and resolution of problems.

The combination of these features ensures reliable and user-friendly error handling throughout the application.

## 📦 Packages and Their Usage

- **`bcrypt`** 🔒: Used for securely hashing passwords and comparing hashed passwords. It helps protect user credentials by ensuring sensitive data is stored securely.

- **`body-parser`** 📝: A middleware for Express that parses incoming request bodies in various formats such as JSON and URL-encoded data, making the data easily accessible for further processing.

- **`dotenv`** 🔧: Loads environment variables from a `.env` file into `process.env`, allowing you to securely store sensitive information such as API keys and database credentials.

- **`express`** 🚀: A web application framework for Node.js that provides a minimalist structure for building APIs and web applications. It offers routing, middleware, and other essential features for building scalable server-side applications.

- **`express-rate-limit`** 🚦: A middleware for Express that limits repeated requests from the same IP address. It helps protect your application against abusive requests, such as DDoS attacks, by imposing request rate limits.

- **`http-status-codes`** 📜: A package providing easy access to standard HTTP status codes, which makes it convenient to set response statuses and handle different types of API responses.

- **`jsonwebtoken`** 🔑: A library for generating and verifying JSON Web Tokens (JWTs), which are used for authentication and authorization in your application. JWTs enable secure and stateless user sessions.

- **`pluralize`** 🔀: A utility library for transforming singular words into plural and vice versa. This is used mainly to converting models name in plural form, which is a use case in identity reset function.

- **`sequelize`** 💽: An object-relational mapping (ORM) library for Node.js, allowing you to interact with your database using models and associations. It simplifies database operations and offers a high-level abstraction.

- **`sequelize-cli`** 🛠️: A command-line interface for Sequelize that provides commands for managing migrations, models, and other database-related tasks. It facilitates database schema changes and updates.

- **`tedious`** 💾: A Node.js driver for interacting with Microsoft SQL Server databases. It allows you to execute queries, manage transactions, and handle database connections.

- **`winston`** 🛡️: A logging library for Node.js that supports various log levels and transports (such as file or console logging). It helps you track and manage application logs effectively for debugging and monitoring purposes.

---
