import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, http } from "msw";
import { UserProfile } from "./UserProfile";

const meta: Meta<typeof UserProfile> = {
  title: "Components/UserProfile",
  component: UserProfile,
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/user", () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
