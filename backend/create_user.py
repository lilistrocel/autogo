from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.user import User

def create_default_user():
    db = SessionLocal()
    try:
        # Check if user already exists
        user = db.query(User).filter(User.email == "admin@example.com").first()
        if not user:
            user = User(
                email="admin@example.com",
                hashed_password="admin",  # In production, this should be properly hashed
                is_active=True,
                is_superuser=True,
                full_name="Admin User"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print("Default user created successfully!")
        else:
            print("Default user already exists!")
    finally:
        db.close()

if __name__ == "__main__":
    create_default_user() 