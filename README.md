<p align="center">
  <img src="license-gen-genie.png" alt="license-gen-genie logo" width="140"/>
</p>

<h1 align="center">license-gen-genie</h1>

<p align="center">
  <em>Your magical CLI for generating open-source licenses instantly.</em>
</p>

[![npm version](https://img.shields.io/npm/v/license-gen-genie)](https://www.npmjs.com/package/license-gen-genie)
[![downloads](https://img.shields.io/npm/dt/license-gen-genie)](https://www.npmjs.com/package/license-gen-genie)
[![license](https://img.shields.io/npm/l/license-gen-genie)](https://github.com/thegreatbey/license-gen-genie/blob/main/LICENSE.TXT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/license-gen-genie)](https://bundlephobia.com/package/license-gen-genie)
[![npm install](https://img.shields.io/badge/npm%20install-license--gen--genie-blue)](https://www.npmjs.com/package/license-gen-genie)
[![CI/CD](https://github.com/thegreatbey/license-gen-genie/actions/workflows/publish.yml/badge.svg)](https://github.com/thegreatbey/license-gen-genie/actions)


A simple CLI tool to generate open-source LICENSE files quickly.



---



##  Install

```bash

npm install -g license-gen-genie

# or use npx

npx license-gen-genie



---



## Usage



Interactive Mode
Prompts you for:
-License type
-Your name (defaults to your Git username if available)
-Auto-fills the current year

```bash

npx license-gen-genie



Non-Interactive
You can specify all options with flags:

```bash

npx license-gen-genie --license MIT --name "Some One"




With Explanation

```bash

npx license-gen-genie --license GPL-3.0 --explain





---



## License

This project is licensed under MIT.

