const fs = require('fs').promises;
const path = require('path');

// Save research result to file
async function saveResearchResult(query, content) {
  try {
    // Create filename from query
    const filename = `research_${query.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.md`;
    const filepath = path.join('articles', filename);
    
    // Save the content
    await fs.writeFile(filepath, content);
    
    return filepath;
  } catch (error) {
    throw new Error('Failed to save research result: ' + error.message);
  }
}

// Get all research history
async function getResearchHistory() {
  try {
    const files = await fs.readdir('articles');
    const researchFiles = files.filter(file => file.startsWith('research_') && file.endsWith('.md'));
    
    return researchFiles.map(file => {
      const parts = file.replace('research_', '').replace('.md', '').split('_');
      const timestamp = parts.pop();
      const query = parts.join(' ');
      
      return {
        filename: file,
        query: query,
        timestamp: new Date(parseInt(timestamp))
      };
    });
  } catch (error) {
    return [];
  }
}

module.exports = { saveResearchResult, getResearchHistory };