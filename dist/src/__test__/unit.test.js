"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_strings_1 = require("../utils/random.strings");
var auth_service_1 = require("../controllers/auth/auth.service");
var resource_service_1 = require("../controllers/resource/resource.service");
var faker_1 = require("@faker-js/faker");
var supertest_1 = __importDefault(require("supertest"));
var bootstrap_1 = require("../bootstrap");
var users_json_1 = __importDefault(require("../database/seeds/users.json"));
var authToken = null;
var selfNuban = null;
var transactionReference = null;
describe("AuthService", function () {
    var fakeUser = {
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        phone: "+234".concat((0, random_strings_1.generateRandomPhoneNumbers)()),
        password: faker_1.faker.internet.password({ length: 10 }),
    };
    it("should create a user account", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_service_1.AuthService.signUp(fakeUser)];
                case 1:
                    result = _a.sent();
                    expect(result).toHaveProperty("id");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should login user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth_service_1.AuthService.signIn({
                        email: fakeUser.email,
                        password: fakeUser.password,
                    })];
                case 1:
                    result = _a.sent();
                    authToken = result.token;
                    expect(result).toHaveProperty("token");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not login user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(auth_service_1.AuthService.signIn({ email: "j@j.com", password: "secret" })).rejects.toThrow("Incorrect login credentials")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not create a new user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(auth_service_1.AuthService.signUp(fakeUser)).rejects.toThrow("Email is already in use")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("ResourceService", function () {
    it("should list all banks", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resource_service_1.ResourceService.getBanks()];
                case 1:
                    result = _a.sent();
                    expect(result).toBeInstanceOf(Array);
                    // Check if array is not empty
                    expect(result.length).toBeGreaterThan(0);
                    // Check if each item in the array has expected properties (e.g., id and name)
                    result.forEach(function (bank) {
                        expect(bank).toHaveProperty("name");
                        expect(bank).toHaveProperty("shortcode");
                        expect(bank).toHaveProperty("longcode");
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Wallet endpoint tests", function () {
    var amount = 2000;
    it("should fetch user wallet", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .get("/wallets")
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toHaveProperty("nuban");
                    selfNuban = response.body.data.nuban;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fund user wallet", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .post("/wallets")
                        .send({
                        amount: amount,
                    })
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data.amount).toBe(amount.toFixed(2));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should confirm user wallet balance to be ".concat(amount), function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .get("/wallets")
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toBeDefined();
                    expect(+response.body.data.currentBalance).toBeCloseTo(parseFloat(amount.toString()), 2);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fetch user transactions", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, transactions, iterator, transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .get("/transactions")
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toBeDefined();
                    transactions = response.body.data;
                    iterator = Math.floor(Math.random() * transactions.length);
                    transaction = transactions[iterator];
                    transactionReference = transaction.reference;
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get one transaction by reference", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .get("/transactions/".concat(transactionReference))
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toBeDefined();
                    expect(response.body.data).toHaveProperty("amount");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return Error: Cannot credit self.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .patch("/wallets/lookUp")
                        .send({ nuban: selfNuban })
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body.errors).toEqual([{ message: "Cannot credit self." }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return Error: Unable to verify account number.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .patch("/wallets/lookUp")
                        .send({ nuban: (0, random_strings_1.generateRandomNumber)(10) })
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body.data).toBeUndefined();
                    expect(response.body.errors).toEqual([
                        { message: "Unable to verify account number." },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should send money", function () { return __awaiter(void 0, void 0, void 0, function () {
        var amountToWithdraw, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amountToWithdraw = amount - 1000;
                    return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                            .post("/wallets/withdraw")
                            .send({
                            amount: amountToWithdraw,
                            accountNumber: (0, random_strings_1.generateRandomNumber)(10),
                            accountName: "".concat(faker_1.faker.person.firstName(), " ").concat(faker_1.faker.person.lastName()),
                            bankName: "Test Bank",
                        })
                            .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toBeDefined();
                    expect(response.body.data).toHaveProperty("reference");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return Error: Insufficient wallet balance", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .post("/wallets/withdraw")
                        .send({
                        amount: 5000,
                        accountNumber: (0, random_strings_1.generateRandomNumber)(10),
                        accountName: "".concat(faker_1.faker.person.firstName(), " ").concat(faker_1.faker.person.lastName()),
                        bankName: "Test Bank",
                    })
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body.data).toBeUndefined();
                    expect(response.body.errors).toEqual([
                        { message: "Insufficient wallet balance" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should send money to valid nuban", function () { return __awaiter(void 0, void 0, void 0, function () {
        var seededUser, userNuban, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seededUser = users_json_1.default[0];
                    userNuban = seededUser.phone.replace("234", "");
                    return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                            .post("/wallets/sendMoney")
                            .send({
                            amount: 1000,
                            nuban: userNuban,
                        })
                            .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.data).toBeDefined();
                    expect(response.body.data).toHaveProperty("reference");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return transaction limit error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(bootstrap_1.bootstrap)
                        .post("/wallets/withdraw")
                        .send({
                        amount: 10000000,
                        accountNumber: (0, random_strings_1.generateRandomNumber)(10),
                        accountName: "".concat(faker_1.faker.person.firstName(), " ").concat(faker_1.faker.person.lastName()),
                        bankName: "Test Bank",
                    })
                        .set("Authorization", "Bearer ".concat(authToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body.data).toBeUndefined();
                    expect(response.body.errors).toEqual([
                        { message: "Transaction amount is above daily transaction limit." },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=unit.test.js.map