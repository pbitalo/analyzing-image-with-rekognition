<!--
title: 'Analyzing image with AWS Rekognition'
description: 'In this example, we are going to extract data from a document or identify an object.'
layout: Doc
framework: v3
platform: AWS
language: nodejs14
priority: 1
authorLink: 'https://github.com/pbitalo/analyzing-image-with-rekognition'
authorName: 'Ítalo Pereira de Brito'
-->

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
sls invoke -f img-analysis
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": {
    "oqueE": [],
    "textoExtraido": ""
  }
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
sls invoke local -f img-analysis
```

Which should result in response similar to the following:

```json
{
  "statusCode": 200,
  "body": {
    "oqueE": [],
    "textoExtraido": ""
  }
}
```
