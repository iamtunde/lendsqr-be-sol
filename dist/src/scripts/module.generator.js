"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
var fs_1 = require("fs");
var path_1 = require("path");
// Get the module name from command-line arguments
var moduleName = process.argv[2];
if (!moduleName) {
    console.error("Please provide a module name.");
    process.exit(1);
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
var dirPath = (0, path_1.join)(process.cwd(), "src", "controllers", moduleName);
var controllerFilePath = (0, path_1.join)(dirPath, "".concat(moduleName, ".controller.ts"));
var serviceFilePath = (0, path_1.join)(dirPath, "".concat(moduleName, ".service.ts"));
// Check if directory exists and create it if it doesn't
if (!(0, fs_1.existsSync)(dirPath)) {
    (0, fs_1.mkdirSync)(dirPath, { recursive: true });
}
var controllerContent = "// src/controllers/".concat(moduleName, "/").concat(moduleName, ".controller.ts\n\nexport class ").concat(capitalizeFirstLetter(moduleName), "Controller {\n  // Controller logic here\n}\n");
var serviceContent = "// src/controllers/".concat(moduleName, "/").concat(moduleName, ".service.ts\n\nexport class ").concat(capitalizeFirstLetter(moduleName), "Service {\n  // Service logic here\n}\n");
// Create the controller file if it doesn't exist
if (!(0, fs_1.existsSync)(controllerFilePath)) {
    (0, fs_1.writeFileSync)(controllerFilePath, controllerContent, "utf8");
    console.log("Controller created successfully at src/controllers/".concat(moduleName, "/").concat(moduleName, ".controller.ts"));
}
else {
    console.log("Controller already exists at src/controllers/".concat(moduleName, "/").concat(moduleName, ".controller.ts"));
}
// Create the service file if it doesn't exist
if (!(0, fs_1.existsSync)(serviceFilePath)) {
    (0, fs_1.writeFileSync)(serviceFilePath, serviceContent, "utf8");
    console.log("Service created successfully at src/controllers/".concat(moduleName, "/").concat(moduleName, ".service.ts"));
}
else {
    console.log("Service already exists at src/controllers/".concat(moduleName, "/").concat(moduleName, ".service.ts"));
}
//# sourceMappingURL=module.generator.js.map