# Laravel Breeze with Inertia.js & React

## Prerequisites
Make sure you have the following installed:

- PHP 8.x
- Composer
- Node.js & npm
- MySQL

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/faqihmadani/laravel-react.git your-project
cd your-project
```

### 2. Install Dependencies
```sh
composer install
npm install
```

### 3. Setup Environment Variables
Copy the `.env.example` file and rename it to `.env`, then update the database settings:
```sh
cp .env.example .env
```
Edit `.env` and set your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. Generate Application Key
```sh
php artisan key:generate
```

### 5. Run Migrations & Seeding
```sh
php artisan migrate:fresh --seed
```

### 6. Compile Frontend Assets
```sh
npm run dev
```

### 7. Start the Development Server
```sh
php artisan serve
```
Your Laravel app with Inertia.js & React is now running!



