# ABAP TechSpec Copilot VS Code Extension

This is a custom VS Code Copilot extension that integrates a premium **Technical Document Generator Webview Panel** and registers a `@techspec` chat agent. It allows you to analyze ABAP source code, identify technical gaps, and generate Airbus Atlantic compliant detailed technical specifications (FR/EN) directly inside VS Code.

It utilizes the secure **VS Code Language Model API (`vscode.lm`)**, routing all queries exclusively through your active GitHub Copilot subscription. No external API keys or third-party configurations are required.

---

## Features
1. **Interactive Technical Spec Webview Generator**:
   - Launch a complete Fiori Horizon Corporate Light themed document wizard inside a tab.
   - Bypasses API key requirements; calls are routed securely via VS Code's active GitHub Copilot account.
   - Supports uploading functional requirements documents (`.docx`, `.txt`, `.md`) and custom markdown templates.
   - Highlights missing technical parameters (transport requests, tables, message classes, boundary test cases) before generation.
2. **Editor Integration**:
   - Quick-access button in the editor title toolbar (visible when editing `.abap` files) to launch the generator.
   - **Import Active Editor Code** button in the Webview sidebar lets you import your open source code file into the generator list in a single click.
3. **Copilot Chat Participant `@techspec`**:
   - `/generate`: Analyze open ABAP files and write an Airbus technical spec outline directly in the chat panel.
   - `/gaps`: Scan code to flag technical gaps or parameters that need developer clarification.

---

## Files Structure
- `package.json`: Main manifest registering the command, toolbar menu, chat participant, and activation events.
- `extension.js`: Core extension activation, native file picker dialogs, editor integration, and LM API routing.
- `templates.js`: Standard Airbus Atlantic templates (FR/EN) represented as raw markdown.
- `webview/index.html`: Webview user interface adapting the complete document generator app with postMessage messaging bridges.
- `.vscode/launch.json`: Configuration to debug the extension locally.

---

## How to Use the Webview Generator
1. Open any **`.abap`** file.
2. Click the **Webview Generator** icon in the top-right editor toolbar (or open the Command Palette `Ctrl+Shift+P` / `Cmd+Shift+P` and select **`ABAP TechSpec: Open Webview Generator`**).
3. Inside the generator:
   - Click **Import Active Editor Code** to load the active ABAP source code, or click the **Upload ABAP Files** zone to select files from your disk.
   - Click **Upload Functional Spec** to upload a functional document (`.docx` client-side parsing included).
   - Review templates and click **Run Analysis** to execute gap analysis.
   - Fill in details and click **Generate Document** to construct the specification. Export as Markdown or Microsoft Word document.

---

## How to Test and Run the Demo (Method A)
To run and present the extension in a local VS Code debug host:
1. Open this folder (`abap-techspec-copilot`) in VS Code.
2. Press **`F5`** (or go to `Run and Debug` and click `Start Debugging`).
3. This opens a new window labeled **`[Extension Development Host]`**.
4. In the new window, open an ABAP file and open the generator panel or chat.

---

## How to Build and Install the VSIX Package (Method B)
To package this extension into a single installable file to share with stakeholders:
1. In this folder, run:
   ```bash
   npx -y @vscode/vsce package
   ```
2. This creates an installable package file: **`abap-techspec-copilot-0.0.1.vsix`**.
3. Install this package:
   - Go to Extensions (`Ctrl+Shift+X`) in VS Code.
   - Click the `...` menu at the top right of the Extensions sidebar.
   - Select **`Install from VSIX...`** and select the `.vsix` file.
   - Run **`Developer: Reload Window`** from the Command Palette to ensure the cached webview panels are refreshed.
