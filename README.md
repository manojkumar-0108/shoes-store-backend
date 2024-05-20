# 📖 Shoes Store - Backend Service

**Deployed at** : https://shoes-store-server.onrender.com/

- example: https://shoes-store-server.onrender.com/ping

## Key Highlights

✨ **User Authentication:**

- Secure user authentication using JWT tokens and bcrypt.
- Validate user credentials against the database.
- API endpoints for user registration and login.

🌐 **CRUD Operations:**

- Authentication required for all users; authorization for admins and sellers to modify, create, or delete products.
- Endpoints for fetching product data for both frontend and admin services.
- API endpoints to manage shopping cart operations (add, update, delete items).
- Order placement endpoints handling shipping, payment details, and product quantities.
- Integrated payment processing with Stripe.
- Endpoints for retrieving past orders with detailed information.
- Sellers can add, delete, and view all products.
- Restricted order placement functionality for seller accounts.

🔒 **Security:**

- Robust security measures with data encryption and secure password storage.
- Protection against vulnerabilities (SQL injection, XSS, CSRF).
- HTTPS for secure data transmission.

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
    JWT_SECRET="@yourSecret@1#2$%^key#$no"
    STRIPE_SECRET_KET=""
    FRONT_END_URL="https://shoes-store-frontend.onrender.com"

   ```

4. 🚀 **Initialize Sequelize**: `Navigate to the src` folder (very important) and execute the following command to initialize Sequelize:

   ```
   cd src/
   npx sequelize init
   ```

   This will create a `config.json` file inside the `config` folder.

5. 🔌 **Configure Database**: Open `config.json` and update the database configuration:

   - Add your database username, password, and dialect (e.g., `mysql`, `mariadb`, `mssql`, etc.).

6. 💾 **Database Setup**: Populate the database by running the following commands:

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

### 💾 Database Structure

The project uses a relational database to store data for various entities:

**DATABASE NAME** : `ShoesStore_DB`

---

- **Shoes** 🔗: Contains information about the shoes like name, description, price, etc.

  ```
    +-------------------------+
    |          SHOES          |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  name                   |
    |  description            |
    |  price                  |
    |  image                  |
    |  category               |
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
    |  name ->                |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+

    Three roles available : ['admin', 'customer', 'seller']
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

- **User Carts** 🔗: Contains information about the products in user cart.

  ```
    +-------------------------+
    |        userCarts        |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  user_id -> (FK)        |
    |  shoe_id -> (FK)        |
    |  quantity               |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
    user_id : References Users on column id
    shoe_id : References Shoes on column id
  ```

- **Orders** 🔗: Contains information about the user orders.

  ```
    +-------------------------+
    |        Orders           |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  user_id -> (FK)        |
    |  amount                 |
    |  address_id -> (FK)     |
    |  order_status           |
    |  data                   |
    |  payment                |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
    user_id : References Users on column id
    address_id : References Addresses on column id

    payment can has values : [pending, paid, failed]
  ```

- **Addressess** 🔗: Contains information about the user address entered while placing orders.

  ```
    +-------------------------+
    |       Addressess        |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  firstName              |
    |  lastName               |
    |  email                  |
    |  phone                  |
    |  city                   |
    |  street                 |
    |  state                  |
    |  country                |
    |  zipcode                |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+

  ```

- **OrderItems** 🔗: A join table that establishes a many-to-many relationship between **Orders** and **Shoes**, allowing users to have multiple shoes in a single order.

  ```
    +-------------------------+
    |        orderItems       |
    +-------------------------+
    |  id  -> (PK, Identity)  |
    |  order_id -> (FK)       |
    |  shoe_id -> (FK)        |
    |  createdAt              |
    |  updatedAt              |
    +-------------------------+
    order_id : References Orders on column id
    shoe_id : References Shoes on column id
  ```

---

### 🌐 API Calls

- BASE ADDRESS : `http:localhost:4000/`

- Our service supports two kinds of request, one from frontend and other from admin service

  - Frontend API CALL: `http:localhost:4000/api/frontend/` -> may require user login for some functionalities

  - Admin API CALL: `http:localhost:4000/api/admin/` -> user should be either admin or seller to use these apis

The API endpoints use different `HTTP` methods(`GET`, `POST`, `PATCH`,`PUT`, `DELETE`) and follow `RESTful` design principles.

---

#### Admin API Endpoints - Admin or Seller only

- **Shoes CRUD**: Endpoints for Shoes crud operations.

  | HTTP Method | Endpoint                | Description                      | REQ body                                | REQ Headers    |
  | :---------- | :---------------------- | :------------------------------- | --------------------------------------- | -------------- |
  | GET         | `/api/admin/shoes/ping` | `Check if the shoes API is live` |                                         | x-access-token |
  | GET         | `/api/admin/shoes/`     | `Get all shoes`                  |                                         | x-access-token |
  | GET         | `/api/admin/shoes/:id`  | `Get a specific shoe by ID`      |                                         | x-access-token |
  | POST        | `/api/v1/books`         | `Add a new shoe`                 | {name,description,price,category,image} | x-access-token |
  | PATCH       | `/api/admin/shoes/:id`  | `Update a specific shoe by ID`   | {name,description,price,category,image} | x-access-token |
  | DELETE      | `/api/admin/shoes/:id`  | `Delete a specific shoe by ID`   |                                         | x-access-token |

