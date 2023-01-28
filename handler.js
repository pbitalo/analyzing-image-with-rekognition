"use strict";

const {
  promises: { readFile },
} = require("fs");

class Handler {
  constructor({ reko, translator }) {
    this.reko = reko;
    this.translator = translator;
  }
  async detectLabels(buffer) {
    const result = await this.reko
      .detectLabels({
        Image: {
          Bytes: buffer,
        },
      })
      .promise();
    const names = result.Labels.filter(({ Confidence }) => Confidence > 70)
      .map(({ Name }) => Name)
      .join(" and ");
    return await this.translateText(names);
  }

  async translateText(text) {
    const { TranslatedText } = await this.translator
      .translateText(this.getTranslateParams(text))
      .promise();
    return TranslatedText.split(" and ");
  }

  async detectText(buffer) {
    const resultText = await this.reko
      .detectText({
        Image: {
          Bytes: buffer,
        },
      })
      .promise();

    const result = resultText.TextDetections.filter(
      ({ Confidence }) => Confidence > 50
    )
      .map(({ DetectedText }) => DetectedText)
      .join(" ; ");
    return result;
  }

  async main() {
    try {
      const buffer = await readFile("./imgs/cat2.jpeg");
      const [labels, getText] = await Promise.all([
        this.detectLabels(buffer),
        this.detectText(buffer),
      ]);
      return this.successResponse(labels, getText);
    } catch (error) {
      console.log("Error: ", error.stack);
      return this.errorResponse();
    }
  }

  getTranslateParams(text) {
    return {
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: text,
    };
  }

  successResponse(labels, getText) {
    return {
      statusCode: 200,
      body: {
        oQueE: labels,
        textoExtraido: getText,
      },
    };
  }

  errorResponse() {
    return {
      statusCode: 500,
      body: "Internal server error!",
    };
  }
}

const aws = require("aws-sdk");
const translator = new aws.Translate();
const reko = new aws.Rekognition();
const handler = new Handler({
  reko,
  translator,
});

module.exports.main = handler.main.bind(handler);
