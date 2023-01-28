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

## Requirement

npm
serverless offline
nodeJs

### Invocation

After successful clone project, you run:

```bash
npm i
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
