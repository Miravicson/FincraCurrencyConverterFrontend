import { Badge } from '@/components/ui/badge';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  Processing: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  Completed: 'bg-green-100 text-green-800 hover:bg-green-200',
  Failed: 'bg-red-100 text-red-800 hover:bg-red-200',
  Reversed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
};

type AppointmentStatus =
  | 'Pending'
  | 'Processing'
  | 'Completed'
  | 'Failed'
  | 'Reversed';

export default function AppointmentStatusBadge({
  appointmentStatus,
}: {
  appointmentStatus: AppointmentStatus;
}) {
  return (
    <Badge
      variant="outline"
      className={`font-semibold ${statusColors[appointmentStatus]}`}
    >
      {appointmentStatus}
    </Badge>
  );
}
