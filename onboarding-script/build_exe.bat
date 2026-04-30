@echo off
echo Building Yochan-Shield Client Agent EXE...
pip install -r requirements.txt
pyinstaller --onefile --console --name YochanShieldAgent shield_agent.py
echo Build Complete! Check the 'dist' folder for YochanShieldAgent.exe.
pause
