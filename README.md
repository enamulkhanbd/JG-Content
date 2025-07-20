# JustGo Content – Figma Plugin

A minimalist, scalable Figma plugin for fast content injection. Built for teams who want a focused, future-proof alternative to Content Reel.

## Features

- **Modern UI**: Simple, grid-based navigation for content categories
- **Dynamic Data Loading**: Loads only the needed data chunk on demand (supports local and future remote APIs)
- **Content Categories**: Names, Emails, Phones, Addresses (easily extendable)
- **One-Click Injection**: Select text layers and inject random content instantly
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
├── data/               # Chunked content data (TypeScript modules)
│   ├── names-a.ts
│   ├── names-b.ts
│   ├── emails-a.ts
│   ├── phones-a.ts
│   └── addresses-a.ts
└── README.md           # This file
```

## Usage (For Designers)

1. **Open the Plugin**: In Figma, go to Plugins → Development → JustGo Content
2. **Select One or More Text Layers**: Click any text layers in your design
3. **Choose a Category**: Click Names, Emails, Phones, or Addresses
4. **Each selected text layer will be filled with a random value from the chosen category**

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
   npx esbuild code.ts --bundle --platform=node --format=iife --outfile=code.js
   ```
   Or add a script to `package.json` for convenience:
   ```json
   "scripts": {
     "build": "esbuild code.ts --bundle --platform=node --format=iife --outfile=code.js"
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

- **Dynamic Data Loading**: Data is loaded on demand using dynamic `import()` from chunked files in `data/` (e.g., `names-a.ts`).
- **Scalable for Remote APIs**: The loader can be easily switched to fetch from remote APIs in the future.
- **No static imports**: All data is loaded only when needed, keeping memory usage low.
- **.gitignore**: Build outputs and dependencies are not committed.

## Customization

- To add or update content, add or edit chunk files in `data/` (e.g., `names-b.ts`).
- To add a new category, create a new chunked module in `data/`, and update the UI in `ui.html` if needed.
- To support remote APIs, update the loader in `code.ts` to fetch from your endpoint.

## License

Internal tool for design team use only.

