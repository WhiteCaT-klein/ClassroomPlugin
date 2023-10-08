import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('git_plugin.run', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
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
                terminal.sendText(compileCommand, true); // 'addNewLine' set to true to simulate Enter key

                const compileErrorsFilePath = path.join(path.dirname(filePath), 'compile_errors.txt');

                const debugLogFilePath = path.join(path.dirname(filePath), 'debug_log.txt');

                // Create a log file to store compilation errors
                const logStream = fs.createWriteStream(compileErrorsFilePath, { flags: 'a' });

                // Add timestamp with date and time to the log file
                const timestamp = new Date().toLocaleString();
                

                // Execute the compile command using child_process
                const compileProcess = child_process.exec(compileCommand, (error, stdout, stderr) => {
                    if (error) {
                        logStream.write(`\n\nCompilation Errors - ${timestamp}\n\n`);
                        vscode.window.showErrorMessage('Compilation failed. See compile_errors.txt for details.');
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

                       


                    }
                
                setTimeout(() => {

                    

                    const debugLogStream = fs.createWriteStream(debugLogFilePath, { flags: 'a' });
                    const timestamp = new Date().toLocaleString();
                    debugLogStream.write('\n\n  ');
                    const gdbCommand = `gdb ${outputFilePath}`;
                    const dummyCommand = 'x';
                    const scriptCommand = 'set logging file debug_log.txt';
                    const logOnCommand = 'set logging on';
                    const breakCommand = 'b main';
                    const runCommand = 'run';
                    const continueCommand = 'c';
                    const logOffCommand = 'set logging off';
                    
                    const quitCommand = 'quit';
                    setTimeout(() => {
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
                    
                    
                    
                    
                    
                    
                   
                    
                   
                    

                    // Create a debug log stream for GDB session
                    
   


                    
                }, 2000);
                    
                });
			setTimeout(() => {
				terminal.sendText('git add .');
                const commitMessage = `committed ${new Date().toLocaleString()}`;
                terminal.sendText(`git commit -m "${commitMessage}"`);
                terminal.sendText('git push');
				
			}, 10000);
                
            } else {
                vscode.window.showErrorMessage('The active document is not a C program.');
            }
        }
	});

	context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
export function deactivate() {}
