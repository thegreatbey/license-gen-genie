#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// WHY: Define supported licenses for the CLI
const LICENSES = ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause", "ISC"];

// WHY: Load the template for the chosen license from /templates
function getLicenseTemplate(name: string): string {
  const templatePath = path.join(__dirname, "..", "templates", `${name}.txt`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template for ${name} not found.`);
  }
  return fs.readFileSync(templatePath, "utf-8");
}

// WHY: Replace placeholders in the license text with actual values
function fillPlaceholders(template: string, name: string): string {
  const year = new Date().getFullYear().toString();
  return template.replace(/\[year\]/g, year).replace(/\[fullname\]/g, name);
}

// WHY: Get Git username as fallback for author name
function getGitUsername(): string | null {
  try {
    return execSync("git config user.name", { encoding: "utf-8" }).trim();
  } catch {
    return null;
  }
}

// WHY: Write LICENSE file safely, preventing overwrite
function writeLicense(content: string): void {
  const licensePath = path.join(process.cwd(), "LICENSE");
  if (fs.existsSync(licensePath)) {
    console.log("⚠ LICENSE file already exists. Remove it before generating a new one.");
    process.exit(1);
  }
  fs.writeFileSync(licensePath, content);
  console.log("✅ LICENSE file created successfully!");
}

async function main() {
  const program = new Command();
  program
    .name("license-gen-genie")
    .description("Generate an open-source LICENSE file quickly")
    .option("-l, --license <type>", "Specify license type")
    .option("-n, --name <author>", "Specify author name (default: Git username)")
    .option("-e, --explain", "Explain license details")
    .parse(process.argv);

  const options = program.opts();

  // Get license type and author name from CLI or defaults
  let licenseType = options.license;
  let authorName = options.name || getGitUsername() || "";

  // If license type is missing, ask interactively
  if (!licenseType) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "license",
        message: "Choose a license:",
        choices: LICENSES
      }
    ]);
    licenseType = answers.license;
  }

  // Validate license type
  if (!LICENSES.includes(licenseType)) {
    console.error(`❌ Unsupported license type: ${licenseType}`);
    process.exit(1);
  }

  // If author name is still missing, prompt user
  if (!authorName) {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "author",
        message: "Enter author name for the license:",
        validate: (input) => input.trim() !== "" || "Author name is required"
      }
    ]);
    authorName = answers.author;
  }

  // Optional explanation of the license
  if (options.explain) {
    console.log(`\n📜 ${licenseType} Summary:\n`);
    switch (licenseType) {
      case "MIT":
        console.log("Permissive license allowing reuse with attribution.");
        break;
      case "Apache-2.0":
        console.log("Permissive license with explicit patent grant and conditions.");
        break;
      case "GPL-3.0":
        console.log("Strong copyleft license requiring derivatives to remain open-source.");
        break;
      case "BSD-3-Clause":
        console.log("Permissive, similar to MIT, includes non-endorsement clause.");
        break;
      case "ISC":
        console.log("Simplified MIT-like license with minimal text.");
        break;
    }
    console.log("");
  }

  // Apply placeholders and write LICENSE
  const template = getLicenseTemplate(licenseType);
  const filledTemplate = fillPlaceholders(template, authorName);
  writeLicense(filledTemplate);
}

main();