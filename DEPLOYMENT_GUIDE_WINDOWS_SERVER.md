# Руководство по развертыванию Buggers Academy на Windows Server 2022 с доменом и БД

Это пошаговая инструкция для переноса и запуска платформы на вашем **Windows Server 2022** с привязкой вашего купленного домена и подключением к базе данных.

---

## 1. Подготовка окружения на Windows Server 2022

1. **Установите Node.js (LTS)**:
   - Скачайте установщик Node.js v20+ LTS с официального сайта: [nodejs.org](https://nodejs.org).
   - При установке отметьте галочку *«Automatically install the necessary tools»*.

2. **Установите PM2 (Менеджер процессов)**:
   - Откройте PowerShell от имени Администратора:
     ```powershell
     npm install -g pm2
     npm install -g pm2-windows-service
     ```

3. **Скопируйте проект на сервер**:
   - Поместите проект в папку, например: `C:\inetpub\wwwroot\buggers` или `C:\apps\buggers`.

---

## 2. Сборка и Запуск проекта

В PowerShell в папке проекта:
```powershell
cd C:\apps\buggers
npm install
npm run build
```

### Запуск через PM2 (Автозапуск в фоне):
```powershell
# Запуск сервера
pm2 start server/dist/index.js --name "buggers-academy"

# Сохранение списка процессов для автозапуска при перезагрузке Windows
pm2 save
```

Сервер будет запущен на локальном порту **`4000`** (`http://localhost:4000`).

---

## 3. Настройка базы данных

Платформа по умолчанию использует быструю встроенную базу данных **SQLite WAL mode** (`data/academy.db`), которая не требует настройки сторонних служб СУБД.

### Если вы хотите подключить внешнюю PostgreSQL / MySQL базу:
В файле `.env` укажите параметры:
```env
PORT=4000
JWT_SECRET=your_super_secret_production_key_2026
DATABASE_URL=postgres://username:password@localhost:5432/buggers_db
```

---

## 4. Привязка вашего купленного домена (DNS)

1. Зайдите в панель управления регистратора домена (Reg.ru, Namecheap, Cloudflare и т.д.).
2. Добавьте **A-запись**:
   - **Имя / Host**: `@` (или ваш поддомен, например `learn`)
   - **Значение / IP**: Внешний белый IPv4 адрес вашего Windows Server 2022.
   - **TTL**: `Auto` или `300`.
3. Добавьте **A-запись для `www`**:
   - **Имя / Host**: `www`
   - **Значение / IP**: IP адрес сервера.

---

## 5. Настройка IIS Reverse Proxy и Бесплатного SSL (HTTPS)

Чтобы домен открывался по стандартным портам `80` (HTTP) и `443` (HTTPS) с автоматическим перенаправлением на Node.js порт `4000`:

1. **Включите роль Web Server (IIS)** через *Server Manager -> Add Roles and Features*.
2. Установите два расширения IIS:
   - **URL Rewrite Module**: [iis.net/downloads/microsoft/url-rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
   - **Application Request Routing (ARR)**: [iis.net/downloads/microsoft/application-request-routing](https://www.iis.net/downloads/microsoft/application-request-routing)
3. В **IIS Manager**:
   - Нажмите на имя сервера -> **Application Request Routing Cache** -> **Server Proxy Settings** -> Поставьте галочку **«Enable proxy»** -> *Apply*.
   - Создайте сайт в IIS с вашим доменом и добавьте файл `web.config` в корень сайта:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="ReverseProxyToNode" stopProcessing="true">
                    <match url="(.*)" />
                    <action type="Rewrite" url="http://localhost:4000/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

4. **Получение бесплатного SSL сертификата (Let's Encrypt)**:
   - Скачайте утилиту **win-acme**: [win-acme.com](https://www.win-acme.com)
   - Запустите `wacs.exe` от имени администратора.
   - Выберите: `Create certificate (full options)` -> выберите ваш IIS сайт.
   - Утилита автоматически установит SSL сертификат и настроит автопродление каждые 60 дней!

---

## 6. Открытие портов в Windows Defender Firewall

В PowerShell от Администратора выполните:
```powershell
New-NetFirewallRule -DisplayName "HTTP (Port 80)" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "HTTPS (Port 443)" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

Теперь ваш сайт будет безопасно открываться по адресу `https://ваш-домен.ru`!
