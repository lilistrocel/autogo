#!/bin/bash

# Create a temporary directory for deployment files
ssh autogo "mkdir -p /var/www/autogo"

# Copy backend files
scp -r backend/* autogo:/var/www/autogo/backend/

# Copy frontend files
scp -r frontend/* autogo:/var/www/autogo/frontend/

# Copy environment files
scp frontend/.env.production autogo:/var/www/autogo/frontend/.env

echo "Files copied successfully!" 