import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth/client";
import { SignUpSchema } from "@/services/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

const signUp = async (data: SignUpSchema) => {
	const { error } = await authClient.signUp.email({
		email: data.email,
		password: data.password,
		name: data.name,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const SignUpForm = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const signUpMutation = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			toast.success("You have successfully signed up.");

			queryClient.resetQueries();
			router.invalidate();
		},
	});

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		} as SignUpSchema,
		onSubmit: async ({ value }) => {
			await signUpMutation.mutateAsync(value);
		},
		validators: {
			onBlur: SignUpSchema,
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
			<form.AppField name="name">
				{(field) => <field.TextField label="Name" />}
			</form.AppField>
			<form.AppField name="email">
				{(field) => <field.TextField label="Email" />}
			</form.AppField>
			<form.AppField name="password">
				{(field) => <field.TextField label="Password" type="password" />}
			</form.AppField>
			<form.AppField name="confirmPassword">
				{(field) => (
					<field.TextField label="Confirm Password" type="password" />
				)}
			</form.AppField>
			<form.AppForm>
				<form.SubscribeButton label="Sign Up" />
			</form.AppForm>
		</form>
	);
};
