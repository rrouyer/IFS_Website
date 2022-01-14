#!python3.8

import http.server
import socketserver

PORT = 8009
handler = http.server.CGIHTTPRequestHandler

with http.server.HTTPServer(("", PORT), handler) as httpd:
    print(f"Server starting on port {PORT}")
    httpd.serve_forever()
