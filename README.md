<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Technical Test Dutakom Wibawa Putra

Requirements untuk menjalankan technical test ini:
1. PHP >= 8.2
2. PostgreSQL 16
3. Node >= 22
4. Composer >= 2.7
5. Bun (Opsional, bisa menggunakan npm / yarn jika mau)

Berikut ini adalah langkah-langkah untuk menjalankan aplikasi technical test saya:


1. Clone Repo
```bash
git clone https://github.com/juniantowicaksono06/d-net-technical-test.git
```

2. Masuk ke directory repo yang sudah di clone tadi dan buat file .env di root repo

```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:OzVITbV16lBkkphbuYOR2CaVKZu3Sog7oaUkpNhfA/A=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=postgre-crm
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=mypostgres
DB_PASSWORD=Abcd1234

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

VITE_BASE_URL="http://localhost:8000"

JWT_SECRET=0E0mgR7ETfhHnldTti4ZLd5nMTEs3lSDRaPTnJLFpGVSJaeoWMHtMuLnIdIxaQuh

```

3. Buka terminal dan install package yang dibutuhkan oleh node.
```bash
# Bila mengunakan Bun
bun install

# Bila menggunakan npm
npm install

# Bila menggunakan yarn

yarn install
```

4. Install package yang dibutuhkan oleh PHP

```bash
composer install
```

5. Lalu jalankan vite menggunakan perintah
```bash
# Bila mengunakan Bun
bun run dev:react

# Bila mengunakan npm
npm run dev:react

# Bila mengunakan yarn
yarn run dev:react
```



6. Buka terminal lagi lalu jalankan artisan menggunakan perintah
```bash
# Bila mengunakan Bun
bun run dev:laravel

# Bila mengunakan npm
npm run dev:laravel

# Bila mengunakan yarn
yarn run dev:laravel
```

7. Silahkan buka di browser
```bash
http://localhost:8000
```

8. Berikut adalah beberapa user yang bisa dicoba
```bash
# Role manager
email: joni@gmail.com
password: Abcd1234
role: manager

# Role sales
email: wawan1234@gmail.com
password: Abcd1234
role: sales
```