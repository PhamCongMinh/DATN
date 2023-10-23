import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { v4 } from 'uuid';
import { ESubmissionLanguage } from '@constants/submission.constant';

class JuggingEngineService {
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {}
  private logger = this.loggerService.getLogger('JuggingEngineService');

  evaluateSubmissionWithTestCase = async (
    language: string,
    code: string,
    testCases: any[],
  ) => {
    let totalScore = 0;
    const fileName = v4();

    this.createCodeFile(language, fileName, code);

    // Compile code
    try {
      await this.compileCode(language, fileName);
    } catch (error) {
      console.error('Error in code compilation');
      fs.unlinkSync(`${fileName}.cpp`);
      return totalScore;
    }

    // Execute code with test cases
    await Promise.all(
      testCases.map(async (testCase) => {
        try {
          const result = await this.executeCode(
            language,
            fileName,
            testCase.input,
          );
          if (result === testCase.output) {
            totalScore++;
            console.log(
              `Testcase passed with input: ${testCase.input} and output: ${testCase.expectedOutput}. Total passed testcase : ${totalScore}`,
            );
          } else {
            console.log(
              `Testcase failed with input: ${testCase.input} and expected output: ${testCase.expectedOutput}. Actual output: ${result}`,
            );
          }
        } catch (error) {
          console.error(
            `Error when execute code with testcase 's input: ${testCase.input}. Error is: ${error}`,
          );
        }
      }),
    );

    this.removeCodeFile(language, fileName);
    return totalScore;
  };

  createCodeFile = (language: string, fileName: string, code: string) => {
    if (language === ESubmissionLanguage.C_PLUS) {
      fs.writeFileSync(`${fileName}.cpp`, code);
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      fs.writeFileSync(`${fileName}.js`, code);
    }
  };

  removeCodeFile = (language: string, fileName: string) => {
    if (language === ESubmissionLanguage.C_PLUS) {
      // Remove the temporary files
      fs.unlinkSync(`${fileName}.cpp`);
      fs.unlinkSync(`${fileName}`);
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      fs.unlinkSync(`${fileName}.js`);
    }
  };

  compileCode = async (language: string, fileName: string) => {
    if (language === ESubmissionLanguage.C_PLUS) {
      await new Promise((resolve, reject) => {
        childProcess.exec(
          `g++ -o ${fileName} ${fileName}.cpp`,
          {
            timeout: 10000,
          },
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Compilation error: ${error.message}`);
              reject(error);
            }
            resolve(stdout);
          },
        );
      });
    }
  };

  executeCode = async (
    language: string,
    fileName: string,
    input: any,
  ): Promise<any> => {
    let result = '';

    // Execute the code submission based on the language
    // Use child_process to execute code
    // Capture the result and return it
    if (language === ESubmissionLanguage.C_PLUS) {
      result = await this.createChildProcessToExecuteCode(
        `./${fileName}`,
        input,
      );
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      result = await this.createChildProcessToExecuteCode(
        `node ${fileName}.js`,
        input,
        // JSON.stringify(input),
        // input.replace(/\n|\r/g, ' '),
      );
    }
    return result;
  };

  createChildProcessToExecuteCode = async (
    command: string,
    inputString: any,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const result = childProcess.spawn(command, {
        timeout: 5000,
        shell: true,
      });

      const buffer = Buffer.from(inputString);
      result.stdin.write(buffer, 'ascii');
      result.stdin.end();

      const bufferArray = [];
      result.stdout.on('data', (data) => {
        bufferArray.push(data);
      });

      result.stderr.on('data', (data) => {
        console.error(`Compilation error: ${data.toString()}`);
        reject(data);
      });

      result.on('close', (code) => {
        if (code === 0) {
          const dataBuffer = Buffer.concat(bufferArray).toString();
          // const dataBuffer = JSON.parse(Buffer.concat(bufferArray).toString());
          console.log(`Result: ${dataBuffer}`);
          resolve(dataBuffer);
        } else {
          reject();
        }
      });
    });
  };
}
