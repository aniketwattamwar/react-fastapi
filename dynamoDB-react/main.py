from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import boto3
import key_config as keys
import uuid

app = FastAPI()

dynamodb = boto3.resource('dynamodb',
                    aws_access_key_id = keys.ACCESS_KEY_ID,
                    aws_secret_access_key = keys.ACCESS_SECRET_KEY,
                    region_name='us-east-1'
                          )


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


@app.get("/getAllBooks")
def getall():
    table = dynamodb.Table('books')
    items = table.scan()
    print(items)
    return items

 
@app.post("/submitdata")
async def submitdata(data:dict):
    table = dynamodb.Table('books')
    
    item = {
       'bookID': str(uuid.uuid4()),
        'name': data['name'],
        'author': data['author']
    }
    table.put_item(Item = item)
    print(data)
    return "data submitted successfully"
    

