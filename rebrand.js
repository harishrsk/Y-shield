const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'scratch' || file === '.gemini') continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      replaceInDir(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.md') || file === 'README.md' || file === 'package.json') {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('Yochan-Shield')) {
        content = content.replace(/Yochan-Shield/g, 'Y-Shield');
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

replaceInDir('d:\\HB\\Y-Shield');
console.log('Rebranding complete!');
