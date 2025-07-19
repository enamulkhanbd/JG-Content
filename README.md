# JustGo Content – Figma Plugin

A minimalist, clean, and efficient Figma plugin for fast content injection. Designed for internal teams who want a focused alternative to Content Reel.

## Features

- **Modern UI**: Simple, grid-based navigation for content categories
- **Content Categories**: Names, Emails, Phones, Addresses (easily extendable)
- **One-Click Injection**: Select a text layer and inject content instantly
- **TypeScript + ESBuild**: Modular code, fast builds, and type safety

## File Structure

```
JG-Content/
├── manifest.json       # Figma plugin manifest
├── code.ts             # Main plugin logic (TypeScript)
├── code.js             # Bundled JavaScript (generated, not committed)
├── ui.html             # Plugin UI
├── package.json        # Node.js dependencies
├── tsconfig.json       # TypeScript config
├── data/               # Modular content data (TypeScript modules)
│   ├── names.ts
│   ├── emails.ts
│   ├── phones.ts
│   └── addresses.ts
└── README.md           # This file
```

## Usage (For Designers)

1. **Open the Plugin**: In Figma, go to Plugins → Development → JustGo Content
2. **Select a Text Layer**: Click any text layer in your design
3. **Choose a Category**: Click Names, Emails, Phones, or Addresses
4. **Pick Content**: Click an item to inject it into your selected text layer

## Development

### Prerequisites
- Node.js and npm
- Figma desktop app

### Setup & Build

1. Install dependencies:
   ```bash
   npm install
   ```
2. Bundle the plugin (TypeScript + data):
   ```bash
   npx esbuild code.ts --bundle --platform=node --outfile=code.js
   ```
   Or add a script to `package.json` for convenience:
   ```json
   "scripts": {
     "build": "esbuild code.ts --bundle --platform=node --outfile=code.js"
   }
   ```
   Then run:
   ```bash
   npm run build
   ```
3. In Figma:
   - Go to Plugins → Development → Import plugin from manifest
   - Select `manifest.json`
   - The plugin will appear in your plugins list

### Workflow
- Edit `code.ts`, `ui.html`, or any file in `data/`
- Run `npm run build` after changes
- Reload the plugin in Figma

## Technical Notes

- **Data Management**: All content arrays are in `data/*.ts` modules and imported into `code.ts`.
- **Bundling**: ESBuild bundles everything into a single `code.js` for Figma compatibility.
- **No JSON imports**: Data is managed as TypeScript modules for maximum compatibility.
- **.gitignore**: Build outputs and dependencies are not committed.

## Customization

- To add or update content, edit the relevant file in `data/`.
- To add a new category, create a new module in `data/`, import it in `code.ts`, and update the UI in `ui.html`.

## License

Internal tool for design team use only.

