#!/usr/bin/env python3
"""
Simple HTTP Server for Attendance Tracker
Run this to serve your HTML file over HTTP instead of file://

This eliminates the cookie warning and provides a better development experience.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Configuration
PORT = 8000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    print("🚀 Starting Attendance Tracker Server...")
    print(f"📁 Serving directory: {os.path.abspath(DIRECTORY)}")
    print(f"🌐 Server running on: http://localhost:{PORT}")
    print(f"📝 Attendance Tracker: http://localhost:{PORT}/index.html")
    print("\n🔗 Direct links:")
    print(f"   Main App: http://localhost:{PORT}/index.html")
    print(f"   Clean Version: http://localhost:{PORT}/index-clean.html")
    print("\n⚠️  Press Ctrl+C to stop the server")
    print("=" * 60)

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            # Auto-open browser
            webbrowser.open(f'http://localhost:{PORT}/index.html')
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"\n❌ Port {PORT} is already in use!")
            print(f"💡 Try a different port or stop the existing server")
            print(f"🔧 Alternative: python start_server.py")
        else:
            print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
