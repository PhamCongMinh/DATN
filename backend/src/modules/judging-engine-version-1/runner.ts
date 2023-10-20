import * as childProcess from 'child_process';
import * as fs from 'fs';
import { v4 } from 'uuid';
import { getTestCasesForLanguage } from './test-case';
import {
  javascriptCode2,
  javascriptCode3,
} from './solution-and-testcase/lenght-of-last-word/javascript';
import { cppCode3 } from './solution-and-testcase/lenght-of-last-word/c++';
import { cppCode } from './solution-and-testcase/sum-two-numbers/c++';
import { javascriptCode } from './solution-and-testcase/sum-two-numbers/javascript';
import readline from 'readline';

export const evaluateCode = async (language: string, code: string) => {
  let totalScore = 0;
  const fileName = v4();
  const testCases = getTestCasesForLanguage();

  createCodeFile(language, fileName, code);

  // Compile code
  try {
    await compileCode(language, fileName);
  } catch (error) {
    console.error('Error in code compilation');
    fs.unlinkSync(`${fileName}.cpp`);
    return totalScore;
  }

  // Execute code with test cases
  await Promise.all(
    testCases.map(async (testCase) => {
      try {
        const result = await executeCode(language, fileName, testCase.input);
        if (result === testCase.expectedOutput) {
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

  removeCodeFile(language, fileName);
  return totalScore;
};

const createCodeFile = (language: string, fileName: string, code: string) => {
  if (language === 'c++') {
    fs.writeFileSync(`${fileName}.cpp`, code);
  } else if (language === 'javascript') {
    fs.writeFileSync(`${fileName}.js`, code);
  }
};

const removeCodeFile = (language: string, fileName: string) => {
  if (language === 'c++') {
    // Remove the temporary files
    fs.unlinkSync(`${fileName}.cpp`);
    fs.unlinkSync(`${fileName}`);
  } else if (language === 'javascript') {
    fs.unlinkSync(`${fileName}.js`);
  }
};

const compileCode = async (language: string, fileName: string) => {
  if (language === 'c++') {
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

const executeCode = async (
  language: string,
  fileName: string,
  input: any,
): Promise<any> => {
  let result = '';

  // Execute the code submission based on the language
  // Use child_process to execute code
  // Capture the result and return it
  if (language === 'c++') {
    result = await createChildProcessToExecuteCode(`./${fileName}`, input);
  } else if (language === 'javascript') {
    result = await createChildProcessToExecuteCode(
      `node ${fileName}.js`,
      input,
      // JSON.stringify(input),
      // input.replace(/\n|\r/g, ' '),
    );
  }
  return result;
};

const createChildProcessToExecuteCode = async (
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

evaluateCode('javascript', javascriptCode3).then((score) => console.log(score));
