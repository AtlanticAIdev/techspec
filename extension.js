const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { AIRBUS_FR_TEMPLATE, AIRBUS_EN_TEMPLATE } = require('./templates');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    
    // Register the chat participant `@techspec`
    const handler = async (request, context, stream, token) => {
        
        // 1. Check for active text editor containing ABAP source code
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            stream.markdown("Please open an ABAP file in the editor first to use this extension.");
            return;
        }
        
        const abapCode = activeEditor.document.getText();
        const fileName = activeEditor.document.fileName.split(/[\\/]/).pop() || "Object";
        
        // 2. Select the template (default to English)
        let template = AIRBUS_EN_TEMPLATE;
        let languageLabel = "English";
        
        if (request.command === 'generate') {
            stream.progress("Analyzing ABAP code and preparing technical spec...");
            
            // Check if user specified french output in their chat prompt
            if (request.prompt.toLowerCase().includes('fr') || request.prompt.toLowerCase().includes('french')) {
                template = AIRBUS_FR_TEMPLATE;
                languageLabel = "French";
            }
            
            const systemPrompt = `You are an expert ABAP Technical Architect writing a Technical Design Document (Spécification Technique Détaillée) for Airbus Atlantic.
Write the entire document in ${languageLabel}.
Follow the layout, structure, and headings of the template below exactly. Do not use TBD or placeholders; extract details directly from the code.

Target Document Layout Template:
\"\"\"
${template}
\"\"\"`;

            const userPrompt = `Generate a complete technical spec document for this ABAP source code (File: ${fileName}):\n\n\`\`\`abap\n${abapCode}\n\`\`\``;
            
            try {
                // Select Copilot's built-in GPT-4 model with a generic fallback
                let models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
                if (!models || models.length === 0) {
                    models = await vscode.lm.selectChatModels({});
                }
                if (!models || models.length === 0) {
                    stream.markdown("Copilot Language Model is currently unavailable. Please verify that you are logged into GitHub Copilot inside VS Code (check the Accounts menu in the bottom left).");
                    return;
                }
                const model = models[0];
                
                // Send request securely via Copilot Language Model API
                const chatResponse = await model.sendRequest(
                    [
                        vscode.LanguageModelChatMessage.System(systemPrompt),
                        vscode.LanguageModelChatMessage.User(userPrompt)
                    ],
                    {},
                    token
                );
                
                // Stream response fragments directly into Copilot Chat pane
                for await (const fragment of chatResponse.text) {
                    stream.markdown(fragment);
                }
                
            } catch (err) {
                stream.markdown(`Error during generation: ${err.message}`);
            }
        } 
        
        else if (request.command === 'gaps') {
            stream.progress("Scanning ABAP code for technical gaps...");
            
            const gapPrompt = `Analyze the following ABAP code and list any missing inputs, validation criteria, error handling rules, message IDs, or functional parameters that are needed to write a detailed technical specification:
            
\`\`\`abap
${abapCode}
\`\`\``;

            try {
                let models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
                if (!models || models.length === 0) {
                    models = await vscode.lm.selectChatModels({});
                }
                if (!models || models.length === 0) {
                    stream.markdown("Copilot Language Model is currently unavailable. Please verify that you are logged into GitHub Copilot inside VS Code.");
                    return;
                }
                const model = models[0];
                
                const response = await model.sendRequest(
                    [vscode.LanguageModelChatMessage.User(gapPrompt)],
                    {},
                    token
                );
                
                for await (const chunk of response.text) {
                    stream.markdown(chunk);
                }
                
            } catch (err) {
                stream.markdown(`Error scanning gaps: ${err.message}`);
            }
        } else {
            // Default response if no command specified (just typing `@techspec`)
            stream.markdown("Welcome to **ABAP TechSpec Copilot**! Use the following slash commands:\n\n" +
                            "- `/generate` - Analyze open ABAP code and output a complete Technical Design Document.\n" +
                            "- `/gaps` - Scan the active ABAP code for technical parameter or functional gaps.");
        }
    };
    
    const participant = vscode.chat.createChatParticipant('soprasteria.techspec', handler);
    context.subscriptions.push(participant);

    // Register command to open Webview Generator
    let disposableWebview = vscode.commands.registerCommand('abap-techspec-copilot.openGenerator', () => {
        const panel = vscode.window.createWebviewPanel(
            'abapTechSpecGenerator',
            'ABAP Technical Spec Generator',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        // Load the HTML content from webview/index.html
        try {
            const htmlPath = path.join(context.extensionPath, 'webview', 'index.html');
            if (!fs.existsSync(htmlPath)) {
                vscode.window.showErrorMessage(`Webview file not found at ${htmlPath}`);
                return;
            }
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            panel.webview.html = htmlContent;
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to load webview: ${err.message}`);
            return;
        }

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'callLLM':
                        try {
                            let models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
                            if (!models || models.length === 0) {
                                models = await vscode.lm.selectChatModels({});
                            }
                            if (!models || models.length === 0) {
                                panel.webview.postMessage({
                                    command: 'llmResponse',
                                    requestId: message.requestId,
                                    success: false,
                                    error: 'Copilot Language Model is currently unavailable. Please verify that you are logged into GitHub Copilot inside VS Code (check the Accounts menu in the bottom left).'
                                });
                                return;
                            }
                            const model = models[0];
                            const chatResponse = await model.sendRequest(
                                [
                                    vscode.LanguageModelChatMessage.User(message.prompt)
                                ],
                                {},
                                new vscode.CancellationTokenSource().token
                            );

                            let responseText = '';
                            for await (const fragment of chatResponse.text) {
                                responseText += fragment;
                            }

                            panel.webview.postMessage({
                                command: 'llmResponse',
                                requestId: message.requestId,
                                success: true,
                                text: responseText
                            });
                        } catch (err) {
                            panel.webview.postMessage({
                                command: 'llmResponse',
                                requestId: message.requestId,
                                success: false,
                                error: err.message
                            });
                        }
                        break;

                    case 'importActiveEditor':
                        try {
                            const activeEditor = vscode.window.activeTextEditor;
                            if (!activeEditor) {
                                throw new Error("No active text editor open. Please open an ABAP file first.");
                            }
                            const content = activeEditor.document.getText();
                            const name = activeEditor.document.fileName.split(/[\\/]/).pop() || "Object.abap";
                            
                            panel.webview.postMessage({
                                command: 'importActiveEditorResponse',
                                success: true,
                                name: name,
                                content: content
                            });
                        } catch (err) {
                            panel.webview.postMessage({
                                command: 'importActiveEditorResponse',
                                success: false,
                                error: err.message
                            });
                        }
                        break;

                    case 'selectFunctionalDoc':
                        try {
                            const uris = await vscode.window.showOpenDialog({
                                canSelectFiles: true,
                                canSelectFolders: false,
                                canSelectMany: false,
                                openLabel: 'Select Functional Document',
                                filters: {
                                    'Documents': ['docx', 'txt', 'md']
                                }
                            });
                            if (!uris || uris.length === 0) return;
                            const uri = uris[0];
                            const ext = path.extname(uri.fsPath).toLowerCase();
                            const name = path.basename(uri.fsPath);
                            
                            if (ext === '.docx') {
                                const data = fs.readFileSync(uri.fsPath);
                                const base64 = data.toString('base64');
                                panel.webview.postMessage({
                                    command: 'funcFileSelected',
                                    success: true,
                                    name: name,
                                    base64: base64
                                });
                            } else {
                                const content = fs.readFileSync(uri.fsPath, 'utf8');
                                panel.webview.postMessage({
                                    command: 'funcFileSelected',
                                    success: true,
                                    name: name,
                                    content: content
                                });
                            }
                        } catch (err) {
                            panel.webview.postMessage({
                                command: 'funcFileSelected',
                                success: false,
                                error: err.message
                            });
                        }
                        break;

                    case 'selectAbapFiles':
                        try {
                            const uris = await vscode.window.showOpenDialog({
                                canSelectFiles: true,
                                canSelectFolders: false,
                                canSelectMany: true,
                                openLabel: 'Select ABAP/Text Files',
                                filters: {
                                    'ABAP/Text Files': ['abap', 'txt']
                                }
                            });
                            if (!uris || uris.length === 0) return;
                            const files = [];
                            for (const uri of uris) {
                                const name = path.basename(uri.fsPath);
                                const content = fs.readFileSync(uri.fsPath, 'utf8');
                                const stats = fs.statSync(uri.fsPath);
                                files.push({
                                    name: name,
                                    content: content,
                                    size: stats.size
                                });
                            }
                            panel.webview.postMessage({
                                command: 'abapFilesSelected',
                                success: true,
                                files: files
                            });
                        } catch (err) {
                            panel.webview.postMessage({
                                command: 'abapFilesSelected',
                                success: false,
                                error: err.message
                            });
                        }
                        break;

                    case 'selectTemplateFile':
                        try {
                            const uris = await vscode.window.showOpenDialog({
                                canSelectFiles: true,
                                canSelectFolders: false,
                                canSelectMany: false,
                                openLabel: 'Select Template File',
                                filters: {
                                    'Templates': ['docx', 'txt', 'md']
                                }
                            });
                            if (!uris || uris.length === 0) {
                                panel.webview.postMessage({
                                    command: 'templateFileSelected',
                                    success: false,
                                    error: 'Selection cancelled'
                                });
                                return;
                            }
                            const uri = uris[0];
                            const ext = path.extname(uri.fsPath).toLowerCase();
                            const name = path.basename(uri.fsPath);
                            
                            if (ext === '.docx') {
                                const data = fs.readFileSync(uri.fsPath);
                                const base64 = data.toString('base64');
                                panel.webview.postMessage({
                                    command: 'templateFileSelected',
                                    success: true,
                                    name: name,
                                    base64: base64
                                });
                            } else {
                                const content = fs.readFileSync(uri.fsPath, 'utf8');
                                panel.webview.postMessage({
                                    command: 'templateFileSelected',
                                    success: true,
                                    name: name,
                                    content: content
                                });
                            }
                        } catch (err) {
                            panel.webview.postMessage({
                                command: 'templateFileSelected',
                                success: false,
                                error: err.message
                            });
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposableWebview);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
