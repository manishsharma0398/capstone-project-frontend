"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { GoogleAuthButton } from "@/components/google-auth-button";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useToast } from "@/hooks";
import { APIResponseError, registerUser } from "@/features/auth";

const FormSchema = z.object({
  email: z.email().trim().toLowerCase(),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  role: z.enum(["volunteer", "organization"], {
    message: "Role must be either volunteer or organization",
  }),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

type IFormInput = z.infer<typeof FormSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "volunteer",
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { decodedJwt } = await dispatch(registerUser(data)).unwrap();
      console.log("Debug decodedJwt", decodedJwt);
      if (decodedJwt.role === "volunteer") {
        router.push("/dashboard");
      } else if (decodedJwt.role === "organization") {
        router.push("/org-dashboard");
      }
    } catch (error) {
      const err = error as APIResponseError;
      toast({
        description: err?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Heart className="w-8 h-8 text-accent fill-accent mr-2" />
          <h1 className="text-2xl font-bold">Community Connect</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join our community to make a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleAuthButton />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="mt-1"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="mt-1"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">I am a...</label>
                <select
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  {...register("role")}
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="organization">Organization</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || isLoading}
                className="w-full"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-accent hover:underline font-medium"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
