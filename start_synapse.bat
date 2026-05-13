@echo off
echo ==========================================
echo       Starting Synapse AI Server
echo ==========================================
echo.

:: Start the Node.js server in a new window
start "Synapse AI Backend" node server.js

:: Wait for 2 seconds to ensure the server has time to start
timeout /t 2 /nobreak > nul

echo Opening Synapse AI in your default browser...
:: Launch the default browser
start http://localhost:3000

echo.
echo Done! You can close this window. (Keep the other server window open while using the app).
pause
