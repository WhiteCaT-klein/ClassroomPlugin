import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('git_plugin.run', () => {
        vscode.window.showInformationMessage('The command ran successfully');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const filePath = editor.document.uri.fsPath;
            if (filePath.endsWith('.c')) {
                const outputFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.c'));

                // On Windows, use 'gcc' for compilation and '.exe' for execution
                const compileCommand = `gcc -g "${filePath}" -o "${outputFilePath}.exe" 2>&1`;

                const terminal = vscode.window.createTerminal({
                    name: 'C Program',
                    shellPath: 'cmd.exe', // Use 'cmd' as the shell on Windows
                });

                // Execute the compile command directly in the terminal
                terminal.sendText(compileCommand, true);
                const baseFileName = path.basename(filePath, '.c'); // Get the base filename without the extension

                const compileErrorsFilePath = path.join(path.dirname(filePath), `${baseFileName}_compile_errors.txt`);
                const debugLogFilePath = path.join(path.dirname(filePath), `${baseFileName}_debug_log.txt`);


                // Create a log file to store compilation errors
                const logStream = fs.createWriteStream(compileErrorsFilePath, { flags: 'a' });
                const debugLogStream = fs.createWriteStream(debugLogFilePath, { flags: 'a' });
                // Add timestamp with date and time to the log file
                const timestamp = new Date().toLocaleString();
               

                // Execute the compile command using child_process
                const compileProcess = child_process.exec(compileCommand, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage('Compilation failed. See compile_errors.txt for details.');
                        logStream.write(`\n\nCompilation Errors - ${timestamp}\n\n`);
                        logStream.write(`Compilation failed: ${error.message}\n`);
                    } else {
                        // Compilation successful, run the program
                        terminal.show();
                        terminal.sendText(`"${outputFilePath}.exe"`);
                    }
                });

                // Capture stdout and stderr to the log file
                compileProcess.stdout?.pipe(logStream, { end: false });
                compileProcess.stderr?.pipe(logStream, { end: false });

                // Listen for the exit event to handle completion
                compileProcess.on('exit', (code) => {
                    logStream.end(); // Close the log file
                    if (code === 0) {
                        vscode.window.showInformationMessage('Compilation succeeded.');
                        setTimeout(() => {
                        debugLogStream.write('\n\n  ');
                        const gdbCommand = `gdb ${outputFilePath}`;
                        const dummyCommand = 'x';
                        const scriptCommand = `set logging file ${baseFileName}_debug_log.txt`;
                        const logOnCommand = 'set logging on';
                        const breakCommand = 'b main';
                        const runCommand = 'run';
                        const continueCommand = 'c';
                        const logOffCommand = 'set logging off';
                        const quitCommand = 'quit';

                        terminal.sendText(gdbCommand);
                        setTimeout(() => {
                            terminal.sendText(dummyCommand);
                            setTimeout(() => {
                                terminal.sendText(scriptCommand);
                                setTimeout(() => {
                                    terminal.sendText(logOnCommand);
                                    setTimeout(() => {
                                        terminal.sendText(breakCommand);
                                        setTimeout(() => {
                                            terminal.sendText(runCommand);
                                            setTimeout(() => {
                                                terminal.sendText(continueCommand);
                                                setTimeout(() => {
                                                    terminal.sendText(logOffCommand);
                                                    setTimeout(() => {
                                                        terminal.sendText(quitCommand);
                                                    }, 500);
                                                }, 500);
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 1000);
                        
                    }
                    
                });

                setTimeout(() => {
                    terminal.sendText('git add .');
                    const commitMessage = `committed ${new Date().toLocaleString()}`;
                    terminal.sendText(`git commit -m "${commitMessage}"`);
                    terminal.sendText('git push');
                }, 7000);
            
            } else {
                vscode.window.showErrorMessage('The active document is not a C program.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
