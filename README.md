# AuroApp - E-commerce Platform

A scalable e-commerce platform built with React and FastAPI.

## Project Structure

```
.
├── backend/                # Python FastAPI backend
│   ├── app/               # Application code
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── utils/        # Utility functions
│   └── tests/            # Backend tests
└── frontend/             # React frontend
    ├── public/           # Static files
    └── src/              # Source code
        ├── components/   # React components
        ├── pages/        # Page components
        └── styles/       # CSS styles
```

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Development

- Backend API documentation is available at `http://localhost:8000/docs`
- The project uses SQLite for development but is designed to be easily migrated to Amazon RDS
- TypeScript is used for type safety in the frontend
- FastAPI provides automatic OpenAPI documentation

## Deployment

The application is designed to be deployed on AWS EC2 Linux 2023 instance. Deployment instructions will be added in future updates. 