---

- **User Login**: Endpoints for user login.

  | HTTP Method | Endpoint                 | Description                     | REQ body         | REQ Headers    |
  | :---------- | :----------------------- | :------------------------------ | ---------------- | -------------- |
  | GET         | `/api/admin/users/ping`  | `Check if the Auth API is live` |                  | x-access-token |
  | POST        | `/api/admin/users/login` | `Login to admin account`        | {email,password} | x-access-token |
  | PATCH       | `/api/admin/users/role`  | `Add rote to user`              | {role,userId}    | x-access-token |
  | DELETE      | `/api/admin/users/role`  | `Revoke role from user`         | {role,userId}    | x-access-token |

---

- **Orders**: Endpoints for getting all the orders placed by all the users

  | HTTP Method | Endpoint                            | Description                  | REQ body | REQ Headers    |
  | :---------- | :---------------------------------- | :--------------------------- | -------- | -------------- |
  | GET         | `/api/admin/orders/ping`            | `Check if order API is live` |          | x-access-token |
  | PATCH       | `/api/admin/orders/status/:orderId` | `Update order status`        | {status} | x-access-token |

---

#### Frontend API Endpoints - Customer only

- **Shoes**: Endpoints for Shoes crud operations.

  | HTTP Method | Endpoint                   | Description                      | REQ body | REQ Headers    |
  | :---------- | :------------------------- | :------------------------------- | -------- | -------------- |
  | GET         | `/api/frontend/shoes/ping` | `Check if the shoes API is live` |          | x-access-token |
  | GET         | `/api/frontend/shoes/`     | `Get all shoes for frontend`     |          | x-access-token |

---

- **User Login**: Endpoints for user login.

  | HTTP Method | Endpoint                       | Description                     | REQ body              | REQ Headers |
  | :---------- | :----------------------------- | :------------------------------ | --------------------- | ----------- |
  | GET         | `/api/frontend/users/ping`     | `Check if the Auth API is live` |                       |             |
  | POST        | `/api/frontend/users/login`    | `logged in to user account `    | {email,password}      |             |
  | POST        | `/api/frontend/users/register` | `Create user account`           | {name,email,password} |             |

---

- **Orders**: Endpoints for getting all the orders placed by the user, user details are accessed using x-access-token

  | HTTP Method | Endpoint                        | Description                  | REQ body              | REQ Headers    |
  | :---------- | :------------------------------ | :--------------------------- | --------------------- | -------------- |
  | GET         | `/api/frontend/orders/ping`     | `Check if order API is live` |                       | x-access-token |
  | POST        | `/api/frontend/orders/:orderId` | `Place order`                | {items:[],address:{}} | x-access-token |

---

- **Carts**: Endpoints for user carts, user details are accessed using x-access-token

  | HTTP Method | Endpoint                                  | Description                    | REQ body | REQ Headers    |
  | :---------- | :---------------------------------------- | :----------------------------- | -------- | -------------- |
  | GET         | `/api/frontend/carts/ping`                | `Check if order API is live`   |          | x-access-token |
  | GET         | `/api/frontend/carts/products/`           | `Get all items from user cart` |          | x-access-token |
  | POST        | `/api/frontend/carts/products/:productId` | `Add to cart`                  |          | x-access-token |
  | DELETE      | `/api/frontend/carts/products/:productId` | `Remove from cart`             |          | x-access-token |

---

### ⚠️ Error Handling

Error handling is a crucial aspect of the project, ensuring smooth operation and useful feedback for clients:

- **Custom Error Classes**: The project uses custom error classes like `BaseError`, `BadRequestError`, `InternalServerError`, and `AppError` to manage different types of errors and return appropriate HTTP status codes.

- **Middleware**: The `errorHandler` middleware function intercepts and handles exceptions by identifying the type of error and responding accordingly. It is executed just before express default error handler runs

- **Structured Responses**: Errors are structured as JSON objects with properties such as status code, message, and error explanation. This consistent response format simplifies troubleshooting for clients.

- **Default Handling**: If an unknown error occurs, the middleware throws a custom `InternalServerError` and log the error in `Logger`.

- **Logging**: All errors are logged for monitoring and troubleshooting purposes, enabling quick identification and resolution of problems.

The combination of these features ensures reliable and user-friendly error handling throughout the application.

### 📦 Packages and Their Usage

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

- **`cors`** 🌐: A Node.js package for providing an Express middleware to enable Cross-Origin Resource Sharing (CORS) with various options. This is crucial for allowing your web applications to access resources from different origins securely.

- **`node-cron`** ⏰: A Node.js package for scheduling tasks (cron jobs) using a cron-like syntax. It enables you to run functions at specific times or intervals, making it useful for tasks like backups, report generation, and periodic data fetching.

- **`pm2`** 🚀: A production process manager for Node.js applications with a built-in load balancer. It helps manage and keep your application online 24/7, with features for monitoring, logging, and restarting on crashes.

- **`stripe`** 💳: A Node.js library for integrating with the Stripe payment gateway. It allows you to handle payments, subscriptions, and other financial transactions securely and efficiently.

---
