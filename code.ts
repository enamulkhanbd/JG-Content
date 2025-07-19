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

// Handle messages from the UI
figma.ui.onmessage = (msg) => {
  console.log('Received message:', msg);

  switch (msg.type) {
    case 'get-content':
      // Send content data to UI
      figma.ui.postMessage({
        type: 'content-data',
        category: msg.category,
        data: contentData[msg.category as keyof typeof contentData] || []
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

// Handle plugin close
figma.on('close', () => {
  console.log('JustGo Content plugin closed');
});

