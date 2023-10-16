export const javascriptCode = `
function processData(input) {
   const [a, b] = input;
   return a+b;
}

const inputBuffer = [];
let input;
process.stdin.on('data', function (input) {
   inputBuffer.push(input);
});

process.stdin.on('end', function () {
 input = JSON.parse(Buffer.concat(inputBuffer).toString());
  process.stdout.write(JSON.stringify(processData(input)));
});
`;
