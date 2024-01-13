// export const javascriptCode = `
// function processData(input) {
//    const [a, b] = input;
//    return a+b;
// }
//
// const inputBuffer = [];
// let input;
// process.stdin.on('data', function (input) {
//    inputBuffer.push(input);
// });
//
// process.stdin.on('end', function () {
//  // input = JSON.parse(Buffer.concat(inputBuffer).toString());
//   input = Buffer.concat(inputBuffer).toString().split('\\n');
//     console.log(input);
//   // process.stdout.write(JSON.stringify(processData(input)));
// });
// `;
//
// export const testJS = `
// function processData(a, b) {
// console.log(process.argv[2], process.argv[3]);
//   return a + b;
// }
//
// console.log(processData(Number(process.argv[2]), Number(process.argv[3])));
// `;

export const javascriptCode = `
const readline = require('readline');
function processData(a, b) {
  return a + b;
}

const inputLine = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  inputLine.push(line);
});

// Close the readline interface when you're done
rl.on('close', () => {
  console.log(processData(Number(inputLine[0]), Number(inputLine[1])));
  process.exit(0);
});

`;
