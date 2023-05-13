from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from werkzeug.utils import secure_filename
app = FastAPI()
import boto3

s3 = boto3.client('s3',
                    
                    
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

@app.get("/hello")
async def hello(name:str,age:int):
   return {"name": name, "age":age}


class Student(BaseModel):
   id: int
   name :str = Field(None, title="name of student", max_length=10)
   subjects: List[str] = []
   
   
@app.post("/students/")
async def student_data(s1: Student):
   return s1


res = s3.list_buckets()
print(res)
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file:
        print(file.filename)
        s3.upload_fileobj(file.file, BUCKET_NAME, file.filename)
        return "file uploaded"
    else:
        return "error in uploading."
