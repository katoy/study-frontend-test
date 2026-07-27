import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: "usr_123456789",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }),
];
