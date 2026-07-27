import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/node";

// Start mock server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));

// Reset handlers after each test to keep test isolation
afterEach(() => server.resetHandlers());

// Close mock server after all tests
afterAll(() => server.close());
