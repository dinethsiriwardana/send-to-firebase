"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const fs = require("fs");
const path = require("path");
let app;
let timer = null;
const TIMEOUT_DURATION = 60 * 3 * 1000; // 3 minutes in milliseconds
// Global Firebase configuration
let firebaseConfig = null;
function activate(context) {
    console.log('Congratulations, your extension "vs-code-ectension-for-firebase" is now active!');
    let disposable = vscode.commands.registerCommand("vs-code-ectension-for-firebase.helloWorld", () => {
        vscode.window.showInformationMessage("Hello World from VS code Extension for Firebase!");
    });
    let openConfigFileDisposable = vscode.commands.registerCommand("send-to-firebase.openConfigFile", () => {
        const configPath = path.join(context.extensionPath, "firebase-config.json");
        vscode.workspace.openTextDocument(configPath).then((document) => {
            vscode.window.showTextDocument(document);
        });
    });
    context.subscriptions.push(disposable, openConfigFileDisposable);
    vscode.workspace.onDidOpenTextDocument(handleDocumentEventOpen);
    vscode.workspace.onDidChangeTextDocument(handleDocumentEventChange);
    const configPath = path.join(context.extensionPath, "firebase-config.json");
    checkFirebaseConfigFile(configPath);
    const watcher = vscode.workspace.createFileSystemWatcher(configPath);
    watcher.onDidChange(() => {
        loadFirebaseConfig(configPath);
    });
    // Load Firebase config if the config file exists
    if (fs.existsSync(configPath)) {
        loadFirebaseConfig(configPath);
    }
    else {
        vscode.window.showWarningMessage("Firebase configuration file not found");
    }
}
exports.activate = activate;
function checkFirebaseConfigFile(configPath) {
    if (firebaseConfig) {
        app = (0, app_1.initializeApp)(firebaseConfig);
    }
    else if (!fs.existsSync(configPath)) {
        vscode.window
            .showInformationMessage("Do you want to create a new Firebase configuration file?", "Yes", "No")
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
            }
        });
    }
}
function loadFirebaseConfig(configPath) {
    const configContent = fs.readFileSync(configPath, "utf8");
    try {
        const config = JSON.parse(configContent);
        app = (0, app_1.initializeApp)(config);
        firebaseConfig = config;
        console.log("Firebase app initialized with the updated configuration");
    }
    catch (error) {
        vscode.window.showErrorMessage("Invalid Firebase configuration");
    }
}
function handleDocumentEventOpen(event) {
    const db = (0, database_1.getDatabase)(app);
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        try {
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(event.uri);
            const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";
            sendToFirebase(projectName, 1, "");
            clearTimer();
            startTimer(db);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error handling document open event: ${error}`);
            console.error("Error handling document open event:", error);
        }
    }
}
function handleDocumentEventChange(event) {
    const db = (0, database_1.getDatabase)(app);
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        try {
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(event.document.uri);
            const projectName = workspaceFolder ? workspaceFolder.name : "Unknown";
            const language = event.document.languageId;
            console.log(language);
            sendToFirebase(projectName, 1, language);
            clearTimer();
            startTimer(db);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error handling document change event: ${error}`);
            console.error("Error handling document change event:", error);
        }
    }
}
function sendToFirebase(projectName, stts, language) {
    const db = (0, database_1.getDatabase)(app);
    const currentTime = getCurrentTime();
    try {
        (0, database_1.set)((0, database_1.ref)(db, "vscode_data/"), {
            projectName: projectName,
            language: language,
            stts: stts,
            time: currentTime,
        });
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
        console.error("Error sending data to Firebase:", error);
    }
}
function startTimer(db) {
    timer = setTimeout(() => {
        console.log("Timer expired. Sending filename as 0");
        try {
            sendToFirebase("", 0, "");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
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
function getCurrentTime() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
function deactivate() {
    clearTimer();
    const db = (0, database_1.getDatabase)(app);
    try {
        sendToFirebase("", 0, "");
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error sending data to Firebase: ${error}`);
        console.error("Error sending data to Firebase:", error);
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map