import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import type { SignInSchema } from "@/services/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const signIn = async (data: SignInSchema) => {
	const { error, data: response } = await authClient.signIn.email({
		email: data.email,
		password: data.password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return response;
};

export const SignInForm = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const signInMutation = useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			toast.success(`Hey ${response.user.name}, welcome back!`);

			queryClient.resetQueries();
			navigate({ to: "/" });
		},
	});

	const form = useAppForm({
		defaultValues: {
			email: import.meta.env.VITE_DEFAULT_USER_EMAIL ?? "",
			password: import.meta.env.VITE_DEFAULT_USER_PASSWORD ?? "",
		} as SignInSchema,
		onSubmit: async ({ value }) => {
			await signInMutation.mutateAsync(value);
		},
	});

	return (
		<form
			className="flex flex-col gap-2 w-full"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.AppField name="email">
				{(field) => <field.TextField label="Email" type="email" />}
			</form.AppField>
			<form.AppField name="password">
				{(field) => <field.TextField label="Password" type="password" />}
			</form.AppField>
			<form.AppForm>
				<form.SubscribeButton label="Sign In" />
			</form.AppForm>
		</form>
	);
};
