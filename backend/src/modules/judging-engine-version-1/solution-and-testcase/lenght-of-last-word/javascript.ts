export const javascriptCode2 = `
var lengthOfLastWord = function (s) {
  const words = s.trim().split(" ");
  return words.length > 0 ? words[words.length - 1].length : 0;
};

const inputBuffer = [];
let input;
process.stdin.on('data', function (input) {
   inputBuffer.push(input);
});

process.stdin.on('end', function () {
  input = JSON.parse(Buffer.concat(inputBuffer).toString());
  process.stdout.write(JSON.stringify(lengthOfLastWord(input)));
});
`;
