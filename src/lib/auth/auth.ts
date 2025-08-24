import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { reactStartCookies } from "better-auth/react-start";
import { v4 as uuid } from "uuid";

import prisma from "../prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		database: {
			generateId: () => uuid(),
		},
	},
	plugins: [
		passkey(),
		organization({
			teams: {
				enabled: true,
				allowRemovingAllTeams: false,
			},
		}),
		// NOTE Needs to be last in the plugins array
		reactStartCookies(),
	],
});
