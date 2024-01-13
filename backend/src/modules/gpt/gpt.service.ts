import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import QuestionChoiceRepository from '@models/repositories/QuestionChoice.repository';
import { ChatCompletionMessageParam } from 'openai/resources';
import { encodingForModel, TiktokenModel } from 'js-tiktoken';
import OpenAI from 'openai';
import * as process from 'process';
import {
  MAX_TOKENS_CHAT_GPT,
  MAX_TOKENS_RESPONSE_CHAT_GPT,
  modelArray,
} from '@constants/gpt.constant';
import { ImportQuestionDto } from '@modules/gpt/dto/import-question.dto';
import { BadRequestException } from '@shared/exception';
// import { pdf2pic } from 'pdf2pic';

@Injectable()
export class GptService {
  private openai: OpenAI;
  constructor(
    private questionRepository: QuestionRepository,
    private loggerService: LoggerService,
    private testcaseRepository: TestcaseRepository,
    private questionChoiceRepository: QuestionChoiceRepository,
  ) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  }
  private logger = this.loggerService.getLogger('GptService');

  // async importQuestionWithAI(dto: ImportQuestionDto) {
  //   this.logger.info('Start get text data from image');
  //   const textData = await this.getTextDataFromImage(dto);
  //   this.logger.info('Start convert text to question');
  //   const questions = await this.convertTextToQuestion(textData);
  //   this.logger.info(
  //     'End convert text to question, the questions is: ',
  //     questions,
  //   );
  //   return questions;
  // }

  // async getTextDataFromImage(dto: ImportQuestionDto) {
  //   const systemContent = `You will support retrieving question information from image or pdf files and returning a list of questions and their answers.`;
  //
  //   const messages: ChatCompletionMessageParam[] = [
  //     {
  //       role: 'system',
  //       content: systemContent,
  //     },
  //     {
  //       role: 'user',
  //       content: [
  //         { type: 'text', text: 'Get list questions in this file' },
  //         {
  //           type: 'image_url',
  //           image_url: {
  //             url: dto.asset_url,
  //             detail: 'high',
  //           },
  //         },
  //       ],
  //     },
  //   ];
  //
  //   const encoding = encodingForModel(modelArray[0]);
  //
  //   const num_tokens = encoding.encode(messages[0].content.toString()).length;
  //   this.logger.info('num_tokens', num_tokens);
  //   const available_tokens = MAX_TOKENS_CHAT_GPT - Number(num_tokens);
  //   const max_response_tokens =
  //     available_tokens > MAX_TOKENS_RESPONSE_CHAT_GPT
  //       ? MAX_TOKENS_RESPONSE_CHAT_GPT
  //       : available_tokens - 100;
  //
  //   const response = await this.openai.chat.completions
  //     .create({
  //       model: modelArray[0],
  //       messages: messages,
  //       max_tokens: max_response_tokens,
  //       temperature: 0.2,
  //     })
  //     .asResponse();
  //
  //   const jsonData = await response.json();
  //   const message = jsonData.choices[0].message;
  //
  //   if (message == `{"message" : "No question found !"}`)
  //     throw new Error('Question not found');
  //
  //   return message.content;
  // }

  // async convertTextToQuestion(text: string) {
  //   this.logger.info('End get text data from image, the text data is: ', text);
  //   const systemContent =
  //     `You will support retrieving question information from the text data and returning a list of questions and their answers.` +
  //     `The answer is in this format: [item, item,...,item]. and type of object item is {question: string, answers: string[]}.` +
  //     `No further explanation in the answer.` +
  //     `If there is no data or found , answer : "{"message" : "No question found !"}".` +
  //     `You are a machine that only returns and replies with valid, iterable RFC8259 compliant JSON in your responses with codeblock json.`;
  //
  //   const messages: ChatCompletionMessageParam[] = [
  //     {
  //       role: 'system',
  //       content: systemContent,
  //     },
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: `Get list questions in this text data: ${text}`,
  //         },
  //       ],
  //     },
  //   ];
  //
  //   const encoding = encodingForModel(modelArray[0]);
  //
  //   const num_tokens = encoding.encode(messages[0].content.toString()).length;
  //   this.logger.info('num_tokens', num_tokens);
  //   const available_tokens = MAX_TOKENS_CHAT_GPT - Number(num_tokens);
  //   const max_response_tokens =
  //     available_tokens > MAX_TOKENS_RESPONSE_CHAT_GPT
  //       ? MAX_TOKENS_RESPONSE_CHAT_GPT
  //       : available_tokens - 100;
  //
  //   const response = await this.openai.chat.completions
  //     .create({
  //       model: 'gpt-4-1106-preview',
  //       messages: messages,
  //       max_tokens: max_response_tokens,
  //       temperature: 0.8,
  //     })
  //     .asResponse();
  //
  //   const jsonData = await response.json();
  //   const message = jsonData.choices[0].message;
  //
  //   if (message == `{"message" : "No question found !"}`)
  //     throw new Error('Question not found');
  //
  //   const formatData = message.content.split('```json')[1].split('```')[0];
  //   console.log(formatData);
  //
  //   return JSON.parse(formatData);
  // }

  async getQuestionInFileWithAI(dto: ImportQuestionDto) {
    const isPDF = await this.isPDF(dto.asset_url);
    const isImage = await this.isImage(dto.asset_url);

    if (isImage) {
      return this.getQuestionInImageWithAI(dto);
    }

    if (isPDF) {
      return 'Not support pdf yet';
      // return this.getQuestionInPDFWithAI(dto);
    }

    throw new BadRequestException({
      message: 'File type is not supported',
    });
  }

  async isPDF(fileUrl) {
    // Check file extension
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (fileExtension === 'pdf') {
      return true;
    }
  }

  async isImage(fileUrl) {
    // Check file extension
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (
      fileExtension === 'jpg' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'png'
    ) {
      return true;
    }
  }

  async getQuestionInImageWithAI(dto: ImportQuestionDto) {
    const systemContent =
      `You will support retrieving question information from image or pdf files and returning a list of questions and their answers.` +
      `The answer is in this format: [item, item,...,item]. and type of object item is {question: string, answers: string[]}.` +
      `No further explanation in the answer.` +
      `If there is no data or found , answer : "{"message" : "No question found !"}".` +
      `You are a machine that only returns and replies with valid, iterable RFC8259 compliant JSON in your responses with codeblock json.`;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Get list questions in this image' },
          {
            type: 'image_url',
            image_url: {
              url: dto.asset_url,
              detail: 'high',
            },
          },
        ],
      },
    ];

    const result = await this.searchWithRetry(messages, modelArray[0]);
    return result;
  }

  async searchWithRetry(
    messages: ChatCompletionMessageParam[],
    model: TiktokenModel,
    currentRetry = 0,
  ) {
    this.logger.info('use model', model);
    try {
      const encoding = encodingForModel(modelArray[0]);

      const num_tokens = encoding.encode(messages[0].content.toString()).length;
      this.logger.info('num_tokens', num_tokens);
      const available_tokens = MAX_TOKENS_CHAT_GPT - Number(num_tokens);
      const max_response_tokens =
        available_tokens > MAX_TOKENS_RESPONSE_CHAT_GPT
          ? MAX_TOKENS_RESPONSE_CHAT_GPT
          : available_tokens - 100;

      const response = await this.openai.chat.completions
        .create({
          model: modelArray[0],
          messages: messages,
          max_tokens: max_response_tokens,
          temperature: 0.2,
        })
        .asResponse();

      const jsonData = await response.json();
      const message = jsonData.choices[0].message;

      const formatData = message.content.split('```json')[1].split('```')[0];
      console.log(formatData);

      if (formatData == '\n{\n  "message": "No question found !"\n}\n')
        throw new BadRequestException({ message: 'Question not found' });

      return JSON.parse(formatData);
    } catch (e) {
      this.logger.info(`Error on attempt ${currentRetry + 1}: ${e.message}`);

      if (currentRetry < 2) {
        currentRetry++;
        this.logger.info(
          `Retrying with a new attempt (${currentRetry + 1})...`,
        );
        return this.searchWithRetry(messages, modelArray[0], currentRetry);
      } else {
        throw new BadRequestException({ message: 'Question not found' });
      }
    }
  }

  // private async convertPdfToImages(pdfPath: string) {
  //   const converter = new pdf2pic({
  //     quality: 300, // Output quality of images
  //     saveInSameFolder: true, // Save the images in the same folder as the PDF
  //     outDir: 'uploads', // Output directory for images
  //     dpi: 600, // DPI (dots per inch) for images
  //   });
  //
  //   const images = await converter.convertBulk(pdfPath, -1); // -1 to convert all pages
  //
  //   return images;
  // }
}
