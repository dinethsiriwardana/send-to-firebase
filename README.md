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

1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing `Ctrl+Shift+X`.
3. Search for "VS Code Extension for Firebase" and click **Install**.
4. After installation, click **Reload** to activate the extension.

## Extension Settings

The extension contributes the following settings:

- `Open Firebase ConfigFile`: Edit the firebase file.

To access the extension settings, go to **File > Preferences > Settings** and search for "VS Code Extension for Firebase".

## Usage

1. Open a project folder in Visual Studio Code.
2. The extension will automatically track the project name and the programming language of the active file.
3. Firebase data will be sent to the configured Firebase database.
4. You can open the Firebase configuration file by running the **Open Firebase ConfigFile** command from the Command Palette.

## Known Issues

- None at the moment. Please report any issues on the [GitHub repository](https://github.com/dinethsiriwardana/send-to-firebase).

## Release Notes

### 1.0.0

- Initial release of the VS Code Extension for Firebase.

### 1.1.0

- Added automatic timer to update Firebase data.
- Improved Firebase configuration file management.

## Contributing

Contributions are welcome! Follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit your code.
4. Submit a pull request explaining your changes.

## License

This extension is licensed under the [MIT License](LICENSE).

---

For more information about Visual Studio Code's extension development, refer to the official [Extension API documentation](https://code.visualstudio.com/api).

**Enjoy using the VS Code Extension for Firebase!**
