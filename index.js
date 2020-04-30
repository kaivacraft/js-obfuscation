#!/usr/bin/env node
const core = require("@actions/core");
const github = require("@actions/github");
const JavaScriptObfuscator = require("javascript-obfuscator");
const glob = require("glob");
const fs = require("fs");
const confg = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.05,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    identifierNamesGenerator: 'mangled',
    identifiersDictionary: [],
    identifiersPrefix: '',
    inputFileName: '',
    log: false,
    renameGlobals: true,
    reservedNames: ['^window'],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: true,
    shuffleStringArray: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 0.8,
    target: 'browser',
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

try {
  glob(`${process.cwd()}/**/*`, (er, files) => {
    files.forEach(filePath => {
      if (filePath.endsWith(".js")) {
        fs.readFile(filePath, (err, content) => {
          content = content.toString();
          const obfuscatedContent = JavaScriptObfuscator.obfuscate(content, confg).getObfuscatedCode();
          fs.writeFileSync(filePath, obfuscatedContent);
        });
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
