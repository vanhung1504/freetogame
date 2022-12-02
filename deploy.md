Or add: base: "/<repo>/", to vite.config.js
run: npm install gh-pages
add to package.json scripts: "deploy": "gh-pages -d dist"
run: npm run build
run: npm run deploy
