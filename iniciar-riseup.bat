@echo off
title bango balango

echo http://127.0.0.1:5173/

npm.cmd run dev -- --host 127.0.0.1 --port 5173
pause
