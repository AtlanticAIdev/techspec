# ABAP TechSpec Copilot Chat Participant

This is a custom VS Code Copilot extension that registers the `@techspec` chat agent, allowing you to generate Airbus Atlantic compliant detailed technical specifications directly inside your VS Code Copilot Chat panel.

It utilizes the secure **VS Code Language Model API (`vscode.lm`)**, routing all queries exclusively through your active GitHub Copilot Enterprise license. No third-party API keys or external LLM connections are required.

---

## Files Structure
- `package.json`: Main manifest registering the `@techspec` chat participant and commands.
- `extension.js`: Core participant activation and messaging stream controller.
- `templates.js`: Standard Airbus Atlantic templates (FR/EN) represented as raw markdown.
- `.vscode/launch.json`: Configuration to debug the extension locally.

---

## How to Test and Run the Demo (Method A)
To run and present the extension in a local VS Code debug host:
1. Open this folder (`abap-techspec-copilot`) in VS Code.
2. Press **`F5`** (or go to `Run and Debug` and click `Start Debugging`).
3. This opens a new window labeled **`[Extension Development Host]`**.
4. In the new window, open an ABAP file.
5. Open the Copilot Chat sidebar (`Ctrl+Alt+I`), type `@techspec /generate` or `@techspec /gaps`, and press Enter.

---

## How to Build the Sideload VSIX Package (Method B)
To package this extension into a single installable file to share with stakeholders:
1. Ensure you have Node.js and NPM installed.
2. In this folder, run:
   ```bash
   npx -y @vscode/vsce package
   ```
3. This will create an installable package file: **`abap-techspec-copilot-0.0.1.vsix`**.
4. To install this package:
   - Open VS Code.
   - Go to Extensions (`Ctrl+Shift+X`).
   - Click the `...` menu at the top right of the sidebar.
   - Select **`Install from VSIX...`** and select the `.vsix` file.
