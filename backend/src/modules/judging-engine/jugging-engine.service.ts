import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { v4 } from 'uuid';
import { ESubmissionLanguage } from '@constants/submission.constant';
import Dockerode from 'dockerode';
import stream from 'stream';
import path from 'path';

const docker = new Dockerode();
const hostFolderPath =
  '/home/sotatek/Projects/Hust/DATN/backend/src/modules/judging-engine';

@Injectable()
export class JuggingEngineService {
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
      const filePath = path.join(hostFolderPath, `${fileName}.cpp`);
      fs.writeFileSync(filePath, code);
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      fs.writeFileSync(`${fileName}.js`, code);
    }
  };

  removeCodeFile = (language: string, fileName: string) => {
    if (language === ESubmissionLanguage.C_PLUS) {
      // Remove the temporary files
      const filePath = path.join(hostFolderPath, `${fileName}`);
      fs.unlinkSync(`${filePath}.cpp`);
      fs.unlinkSync(`${filePath}`);
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      fs.unlinkSync(`${fileName}.js`);
    }
  };

  compileCode = async (language: string, fileName: string) => {
    if (language === ESubmissionLanguage.C_PLUS) {
      const filePath = path.join(hostFolderPath, `${fileName}`);
      await new Promise((resolve, reject) => {
        childProcess.exec(
          `g++ -o ${filePath} ${filePath}.cpp`,
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
      result = await this.createDockerContainerToRunCode(
        `./${fileName}`,
        input,
      );
    } else if (language === ESubmissionLanguage.JAVASCRIPT) {
      result = await this.createDockerContainerToRunCode(
        `node ${fileName}.js`,
        input,
        // JSON.stringify(input),
        // input.replace(/\n|\r/g, ' '),
      );
    }
    return result;
  };

  createDockerContainerToRunCode = async (
    command: string,
    inputString: any,
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const container: Dockerode.Container = await docker.createContainer({
          Image: 'gcc',
          OpenStdin: true,
          AttachStdin: false,
          AttachStdout: true,
          AttachStderr: true,
          Tty: true,
          Cmd: ['/bin/bash'],
          HostConfig: {
            Binds: [`${hostFolderPath}:/code`],
          },
          WorkingDir: '/code',
        });

        await container.start();
        console.log('Created container');

        const result = await this.executeCodeInContainer(
          command,
          container,
          inputString,
        );

        await container.remove({ force: true });
        console.log('Removed container');

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  executeCodeInContainer = async (
    command: string,
    container: Dockerode.Container,
    inputString: string,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const executeExec = await container.exec({
          AttachStdin: true,
          AttachStdout: true,
          AttachStderr: true,
          WorkingDir: '/code',
          Cmd: [command],
        });

        const resultStream = new stream.PassThrough();
        const bufferResultArray = [];

        resultStream.on('data', function (data) {
          bufferResultArray.push(data);
        });

        resultStream.on('end', function () {
          const dataBuffer = Buffer.concat(bufferResultArray).toString();
          resolve(dataBuffer);
        });

        const errorStream = new stream.PassThrough();

        executeExec.start(
          {
            stdin: true,
            hijack: true,
            Detach: false,
          },
          function (error, stream) {
            stream.write(inputString, 'ascii');
            stream.end();

            docker.modem.demuxStream(stream, resultStream, errorStream);
            stream.on('end', function () {
              resultStream.end();
            });
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  };
}
