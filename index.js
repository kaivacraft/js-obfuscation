#!/usr/bin/env node
const core = require("@actions/core");
const github = require("@actions/github");
const JavaScriptObfuscator = require("javascript-obfuscator");
const glob = require("glob");
const fs = require("fs");

try {
  glob(`${process.cwd()}/**/*`, (er, files) => {
    files.forEach(filePath => {
      if (filePath.endsWith(".js")) {
        fs.readFile(filePath, (err, content) => {
          content = content.toString();
          const obfuscatedContent = JavaScriptObfuscator.obfuscate(
            content
          ).getObfuscatedCode();
          fs.writeFileSync(filePath, obfuscatedContent);
        });
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
