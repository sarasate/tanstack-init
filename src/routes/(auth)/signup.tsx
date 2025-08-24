import { SignUpForm } from "@/components/auth/sign-up-form";
import { Layout } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup")({
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

				<SignUpForm />
			</div>
			<small>
				<Link to="/login" className="group">
					Do you already have an account?{" "}
					<span className="underline group-hover:no-underline">Sign In</span>
				</Link>
			</small>
		</Layout>
	);
}
