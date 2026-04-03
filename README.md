# Auth Client SPA & Social Login

## 📌 Project Description

This project is a **Single Page Application (SPA)** built with **React** that consumes a **Laravel API**.

It implements:

* Classic authentication (register / login)
* Token-based authentication (Laravel Sanctum)
* Social authentication using OAuth2 (Google & GitHub)

The goal is to provide a modern authentication system with both traditional and social login options.

---

## ⚙️ Technical Stack

### Frontend

* React (Vite)
* React Router
* Axios
* CSS

### Backend

* Laravel 12
* Laravel Sanctum
* Laravel Socialite
* MySQL

---

## 🚀 Features

### 🔐 Authentication

* Register
* Login
* Logout

### 👤 Profile

* View profile
* Update name and email
* Change password (only for local accounts)
* Delete account

### 🌐 Social Login

* Login with Google
* Login with GitHub
* Automatic account creation

### 🔒 Security

* Protected routes
* Token-based authentication
* Auto redirect if not authenticated

---

## 🧠 User Stories Covered

* User can register
* User can login
* User can view profile
* User can update profile
* User can change password
* User can logout
* User can delete account
* User can login with Google
* User can login with GitHub
* Unauthorized users are redirected to login

---

## 🏗️ Project Structure

### Frontend

```
src/
 ├── api/
 ├── pages/
 ├── router/
 └── components/
```

### Backend

```
app/Http/Controllers/Api/
routes/api.php
config/services.php
```

---

## ⚡ Installation

### 1. Clone Project

```
git clone <your-repo-url>
cd project-folder
```

### 2. Backend (Laravel)

```
cd auth-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### 3. Frontend (React)

```
cd auth-client
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Laravel (.env)

```
APP_URL=http://127.0.0.1:8000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/google/callback

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://127.0.0.1:8000/api/auth/github/callback
```

---

## 🔄 Authentication Flow

### Classic Auth

1. User logs in
2. API returns token
3. Token stored in localStorage
4. Redirect to profile

### OAuth

1. User clicks Google/GitHub
2. Redirect to provider
3. User authenticates
4. Laravel callback receives data
5. Token generated
6. Redirect to React with token
7. User redirected to profile

---

## ⚠️ Notes

* OAuth accounts do not have a local password
* Password change is disabled for OAuth users
* Token is temporarily visible in URL (can be improved)

---

## 🧪 Difficulties Encountered

* Token handling between React and Laravel
* OAuth callback flow
* Socialite session issues (stateless)
* Frontend / Backend synchronization

---

## 👨‍💻 Author

* khalil el qaddabi
* GitHub: [khalil-elqaddabi](https://github.com/khalil-elqaddabi)
