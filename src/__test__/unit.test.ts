/** @format */

import {
  generateRandomPhoneNumbers,
  generateRandomNumber,
} from "../utils/random.strings";
import { AuthService } from "../controllers/auth/auth.service";
import { ResourceService } from "../controllers/resource/resource.service";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { bootstrap } from "../bootstrap";
import data from "../database/seeds/users.json";

let authToken: string = null;
let selfNuban: string = null;
let transactionReference: string = null;

describe("AuthService", () => {
  const fakeUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: `+234${generateRandomPhoneNumbers()}`,
    password: faker.internet.password({ length: 10 }),
  };

  it("should create a user account", async () => {
    const result = await AuthService.signUp(fakeUser);
    expect(result).toHaveProperty("id");
  });

  it("should login user", async () => {
    const result = await AuthService.signIn({
      email: fakeUser.email,
      password: fakeUser.password,
    });
    authToken = result.token;
    expect(result).toHaveProperty("token");
  });

  it("should not login user", async () => {
    await expect(
      AuthService.signIn({ email: "j@j.com", password: "secret" }),
    ).rejects.toThrow("Incorrect login credentials");
  });

  it("should not create a new user", async () => {
    await expect(AuthService.signUp(fakeUser)).rejects.toThrow(
      "Email is already in use",
    );
  });
});

describe("ResourceService", () => {
  it("should list all banks", async () => {
    const result = await ResourceService.getBanks();
    expect(result).toBeInstanceOf(Array);

    // Check if array is not empty
    expect(result.length).toBeGreaterThan(0);

    // Check if each item in the array has expected properties (e.g., id and name)
    result.forEach((bank) => {
      expect(bank).toHaveProperty("name");
      expect(bank).toHaveProperty("shortcode");
      expect(bank).toHaveProperty("longcode");
    });
  });
});

describe("Wallet endpoint tests", () => {
  const amount = 2000;
  it("should fetch user wallet", async () => {
    const response = await request(bootstrap)
      .get("/wallets")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("nuban");

    selfNuban = response.body.data.nuban;
  });

  it("should fund user wallet", async () => {
    const response = await request(bootstrap)
      .post("/wallets")
      .send({
        amount,
      })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.amount).toBe(amount.toFixed(2));
  });

  it(`should confirm user wallet balance to be ${amount}`, async () => {
    const response = await request(bootstrap)
      .get("/wallets")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(+response.body.data.currentBalance).toBeCloseTo(
      parseFloat(amount.toString()),
      2,
    );
  });

  it("should fetch user transactions", async () => {
    const response = await request(bootstrap)
      .get("/transactions")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();

    const transactions = response.body.data;
    const iterator = Math.floor(Math.random() * transactions.length);
    const transaction = transactions[iterator];

    transactionReference = transaction.reference;
  });

  it("should get one transaction by reference", async () => {
    const response = await request(bootstrap)
      .get(`/transactions/${transactionReference}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("amount");
  });

  it("should return Error: Cannot credit self.", async () => {
    const response = await request(bootstrap)
      .patch("/wallets/lookUp")
      .send({ nuban: selfNuban })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([{ message: "Cannot credit self." }]);
  });

  it("should return Error: Unable to verify account number.", async () => {
    const response = await request(bootstrap)
      .patch("/wallets/lookUp")
      .send({ nuban: generateRandomNumber(10) })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.errors).toEqual([
      { message: "Unable to verify account number." },
    ]);
  });

  it("should send money", async () => {
    const amountToWithdraw = amount - 1000;
    const response = await request(bootstrap)
      .post("/wallets/withdraw")
      .send({
        amount: amountToWithdraw,
        accountNumber: generateRandomNumber(10),
        accountName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        bankName: "Test Bank",
      })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("reference");
  });

  it("should return Error: Insufficient wallet balance", async () => {
    const response = await request(bootstrap)
      .post("/wallets/withdraw")
      .send({
        amount: 10000000,
        accountNumber: generateRandomNumber(10),
        accountName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        bankName: "Test Bank",
      })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.errors).toEqual([
      { message: "Insufficient wallet balance" },
    ]);
  });

  it("should send money to valid nuban", async () => {
    const seededUser = data[0];
    const userNuban = seededUser.phone.replace("234", "");

    const response = await request(bootstrap)
      .post("/wallets/sendMoney")
      .send({
        amount: 1000,
        nuban: userNuban,
      })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty("reference");
  });
});
