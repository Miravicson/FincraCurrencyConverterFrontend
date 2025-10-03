import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  getGetManyTransactionsQueryKey,
  useGetUserAccounts,
  AccountEntity,
  getGetUserAccountsQueryKey,
  useFundAccount,
} from '@/_generated';
import { queryClient } from '@/lib/query-client';
import { LoadingSpinner } from './Loader';
import { useToast } from '@/lib/toast-provider';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS } from '@/lib/constant';
import { ACCOUNTS } from '@/routes/route-paths';

const formSchema = z.object({
  accountId: z.string().min(1, {
    message: 'Please select an account.',
  }),
  amount: z
    .string()
    .min(1, {
      message: 'Amount is required.',
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a positive number.',
    }),
});

export function FundAccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountId: '',
      amount: '',
    },
  });

  const { data: accountsResponse, isLoading: isFetchingUserAccounts } =
    useGetUserAccounts();

  const { isPending, mutate: fundAccountMutation } = useFundAccount({
    mutation: {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries({
            queryKey: getGetManyTransactionsQueryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: getGetUserAccountsQueryKey(),
          }),
        ]);
      },
    },
  });

  const { alertError, alertSuccess } = useToast();
  const navigate = useNavigate();

  const showNotificationThenNavigate = (message?: string) => {
    alertSuccess(message ?? 'Account funded successfully');
    setTimeout(
      () => navigate(ACCOUNTS, { replace: true }),
      DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS,
    );
  };

  const accounts: AccountEntity[] = accountsResponse?.data || [];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { accountId, amount } = values;

    fundAccountMutation(
      {
        id: accountId,
        data: { amount },
      },
      {
        onSuccess() {
          form.reset();
          showNotificationThenNavigate();
        },
        onError() {
          alertError('Funding failed. Please try again.');
        },
      },
    );
  };

  if (isFetchingUserAccounts) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="flex items-center justify-center py-8">
          <LoadingSpinner loading={true} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Fund Account</CardTitle>
        <CardDescription>Add funds to your account.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account to fund" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.currencyName} ({account.currencyCode}) -{' '}
                          {account.currencySymbol}
                          {account.availableBalance}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0.00" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isPending}>
              Fund Account
              <LoadingSpinner loading={isPending} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
