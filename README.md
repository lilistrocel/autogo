# AutoGo - Auto Parts E-commerce Platform

A modern e-commerce platform for auto parts, built with React and FastAPI.

## Features

- Modern, responsive UI built with Material-UI
- Category-based product browsing
- Shopping cart functionality
- Product image management
- RESTful API backend
- SQLite database for easy setup

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- React Router for navigation
- Context API for state management

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Alembic for migrations
- SQLite database

## Setup

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- pip

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Deployment

The project includes deployment scripts for Amazon EC2:
- `deploy.sh`: Main deployment script
- `copy-files.sh`: Script to copy local files to EC2

### Deployment Steps
1. Set up an EC2 instance with Amazon Linux 2023
2. Configure SSH access with the alias "autogo"
3. Run the deployment scripts:
```bash
./copy-files.sh
ssh autogo "chmod +x deploy.sh && ./deploy.sh"
```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=/api
REACT_APP_UPLOADS_URL=/uploads
```

### Backend (.env)
```
DATABASE_URL=sqlite:///sql_app.db
SECRET_KEY=your-secret-key
```

## License

MIT License 