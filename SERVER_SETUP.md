# 🎯 Attendance Tracker - Local Server Setup

## 🚀 Quick Start

### Option 1: Double-click to run (Windows)
1. Double-click `start_server.bat`
2. Your browser will automatically open to `http://localhost:8000/index.html`

### Option 2: Command line
```bash
# Using Python (recommended)
python start_server.py

# Or using basic Python server
python -m http.server 8000
```

### Option 3: Using VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🔧 Why Use a Local Server?

### ❌ Problems with file:// URLs:
- Cookie warnings in browser console
- Limited Firebase functionality
- CORS restrictions
- Local storage limitations

### ✅ Benefits of HTTP server:
- No cookie warnings
- Full Firebase functionality
- Better CORS handling
- Proper web environment

## 🌐 Access URLs

After starting the server:

- **Main App**: http://localhost:8000/index.html
- **Clean Version**: http://localhost:8000/index-clean.html
- **Server Directory**: http://localhost:8000/

## 🛠️ Troubleshooting

### Port Already in Use
If port 8000 is busy:
```bash
# Try different port
python -m http.server 8080
```

### Python Not Found
1. Install Python from https://python.org
2. Make sure to check "Add to PATH" during installation
3. Restart your command prompt/VS Code

### Firewall Issues
- Windows may ask for firewall permission
- Click "Allow" to permit local server access

## 🔥 Firebase Setup

1. **Create Firestore Database**:
   - Go to [Firebase Console](https://console.firebase.google.com/project/smstt-c0a67/firestore)
   - Click "Create database"
   - Choose "Start in test mode"

2. **Test Connection**:
   - Open browser console (F12)
   - Run: `testFirebaseConnection()`

3. **Verify Setup**:
   - Record an attendance entry
   - Check Firebase Console for data

## 📝 Notes

- The server runs on http://localhost:8000 by default
- Your browser will auto-open when the server starts
- Press Ctrl+C to stop the server
- All files in the directory are accessible via the web server

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify Firebase configuration in Firebase Console
3. Ensure Firestore database is created and has proper rules
4. Test Firebase connection using the built-in test function
