from fastapi import APIRouter, UploadFile, File, Request
from pathlib import Path
import shutil
import os

router = APIRouter()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/")
async def upload_file(file: UploadFile = File(...), request: Request = None):
    # Generate a unique filename to prevent conflicts
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{os.urandom(16).hex()}{file_extension}"
    
    # Create the file path
    file_path = UPLOAD_DIR / unique_filename
    
    # Save the file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get the base URL from the request
    base_url = str(request.base_url).rstrip('/')
    
    # Return the complete URL that can be used to access the file
    return {"url": f"{base_url}/uploads/{unique_filename}"} 