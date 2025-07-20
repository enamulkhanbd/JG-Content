// JustGo Content - Figma Plugin Main Logic
// This file handles the core functionality of content injection

// Data structure for content categories (defined directly for compatibility)
import names from './data/names';
import emails from './data/emails';
import phones from './data/phones';
import addresses from './data/addresses';

const contentData = { names, emails, phones, addresses };

// Show the plugin UI
figma.showUI(__html__, { width: 320, height: 480 });

// Dynamically load a data chunk for a category
async function loadData(category: string, chunk: string = 'a'): Promise<string[]> {
  try {
    // Example: import('./data/names-a')
    const module = await import(`./data/${category}-${chunk}`);
    return module.default || [];
  } catch (e) {
    figma.notify(`Could not load data for ${category}-${chunk}`);
    return [];
  }
}

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  // Unwrap pluginMessage if present (Figma UI sends { pluginMessage: ... })
  if ('pluginMessage' in msg) {
    msg = msg.pluginMessage;
  }
  console.log('Received message:', msg);

  switch (msg.type) {
    case 'get-content':
      // Send content data to UI
      figma.ui.postMessage({
        type: 'content-data',
        category: msg.category,
        data: [] // Not used in new logic, but kept for compatibility
      });
      break;

    case 'inject-content':
      // Inject selected content into the selected text layer
      injectContentToSelectedText(msg.content);
      break;

    case 'close-plugin':
      // Close the plugin
      figma.closePlugin();
      break;

    case 'fill-category':
      if (typeof msg.category === 'string') {
        await fillSelectedTextNodes(msg.category, msg.chunk || 'a');
      }
      break;

    default:
      console.log('Unknown message type:', msg.type);
  }
};

// Function to inject content into selected text layer
async function injectContentToSelectedText(content: string) {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('Please select a text layer first');
    return;
  }

  const selectedNode = selection[0];

  // Check if the selected node is a text node
  if (selectedNode.type !== 'TEXT') {
    figma.notify('Please select a text layer');
    return;
  }

  const textNode = selectedNode as TextNode;

  try {
    // Load the font before modifying text
    await figma.loadFontAsync(textNode.fontName as FontName);
    textNode.characters = content;
    figma.notify(`Content injected: ${content}`);
  } catch (error: any) {
    console.error('Error loading font:', error);
    figma.notify('Error: Could not load font');
  }
}

async function fillSelectedTextNodes(category: string, chunk: string = 'a') {
  const selection = figma.currentPage.selection;
  const arr = await loadData(category, chunk);
  if (!arr.length) {
    figma.notify(`No data for category "${category}"`);
    return;
  }
  if (!selection.length) {
    figma.notify('Please select at least one text node.');
    return;
  }
  for (const node of selection) {
    if (node.type === 'TEXT') {
      const value = arr[Math.floor(Math.random() * arr.length)];
      try {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = value;
      } catch (e) {}
    }
  }
  figma.notify(`Filled ${category} in selected text nodes.`);
}

// Handle plugin close
figma.on('close', () => {
  console.log('JustGo Content plugin closed');
});

