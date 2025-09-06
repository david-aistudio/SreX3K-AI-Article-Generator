import { promises as fs } from 'fs';
import path from 'path';
import { FileSaveError } from '../errors/index.js';
import { logger } from '../utils/logger.js';

// Save research result to file
async function saveResearchResult(query, content, format = 'md') {
  try {
    logger.info(`Saving research result for query: ${query} in format: ${format}`);
    
    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      logger.error('Invalid query provided for saving');
      throw new FileSaveError('Query must be a non-empty string');
    }
    
    if (!content || typeof content !== 'string') {
      logger.error('Invalid content provided for saving');
      throw new FileSaveError('Content must be a string');
    }
    
    // Determine file extension based on format
    const ext = format === 'html' ? '.html' : format === 'txt' ? '.txt' : '.md';
    
    // Create filename from query
    const filename = `research_${query.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}${ext}`;
    const filepath = path.join('articles', filename);
    
    logger.debug(`Generated filename: ${filename}`);
    
    // Convert content based on format
    let formattedContent = content;
    if (format === 'html') {
      formattedContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${query} - AI Article</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        blockquote { border-left: 4px solid #ddd; padding-left: 20px; margin-left: 0; color: #666; }
    </style>
</head>
<body>
    ${content.replace(/\n/g, '<br>')}
</body>
</html>`;
    }
    
    // Ensure articles directory exists
    try {
      await fs.access('articles');
      logger.debug('Articles directory exists');
    } catch (err) {
      // Directory doesn't exist, create it
      logger.info('Creating articles directory');
      await fs.mkdir('articles', { recursive: true });
    }
    
    // Save the content
    await fs.writeFile(filepath, formattedContent);
    logger.info(`Successfully saved article to: ${filepath}`);
    
    return filepath;
  } catch (error) {
    logger.error(`Failed to save research result: ${error.message}`);
    throw new FileSaveError('Failed to save research result: ' + error.message, error);
  }
}

// Get all research history
async function getResearchHistory() {
  try {
    logger.info('Retrieving research history');
    
    // Check if articles directory exists
    try {
      await fs.access('articles');
      logger.debug('Articles directory exists');
    } catch (err) {
      // Directory doesn't exist, return empty array
      logger.info('Articles directory does not exist, returning empty history');
      return [];
    }
    
    const files = await fs.readdir('articles');
    logger.debug(`Found ${files.length} files in articles directory`);
    
    const researchFiles = files.filter(file => file.startsWith('research_') && file.endsWith('.md'));
    logger.debug(`Found ${researchFiles.length} research files`);
    
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
    logger.error(`Error retrieving research history: ${error.message}`);
    // Return empty array instead of throwing error
    return [];
  }
}

export { saveResearchResult, getResearchHistory };