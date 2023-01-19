@echo off
node %1 %2
if %ErrorLevel% equ 0 (
    echo %2 found!!
    pause
)