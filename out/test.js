"use strict";
// import * as vscode from "vscode";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set } from "firebase/database";
// const firebaseConfig = {
//   apiKey: "AIzaSyCSl3y9KF8w8zR5wXB0Nqu2sN_0ZKgb8nw",
//   authDomain: "vscodee.firebaseapp.com",
//   databaseURL: "https://vscodee-default-rtdb.firebaseio.com",
//   projectId: "vscodee",
//   storageBucket: "vscodee.appspot.com",
//   messagingSenderId: "991692892077",
//   appId: "1:991692892077:web:0a990adbd72b525a42e324",
// };
// const app = initializeApp(firebaseConfig);
// let timer: NodeJS.Timeout | null = null;
// const TIMEOUT_DURATION = 60 * 3 * 1000; // 3 minutes in milliseconds
// export function activate(context: vscode.ExtensionContext) {
//   console.log(
//     'Congratulations, your extension "vs-code-ectension-for-firebase" is now active!'
//   );
//   let disposable = vscode.commands.registerCommand(
//     "vs-code-ectension-for-firebase.helloWorld",
//     () => {
//       vscode.window.showInformationMessage(
//         "Hello World from VS code Extension for Firebase!"
//       );
//     }
//   );
//   context.subscriptions.push(disposable);
//   vscode.workspace.onDidOpenTextDocument(handleDocumentEventOpen);
//   vscode.workspace.onDidChangeTextDocument(handleDocumentEventChange);
// }
// function handleDocumentEventOpen(event: vscode.TextDocument) {
//   const db = getDatabase(app);
//   const editor = vscode.window.activeTextEditor;
//   if (editor) {
//     try {
//       const workspaceFolder = vscode.workspace.getWorkspaceFolder(event.uri);
//       const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";
//       sendToFirebase(projectName, 1, "");
//       clearTimer();
//       startTimer(db);
//     } catch (error) {
//       vscode.window.showErrorMessage(
//         `Error handling document open event: ${error}`
//       );
//       console.error("Error handling document open event:", error);
//     }
//   }
// }
// function handleDocumentEventChange(event: vscode.TextDocumentChangeEvent) {
//   const db = getDatabase(app);
//   const editor = vscode.window.activeTextEditor;
//   if (editor) {
//     try {
//       const workspaceFolder = vscode.workspace.getWorkspaceFolder(
//         event.document.uri
//       );
//       const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";
//       const language = event.document.languageId;
//       console.log(language);
//       sendToFirebase(projectName, 1, language);
//       clearTimer();
//       startTimer(db);
//     } catch (error) {
//       vscode.window.showErrorMessage(
//         `Error handling document change event: ${error}`
//       );
//     }
//   }
// }
// function sendToFirebase(projectName: string, stts: number, language: string) {
//   const db = getDatabase(app);
//   const currentTime = getCurrentTime();
//   try {
//     set(ref(db, "vscode_data/"), {
//       projectName: projectName,
//       language: language,
//       stts: stts,
//       time: currentTime,
//     });
//   } catch (error) {
//     vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
//   }
// }
// function startTimer(db: any) {
//   timer = setTimeout(() => {
//     console.log("Timer expired. Sending filename as 0");
//     try {
//       sendToFirebase("", 0, "");
//     } catch (error) {
//       vscode.window.showErrorMessage(
//         `Error sending data to Firebase: ${error}`
//       );
//     }
//   }, TIMEOUT_DURATION);
// }
// function clearTimer() {
//   if (timer) {
//     clearTimeout(timer);
//     timer = null;
//   }
// }
// function getCurrentTime(): string {
//   const currentDate = new Date();
//   const hours = String(currentDate.getHours()).padStart(2, "0");
//   const minutes = String(currentDate.getMinutes()).padStart(2, "0");
//   const seconds = String(currentDate.getSeconds()).padStart(2, "0");
//   return `${hours}:${minutes}:${seconds}`;
// }
// export function deactivate() {
//   clearTimer();
//   const db = getDatabase(app);
//   try {
//     sendToFirebase("", 0, "");
//   } catch (error) {
//     vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
//   }
// }
//# sourceMappingURL=test.js.map