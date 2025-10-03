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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from '@radix-ui/react-label';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LOGIN } from '../routes/route-paths';
import { getPasswordRegex } from '@/lib/password-regex';
import { PasswordInput } from './ui/password-input';
import { useResetPassword } from '@/_generated';
import { useToast } from '@/lib/toast-provider';
import { LoadingSpinner } from './Loader';
import { DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS } from '@/lib/constant';
import { handleMutationError } from '@/lib/utils';

const formSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: 'must be at least 8 characters',
    })
    .regex(
      getPasswordRegex(),
      `password must contain at least, one uppercase, one lowercase and one special character`,
    )
    .trim(),
});

export function ResetPasswordForm() {
  const { isPending: loading, mutate } = useResetPassword();
  const [searchParam] = useSearchParams();
  const { alertSuccess, alertError } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const showNotificationThenNavigate = (message?: string) => {
    alertSuccess(message ?? 'Your password has been reset');
    setTimeout(
      () => navigate(LOGIN, { replace: true }),
      DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS,
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const token = searchParam.get('token');
    if (!token) {
      return alertError(
        'The password reset token is invalid. Restart the "Forgot password flow"',
      );
    }
    mutate(
      { data: { ...values, token } },
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
        <CardTitle className="text-2xl">Choose a new password</CardTitle>
        <CardDescription>Choose a new password</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
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
            <Button className="w-full" disabled={loading}>
              Save password
              <LoadingSpinner loading={loading} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
