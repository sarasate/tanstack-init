import { SignInForm } from "@/components/auth/sign-in-form";
// import { SocialLogins } from "src/components/auth/social-logins";
import { Layout } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (context.userSession) {
			throw redirect({ to: "/" });
		}
	},
});

function RouteComponent() {
	return (
		<Layout className="items-center gap-2 max-w-md">
			<div className="flex flex-col gap-4 w-full">
				{/* <SocialLogins /> */}

				<div className="relative">
					<Separator />
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="bg-background px-2 text-muted-foreground text-sm">
							or
						</span>
					</div>
				</div>

				<SignInForm />
			</div>
			<small>
				<Link to="/signup" className="group">
					Do you want to create an account instead?{" "}
					<span className="underline group-hover:no-underline">Sign Up</span>
				</Link>
			</small>
		</Layout>
	);
}
