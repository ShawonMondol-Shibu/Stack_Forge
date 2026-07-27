"use client";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter you name" }),
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashbord'
    })
  };
  const githubLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashbord'
    })
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { error } = await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "User Created",
          });
        },
        onError: (err) => {
          toast.add({
            type: "error",
            title: "Somthing wrong",
            description: err.error.message,
          });
        },
      },
    );

    if (error) {
      toast.add({
        type: "error",
        title: "Something wents wrong.",
        description: error.message,
      });
    }
  };
  return (
    <div className="max-w-md mx-auto overflow-hidden p-4">
      <CardTitle className="mb-10 text-4xl text-center">
        Start With Stack Forge
      </CardTitle>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Button variant={"outline"} onClick={googleLogin}>
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg"
              }
              alt="google_icon"
              width={64}
              height={64}
              className="size-5"
            />
            Sign Up with Google
          </Button>
          <Button variant={"outline"} onClick={githubLogin}>
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg"
              }
              alt="google_icon"
              width={64}
              height={64}
              className="size-5"
            />
            Sign Up with Github
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mx-auto">
          <Separator />
          or
          <Separator />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Work Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="you@gmail.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your confirm password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className={"w-"}>
            Sign Up to Stackforge
          </Button>

          <p className="text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="text-primary font-bold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
