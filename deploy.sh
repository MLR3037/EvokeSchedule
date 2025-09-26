#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

echo "Build complete! Your files are in the 'dist' folder."
echo ""
echo "To deploy:"
echo "1. Upload all files from the 'dist' folder to your web server"
echo "2. Make sure your server serves index.html for all routes"
echo "3. Update the authentication redirect URI if needed"
echo ""
echo "For SharePoint Document Library deployment:"
echo "1. Upload all files from 'dist' to a SharePoint document library"
echo "2. Share the index.html file and copy the link"
echo "3. Create a SharePoint page and embed using the link"