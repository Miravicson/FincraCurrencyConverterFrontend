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
  useConvertFunds,
  useGetUserAccounts,
  AccountEntity,
  getGetUserAccountsQueryKey,
} from '@/_generated';
import { queryClient } from '@/lib/query-client';
import { LoadingSpinner } from './Loader';
import { useToast } from '@/lib/toast-provider';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS } from '@/lib/constant';
import { TRANSACTIONS } from '@/routes/route-paths';

const formSchema = z.object({
  fromAccountId: z.string().min(1, {
    message: 'Please select a source account.',
  }),
  toAccountId: z.string().min(1, {
    message: 'Please select a destination account.',
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

export function ConvertForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAccountId: '',
      toAccountId: '',
      amount: '',
    },
  });

  const { data: accountsResponse, isLoading: isFetchingUserAccounts } =
    useGetUserAccounts();

  const { isPending, mutate: convertFundsMutation } = useConvertFunds({
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
    alertSuccess(message ?? 'Conversion was successful');
    setTimeout(
      () => navigate(TRANSACTIONS, { replace: true }),
      DEFAULT_WAIT_BEFORE_NAVIGAGION_SECS,
    );
  };

  const accounts: AccountEntity[] = accountsResponse?.data || [];
  const selectedFromAccountId = form.watch('fromAccountId');

  // Filter out the selected from account from the to account options
  const toAccountOptions = accounts.filter(
    (account) => account.id !== selectedFromAccountId,
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    convertFundsMutation(
      { data: values },
      {
        onSuccess() {
          form.reset();
          showNotificationThenNavigate();
        },
        onError() {
          alertError('Conversion failed. Please try again.');
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
        <CardTitle className="text-2xl">Convert Funds</CardTitle>
        <CardDescription>Transfer funds between your accounts.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="fromAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source account" />
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
              name="toAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedFromAccountId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {toAccountOptions.map((account) => (
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
              Convert Funds
              <LoadingSpinner loading={isPending} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
