# VS Code Extension for Firebase

This extension allows you to send your project data to Firebase directly from Visual Studio Code.

## Features

- Send project data to Firebase
- Track project name, language, and status
- Automatic timer to update Firebase data
- Firebase configuration file management

## Requirements

Before using this extension, make sure you have the following prerequisites:

- Visual Studio Code version 1.79.0 or higher
- Firebase account and project

## Installation


https://github.com/dinethsiriwardana/send-to-firebase/assets/88492493/3d8b433e-0faf-418b-a023-88c0a7ee8aad


1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing `Ctrl+Shift+X`.
3. Search for "VS Code Extension for Firebase" and click **Install**.
4. After installation, click **YES** to `Do you want to create a new Firebase configuration file?` dialog box to configure the Firebase extension.
   


## Firebase Account Setup


https://github.com/dinethsiriwardana/send-to-firebase/assets/88492493/99f5ee94-19b7-4199-93b7-ca007cacfd13


1. Open your web browser and go to [Firebase Console](https://console.firebase.google.com/).
2. Log in with your Google account or create a new account if needed.
3. Click on the "Add Project" button to create a new project.

## Create a Firebase Project

1. Fill in the project name and other required information.
2. Click on the "Continue" button and follow the on-screen instructions to set up your project.
3. Once the project is created, click on the "Continue" button to proceed to the project dashboard.

## Enable Real-Time Database

1. In the Firebase console, navigate to the "Database" section from the left sidebar.
2. Click on the "Create Database" button.
3. Choose "Start in test mode" for easy setup and click on "Next."
4. Select a location for your database and click on "Done."
5. Your Real-Time Database is now created and ready to use.



## Extension Settings

The extension contributes the following settings:

- `Send to Firebase: Open Config File`: Edit the firebase file.
- `Send to FIrebase: Reload App`: Edit the firebase file.

## Usage

1. Open a project folder in Visual Studio Code.
2. The extension will automatically track the project name and the programming language of the active file.
3. Firebase data will be sent to the configured Firebase database.
4. You can open the Firebase configuration file by running the **Send to Firebase: Open Config File** command from the Command Palette.

## Known Issues

- None at the moment. Please report any issues on the [GitHub repository](https://github.com/dinethsiriwardana/send-to-firebase).

## Release Notes

### 0.0.0

- Initial release of the VS Code Extension for Firebase.

### 0.0.1

- Added automatic timer to update Firebase data.
- Improved Firebase configuration file management.

### 0.0.2

- First release on the Visual Studio Marketplace.

### 0.0.3

- Fixed some bugs.

### 0.0.4

- Add 'Send to Firebase: Reload App' for reloading manually when configuration is complete.

### 1.0.0

- First stable release.

## Contributing

Contributions are welcome! Follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit your code.
4. Submit a pull request explaining your changes.

For more information about Visual Studio Code's extension development, refer to the official [Extension API documentation](https://code.visualstudio.com/api).

**Enjoy using the VS Code Extension for Firebase!**
