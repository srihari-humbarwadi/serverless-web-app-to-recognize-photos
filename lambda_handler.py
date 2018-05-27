import base64
import boto3
import urllib.request
import json
from botocore.client import Config

def lambda_handler(event, context):    
    ACCESS_KEY = ""
    SEC_ACCESS_KEY = ""
    BUCKET_NAME = "reko-images"
    
    body = event['body']
    encodedimg = body['img']
    image = "/tmp/tmp.jpg"
    bimage = bytes(encodedimg,'utf-8')
    with open(image,"wb") as im:
        im.write(base64.decodestring(bimage))
    data = open(image, "rb")
    s3 = boto3.resource(
        's3',
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SEC_ACCESS_KEY,
        config=Config(signature_version='s3v4')
    )
    s3.Bucket(BUCKET_NAME).put_object(Key="tmp.jpg", Body=data, ACL='public-read')
    client=boto3.client('rekognition','ap-northeast-1')
    response = client.detect_faces(Image={'S3Object':{'Bucket':BUCKET_NAME,'Name':'tmp.jpg'}},Attributes=['ALL'])
    return response['FaceDetails']