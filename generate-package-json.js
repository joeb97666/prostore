const fs = require('fs');

// Read package-lock.json
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

// Extract dependencies
const dependencies = {};
for (const [name, dep] of Object.entries(packageLock.dependencies || packageLock.packages[''].dependencies || {})) {
  dependencies[name] = dep.version;
}

// Create a basic package.json
const packageJson = {
  name: packageLock.name || 'my-project',
  version: packageLock.version || '1.0.0',
  dependencies: dependencies,
};

// Write to package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json has been generated');