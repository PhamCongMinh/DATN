// import Dockerode from 'dockerode';
// import stream from 'stream';
//
// const docker = new Dockerode();
// let container: Dockerode.Container;
// const hostFolderPath =
//   '/home/sotatek/Projects/Hust/DATN/backend/src/modules/judging-engine-version-2';
//
// const runContainer = async () => {
//   console.log('start creating container ');
//
//   container = await docker.createContainer({
//     Image: 'gcc',
//     OpenStdin: true,
//     AttachStdin: false,
//     AttachStdout: true,
//     AttachStderr: true,
//     Tty: true,
//     Cmd: ['/bin/bash'],
//     HostConfig: {
//       Binds: [`${hostFolderPath}:/code`],
//     },
//     WorkingDir: '/code',
//   });
//
//   await container.start();
//   console.log('Created container');
//
//   await compileCode();
//   console.log('Compiled');
//
//   await container.changes();
//
//   const result = await executeCode();
//   console.log('Executed');
//   console.log(`Result: ${result}`);
// };
//
// const compileCode = async () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const compileExec = await container.exec({
//         AttachStdin: true,
//         AttachStdout: true,
//         AttachStderr: true,
//         WorkingDir: '/code',
//         Cmd: ['g++', '-o', 'test', 'test.cpp'],
//       });
//
//       await compileExec.start({
//         stdin: true,
//         hijack: true,
//         Detach: false,
//       });
//
//       resolve('Compiled code');
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
//
// const executeCode = async () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const executeExec = await container.exec({
//         AttachStdin: true,
//         AttachStdout: true,
//         AttachStderr: true,
//         WorkingDir: '/code',
//         Cmd: ['./test'],
//       });
//
//       const resultStream = new stream.PassThrough();
//       const bufferResultArray = [];
//
//       resultStream.on('data', function (data) {
//         bufferResultArray.push(data);
//       });
//
//       resultStream.on('end', function () {
//         const dataBuffer = Buffer.concat(bufferResultArray).toString();
//         resolve(dataBuffer);
//       });
//
//       const errorStream = new stream.PassThrough();
//
//       executeExec.start(
//         {
//           stdin: true,
//           hijack: true,
//           Detach: false,
//         },
//         function (error, stream) {
//           const inputString = '2\n2';
//           stream.write(inputString, 'ascii');
//           stream.end();
//
//           docker.modem.demuxStream(stream, resultStream, errorStream);
//           stream.on('end', function () {
//             resultStream.end();
//           });
//         },
//       );
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
//
// runContainer().then(() => {
//   return;
// });
