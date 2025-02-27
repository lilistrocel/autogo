# AuroApp E-commerce Platform

A scalable e-commerce platform built with React and Python, designed to support multiple vendors, inventory management, and logistics.

## Project Structure
```
AuroApp/
├── frontend/          # React frontend application
└── backend/          # Python FastAPI backend
```

## Technology Stack

### Frontend
- React
- TypeScript
- Material-UI (for UI components)
- React Router (for routing)
- Axios (for API calls)

### Backend
- Python 3.8+
- FastAPI (REST API framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- Alembic (Database migrations)

### Development Tools
- Git (Version Control)
- Docker (Containerization)
- Poetry (Python dependency management)
- npm (Node.js package management)

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
5. Run migrations:
   ```bash
   alembic upgrade head
   ```
6. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment
The application is designed to be deployed on AWS EC2 Linux 2023 instance.
Detailed deployment instructions will be added as the project progresses.

## Features (Planned)
- [ ] User Authentication
- [ ] Product Catalog
- [ ] Shopping Cart
- [ ] Order Management
- [ ] Vendor Management
- [ ] Inventory Management
- [ ] Payment Processing
- [ ] Logistics Integration

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License
This project is private and confidential. 