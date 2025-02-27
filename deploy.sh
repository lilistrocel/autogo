#!/bin/bash

# Update system packages
sudo dnf update -y
sudo dnf install -y nodejs python3-pip nginx git

# Install PM2 globally
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/autogo
sudo chown ec2-user:ec2-user /var/www/autogo

# Copy local files
cd /var/www/autogo

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create systemd service for backend
sudo tee /etc/systemd/system/autogo-backend.service << EOF
[Unit]
Description=AutoGo Backend
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/var/www/autogo/backend
Environment="PATH=/var/www/autogo/backend/venv/bin"
ExecStart=/var/www/autogo/backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000

[Install]
WantedBy=multi-user.target
EOF

# Frontend setup
cd ../frontend
npm install
npm run build

# Configure Nginx
sudo tee /etc/nginx/conf.d/autogo.conf << EOF
server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        root /var/www/autogo/frontend/build;
        try_files \$uri \$uri/ /index.html;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Backend API
    location /api {
        rewrite ^/api/(.*) /\$1 break;
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Media files
    location /uploads {
        alias /var/www/autogo/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# Start services
sudo systemctl daemon-reload
sudo systemctl enable autogo-backend
sudo systemctl start autogo-backend
sudo systemctl enable nginx
sudo systemctl start nginx

# Set proper permissions for uploads directory
sudo mkdir -p /var/www/autogo/backend/uploads
sudo chown -R ec2-user:ec2-user /var/www/autogo/backend/uploads
chmod 755 /var/www/autogo/backend/uploads

echo "Deployment completed! Please update the frontend API_URL in the .env file if needed." 