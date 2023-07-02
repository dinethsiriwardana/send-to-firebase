import * as vscode from "vscode";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import * as fs from "fs";
import * as path from "path";

let app: any;
let timer: NodeJS.Timeout | null = null;
const TIMEOUT_DURATION = 60 * 3 * 1000; // 3 minutes in milliseconds

// Global Firebase configuration

let firebaseConfig: any = null;

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "vs-code-ectension-for-firebase" is now active!'
  );

  let openConfigFileDisposable = vscode.commands.registerCommand(
    "send-to-firebase.openConfigFile",
    () => {
      const configPath = path.join(
        context.extensionPath,
        "firebase-config.json"
      );
      vscode.workspace.openTextDocument(configPath).then((document) => {
        vscode.window.showTextDocument(document);
      });
    }
  );

  let reloadAppDisposable = vscode.commands.registerCommand(
    "send-to-firebase.reloadApp",
    () => {
      console.log("Reloading the app...");
      vscode.window.showWarningMessage("Reloading the app...");

      // Perform any necessary cleanup or reset operations here

      // Load Firebase config if the config file exists
      if (fs.existsSync(configPath)) {
        loadFirebaseConfig(configPath);
      } else {
        vscode.window.showWarningMessage(
          "Firebase configuration file not found"
        );
      }
    }
  );

  context.subscriptions.push(openConfigFileDisposable, reloadAppDisposable);
  vscode.workspace.onDidOpenTextDocument(handleDocumentEventOpen);
  vscode.workspace.onDidChangeTextDocument(handleDocumentEventChange);

  const configPath = path.join(context.extensionPath, "firebase-config.json");
  checkFirebaseConfigFile(configPath);

  const watcher = vscode.workspace.createFileSystemWatcher(configPath);

  watcher.onDidChange(() => {
    console.log("Firebase config file changed. Reloading the app...");
    vscode.window.showWarningMessage(
      "Firebase config file changed. Reloading the app..."
    );
    loadFirebaseConfig(configPath);
    // You can call any necessary functions or perform actions after the config file is changed.
  });

  // Load Firebase config if the config file exists
  if (fs.existsSync(configPath)) {
    loadFirebaseConfig(configPath);
  } else {
    vscode.window.showWarningMessage("Firebase configuration file not found");
  }
}

function checkFirebaseConfigFile(configPath: string) {
  if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
  } else if (!fs.existsSync(configPath)) {
    vscode.window
      .showInformationMessage(
        "Do you want to create a new Firebase configuration file?",
        "Yes",
        "No"
      )
      .then((choice) => {
        if (choice === "Yes") {
          const configTemplate = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            databaseURL: "YOUR_DATABASE_URL",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
          };

          fs.writeFileSync(configPath, JSON.stringify(configTemplate, null, 2));

          vscode.workspace.openTextDocument(configPath).then((document) => {
            vscode.window.showTextDocument(document);
          });
          vscode.window.showWarningMessage(
            "Run `Send to Firebase: Reload App` to Reload after configuring Firebase (F1 -> Send to Firebase: Reload App)"
          );
        }
      });
  }
}

function loadFirebaseConfig(configPath: string) {
  const configContent = fs.readFileSync(configPath, "utf8");
  try {
    const config = JSON.parse(configContent);
    app = initializeApp(config);
    firebaseConfig = config;
    console.log("Firebase app initialized with the updated configuration");
  } catch (error) {
    vscode.window.showErrorMessage("Invalid Firebase configuration");
  }
}

function handleDocumentEventOpen(event: vscode.TextDocument) {
  const db = getDatabase(app);
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    try {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(event.uri);
      const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";
      sendToFirebase(projectName, 1, "");

      clearTimer();
      startTimer(db);
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error handling document open event: ${error}`
      );
      console.error("Error handling document open event:", error);
    }
  }
}

function handleDocumentEventChange(event: vscode.TextDocumentChangeEvent) {
  const db = getDatabase(app);
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    try {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(
        event.document.uri
      );
      const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";

      const language = event.document.languageId;

      console.log(language);

      sendToFirebase(projectName, 1, language);

      clearTimer();
      startTimer(db);
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error handling document change event: ${error}`
      );
      console.error("Error handling document change event:", error);
    }
  }
}

function sendToFirebase(projectName: string, stts: number, language: string) {
  const db = getDatabase(app);
  const currentTime = getCurrentTime();
  try {
    set(ref(db, "vscode_data/"), {
      projectName: projectName,
      language: language,
      stts: stts,
      time: currentTime,
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
    console.error("Error sending data to Firebase:", error);
  }
}

function startTimer(db: any) {
  timer = setTimeout(() => {
    console.log("Timer expired. Sending filename as 0");
    try {
      sendToFirebase("", 0, "");
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error sending data to Firebase: ${error}`
      );
      console.error("Error sending data to Firebase:", error);
    }
  }, TIMEOUT_DURATION);
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function getCurrentTime(): string {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function deactivate() {
  clearTimer();
  const db = getDatabase(app);

  try {
    sendToFirebase("", 0, "");
  } catch (error) {
    vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
    console.error("Error sending data to Firebase:", error);
  }
}
