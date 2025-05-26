@echo off
REM Design-to-Code Extra Module Setup Script for Windows
REM This script sets up the project structure and installs dependencies

echo Setting up Design-to-Code Extra Module...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo Node.js detected: 
node -v

REM Create project structure
echo Creating project structure...
mkdir src\components 2>nul
mkdir src\pages 2>nul
mkdir src\styles 2>nul
mkdir src\utils 2>nul
mkdir src\components\dashboard 2>nul
mkdir src\layouts 2>nul
mkdir public\assets\images 2>nul
mkdir public\assets\icons 2>nul

REM Create main entry files
echo Creating entry files...

REM Create index.html
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<link rel="icon" type="image/svg+xml" href="/vite.svg" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Design-to-Code Extra Module^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/main.tsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > public\index.html

REM Move example files if they exist
echo Organizing example files...
if exist "react-product-card.tsx" (
    move /Y react-product-card.tsx src\components\ProductCard.tsx
    echo Moved ProductCard component
)

if exist "dashboard-example.tsx" (
    move /Y dashboard-example.tsx src\pages\Dashboard.tsx
    echo Moved Dashboard page
)

if exist "landing-page-html.html" (
    copy /Y landing-page-html.html public\landing-page-example.html
    echo Copied landing page example
)

REM Create environment file
if not exist ".env" (
    echo Creating .env file...
    (
        echo # Copy your Figma token here
        echo FIGMA_TOKEN=
        echo FIGMA_FILE_ID=
        echo.
        echo # Optional configurations
        echo VITE_APP_NAME=Design-to-Code Extra Module
        echo VITE_API_URL=http://localhost:3000/api
        echo VITE_ENABLE_MOCK_DATA=true
    ) > .env
    echo Remember to add your Figma token to .env file!
)

REM Install dependencies
echo Installing dependencies...
call npm install

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Add your Figma token to .env file
echo 2. Run 'npm run dev' to start the development server
echo 3. Open http://localhost:3000 in your browser
echo 4. Follow the exercises in README.md
echo.
echo Happy coding!
pause 