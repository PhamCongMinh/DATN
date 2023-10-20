export const javascriptCode2 = `
const readline = require('readline');
var lengthOfLastWord = function (s) {
  const words = s.trim().split(" ");
  return words.length > 0 ? words[words.length - 1].length : 0;
};
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
  console.log(lengthOfLastWord(inputLine[0]));
  process.exit(0);
});

`;

export const javascriptCode3 = `const readline = require('readline');\nvar lengthOfLastWord = function (s) {\n const words = s.trim().split(" ");\n return words.length > 0 ? words[words.length - 1].length : 0;\n};\nconst inputLine = [];\n\nconst rl = readline.createInterface({\n input: process.stdin,\n output: process.stdout,\n});\n\nrl.on('line', (line) => {\n inputLine.push(line);\n});\n\n// Close the readline interface when you're done\nrl.on('close', () => {\n console.log(lengthOfLastWord(inputLine[0]));\n process.exit(0);\n});`;
