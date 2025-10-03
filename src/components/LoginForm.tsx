'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';
import { FORGOT_PASSWORD } from '@/routes/route-paths';
import { PasswordInput } from './ui/password-input';
import { LoadingSpinner } from './Loader';
import { useAuth } from '@/lib/auth-provider-hooks';

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email({
      message: 'Must be an email.',
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: 'must be at least 8 characters',
    })
    .trim(),
});

export function LoginForm() {
  const { isLoggingIn, login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                        required
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to={FORGOT_PASSWORD}
                        className="inline-block ml-auto text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="**********"
                        {...field}
                        required
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLoggingIn}>
              Login
              <LoadingSpinner loading={isLoggingIn} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
