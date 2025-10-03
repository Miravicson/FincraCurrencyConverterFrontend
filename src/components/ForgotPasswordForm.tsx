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

import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '@/routes/route-paths';
import { useForgotPassword } from '@/_generated';
import { LoadingSpinner } from './Loader';
import { useToast } from '@/lib/toast-provider';
import { DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS } from '@/lib/constant';
import { handleMutationError } from '@/lib/utils';

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
});

export function ForgotPasswordForm() {
  const { isPending: loading, mutate } = useForgotPassword();
  const navigate = useNavigate();
  const { alertSuccess, alertError } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const showNotificationThenNavigate = (message?: string) => {
    alertSuccess(
      message ?? 'We have sent a password reset token to your email.',
    );
    setTimeout(
      () => navigate(LOGIN, { replace: true }),
      DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS,
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(
      { data: values },
      {
        onSuccess(data, _variables, _context) {
          showNotificationThenNavigate(data.message);
        },
        onError(error, _variables, _context) {
          handleMutationError(error, alertError);
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          An email, containing a reset token, will be sent to your account
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
                    <div className="flex items-center">
                      <Label htmlFor="email">Email</Label>
                      <Link
                        to={LOGIN}
                        className="inline-block ml-auto text-sm underline"
                      >
                        Login?
                      </Link>
                    </div>
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading}>
              Email password reset token
              <LoadingSpinner loading={loading} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
