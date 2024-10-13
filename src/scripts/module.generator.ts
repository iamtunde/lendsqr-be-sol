/** @format */
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Get the module name from command-line arguments
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name.");
  process.exit(1);
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const dirPath = join(process.cwd(), "src", "controllers", moduleName);
const controllerFilePath = join(dirPath, `${moduleName}.controller.ts`);
const serviceFilePath = join(dirPath, `${moduleName}.service.ts`);

// Check if directory exists and create it if it doesn't
if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

const controllerContent = `// src/controllers/${moduleName}/${moduleName}.controller.ts\n\nexport class ${capitalizeFirstLetter(
  moduleName,
)}Controller {\n  // Controller logic here\n}\n`;

const serviceContent = `// src/controllers/${moduleName}/${moduleName}.service.ts\n\nexport class ${capitalizeFirstLetter(
  moduleName,
)}Service {\n  // Service logic here\n}\n`;

// Create the controller file if it doesn't exist
if (!existsSync(controllerFilePath)) {
  writeFileSync(controllerFilePath, controllerContent, "utf8");
  console.log(
    `Controller created successfully at src/controllers/${moduleName}/${moduleName}.controller.ts`,
  );
} else {
  console.log(
    `Controller already exists at src/controllers/${moduleName}/${moduleName}.controller.ts`,
  );
}

// Create the service file if it doesn't exist
if (!existsSync(serviceFilePath)) {
  writeFileSync(serviceFilePath, serviceContent, "utf8");
  console.log(
    `Service created successfully at src/controllers/${moduleName}/${moduleName}.service.ts`,
  );
} else {
  console.log(
    `Service already exists at src/controllers/${moduleName}/${moduleName}.service.ts`,
  );
}
