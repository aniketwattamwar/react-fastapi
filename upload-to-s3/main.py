from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
app = FastAPI()
import boto3
import key_config as keys

s3 = boto3.client('s3',
                    aws_access_key_id = keys.ACCESS_KEY_ID,
                    aws_secret_access_key = keys.ACCESS_SECRET_KEY,
                     )

BUCKET_NAME='fastapifiles'

# Set up CORS
origins = [
    "http://localhost:3000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"name": "aniket", "age":24}

@app.get("/getallfiles")
async def hello():
    
    res = s3.list_objects_v2(Bucket=BUCKET_NAME)
    print(res)
    return res

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file:
        print(file.filename)
        s3.upload_fileobj(file.file, BUCKET_NAME, file.filename)
        return "file uploaded"
    else:
        return "error in uploading."
