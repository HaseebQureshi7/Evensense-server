import supertest from "supertest";
import app from "../../../app";

describe("General Integration Tests", () => {
  describe("Health Check Tests", () => {
    it("should return 200 OK on server health check", async () => {
      const res = await supertest(app).get("/health/server");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Server is healthy");
    });

    it("should return 200 OK while connecting to the database", async () => {
      const res = await supertest(app).get("/health/db");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("OK");
    });
  });

  describe("Configuration & Environment Tests", () => {
    it("should have all required environment variables", async () => {
      // SERVER VARIABLES
      expect(process.env.PORT).toBeDefined();
      // DATABASE VARIABLES
      expect(process.env.PG_USER).toBeDefined();
      expect(process.env.PG_HOST).toBeDefined();
      expect(process.env.PG_DATABASE).toBeDefined();
      expect(process.env.PG_PASSWORD).toBeDefined();
      expect(process.env.PG_PORT).toBeDefined();
      // JWT VARIABLES
      expect(process.env.JWT_ACCESS_TOKEN_SECRET).toBeDefined();
      expect(process.env.JWT_REFRESH_TOKEN_SECRET).toBeDefined();
    });

    it("should run in the correct NODE_ENV", async () => {
      expect(["development", "test", "production"]).toContain(
        process.env.NODE_ENV
      );
    });
  });

  describe("Dependency & API Availability Tests", () => {
    describe("Kafka connection tests", () => {
      // it("should return 200 if the Web Socket Server API is reachable", async () => {
      //     const res = await supertest(app).get("/health/wss_health");
      //     expect(res.status).toBe(200);
      // });
      // it("should return 503 if the Web Socket Server API is down", async () => {
      //     const res = await supertest(app).get("/health/wss_health");
      //     expect(res.status).toBe(503);
      // });
    });

    describe("Websocket connection tests", () => {
      // it("should return 200 if the Web Socket Server API is reachable", async () => {
      //     const res = await supertest(app).get("/health/wss_health");
      //     expect(res.status).toBe(200);
      // });
      // it("should return 503 if the Web Socket Server API is down", async () => {
      //     const res = await supertest(app).get("/health/wss_health");
      //     expect(res.status).toBe(503);
      // });
    });
  });
});
