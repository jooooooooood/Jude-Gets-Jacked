@echo off
setlocal enabledelayedexpansion

:: Set project root directory
set "ROOT=jude_gets_jacked"

:: Create main project folder
if not exist "%ROOT%" mkdir "%ROOT%"

:: Define directories
set "DIRS=backend backend/src backend/src/controllers backend/src/models backend/src/routes backend/src/utils backend/tests frontend frontend/public frontend/src frontend/src/components frontend/src/Auth frontend/src/services frontend/tests"

:: Define files
set "FILES=docker-compose.yaml package-lock.json package.json README.md schema.sql backend/.dockerignore backend/.env backend/Dockerfile backend/package-lock.json backend/package.json backend/src/server.js backend/src/controllers/authController.js backend/src/controllers/healthController.js backend/src/controllers/nutritionController.js backend/src/controllers/workoutController.js backend/src/models/Health.js backend/src/models/Nutrition.js backend/src/models/User.js backend/src/models/Workout.js backend/src/routes/authRoutes.js backend/src/routes/healthRoutes.js backend/src/routes/nutritionRoutes.js backend/src/routes/workoutRoutes.js backend/src/utils/auth.js backend/src/utils/db.js backend/tests/auth.test.js backend/tests/health.test.js backend/tests/nutrition.test.js backend/tests/workout.test.js frontend/.dockerignore frontend/.env frontend/Dockerfile frontend/package-lock.json frontend/package.json frontend/public/index.html frontend/src/App.css frontend/src/App.js frontend/src/index.js frontend/src/components/Dashboard.js frontend/src/components/HealthLog.js frontend/src/components/HomePage.js frontend/src/components/NutritionLog.js frontend/src/components/ProgressCharts.js frontend/src/components/WorkoutLog.js frontend/src/Auth/Login.js frontend/src/Auth/Register.js frontend/src/services/api.js frontend/src/services/auth.js frontend/tests/App.test.js frontend/tests/Auth.test.js frontend/tests/HealthLog.test.js frontend/tests/NutritionLog.test.js frontend/tests/WorkoutLog.test.js"

:: Create directories
for %%D in (%DIRS%) do (
    if not exist "%ROOT%\%%D" mkdir "%ROOT%\%%D"
)

:: Create files
for %%F in (%FILES%) do (
    if not exist "%ROOT%\%%F" type nul > "%ROOT%\%%F"
)

echo Project structure initialized successfully!
exit /b
