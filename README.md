# classroomplugin README

## Overview

The Git Plugin for Visual Studio Code is an extension that provides seamless integration with Git, allowing you to compile and run C programs, capture compilation errors, and interact with the Git version control system directly from within Visual Studio Code.

## Features

- Compile and run C programs with a single click.
- Capture and display compilation errors in real-time.
- Interact with the Git version control system to stage, commit, and push changes.
- Log the debugging session for C programs using GDB.

## Prerequisites

Before using this extension, ensure that you have the following software installed on your system:

- Visual Studio Code: [Download VS Code](https://code.visualstudio.com/download)
- Node.js and npm: [Download Node.js](https://nodejs.org/)
- Git: [Download Git](https://git-scm.com/downloads)
- GCC (GNU Compiler Collection) for C programming: [Download GCC](https://gcc.gnu.org/install/index.html)

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "Git Plugin" in the Extensions view search box.
4. Click the Install button to install the extension.
5. After installation, click the Reload button to activate the extension.

## Usage

### Compiling and Running C Programs

1. Open a C program file (`.c`) in Visual Studio Code.
2. Click on the "Git Plugin" icon in the Activity Bar on the side of the window or use the provided keyboard shortcut.
3. The extension will compile the C program using GCC and run it in the terminal.
4. Compilation errors, if any, will be displayed in real-time.

### Git Integration

1. Ensure that you have a Git repository initialized in your project directory.
2. Use the "Git Plugin" commands from the command palette to stage, commit, and push your changes.

### Debugging C Programs (GDB)

1. After compiling and running a C program, you can start a debugging session.
2. The extension will log the debugging session to a file for analysis.

## Configuration

You can configure some aspects of this extension by modifying the settings in your Visual Studio Code settings.json file. Here are the available settings:

- `"git_plugin.compileCommand"`: Customize the compilation command (default: `"gcc -g {file} -o {output}"`).
- `"git_plugin.runCommand"`: Customize the run command (default: `"{output}"`).
- `"git_plugin.gitAddCommand"`: Customize the Git add command (default: `"git add ."`).
- `"git_plugin.gitCommitCommand"`: Customize the Git commit command (default: `"git commit -m {message}"`).
- `"git_plugin.gitPushCommand"`: Customize the Git push command (default: `"git push"`).

## Troubleshooting

If you encounter any issues or have questions, please visit the [GitHub repository](https://github.com/WhiteCaT-klein/ClassroomPlugin) for this extension to submit an issue or seek assistance.

## License

This extension is licensed under the [MIT License](LICENSE).
