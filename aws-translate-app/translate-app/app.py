from flask import render_template, Flask, request
import boto3
import json
account_id = "AKIAZ3L4IRM7FOM3A6H5"
account_key = "XPa7JiFxaKQ2jE3pLAT6x3mEHCnQV6/1OHFgQJMO"


def client():
    global account_id
    global account_key
    global account_token
    print(account_id, account_key)
    client = boto3.client("textract", aws_access_key_id=account_id,
                          aws_secret_access_key=account_key,
                          region_name='us-east-1')
    return client


app = Flask(__name__)


@ app.route("/", methods=["GET"])
def main():
    extractedText = ""
    responseJson = {

        "text": extractedText
    }
    return render_template("index.html", jsonData=json.dumps(responseJson))


@ app.route("/extracttext", methods=["POST"])
def extractImage():
    file = request.files.get("file_select")
    binaryFile = file.read()
    textractclient = client()
    response = textractclient.detect_document_text(
        Document={
            'Bytes': binaryFile
        }
    )
    extractedText = ""
    for block in response['Blocks']:
        if block["BlockType"] == "LINE":
            extractedText = extractedText+block["Text"]+" "
    responseJson = {

        "text": extractedText
    }
    print(responseJson)
    return render_template("index.html", jsonData=json.dumps(responseJson))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
