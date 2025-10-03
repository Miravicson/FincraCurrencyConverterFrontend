import { getReadableDateTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import AppointementStatusBadge from '@/components/AppointmentStatusBadge';
import { TransactionEntity } from '@/_generated';

export const columns: ColumnDef<TransactionEntity>[] = [
  {
    accessorKey: 'reference',
    header: 'Reference',
  },

  {
    accessorKey: 'createdAt',
    header: 'Time',
    cell: (props) => {
      return getReadableDateTime(
        props.getValue<TransactionEntity['createdAt']>(),
      );
    },
  },

  {
    accessorKey: 'currencyPair',
    header: 'Currency Pair',
    cell: (props) => {
      const { fromCurrency, toCurrency, originalAmount, convertedAmount } =
        props.row.original || {};
      return `${originalAmount} ${fromCurrency} --> ${convertedAmount} ${toCurrency}`;
    },
  },

  {
    accessorKey: 'conversionRate',
    header: 'Rate',
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => {
      return (
        <AppointementStatusBadge
          appointmentStatus={props.getValue<TransactionEntity['status']>()}
        />
      );
    },
  },
];
