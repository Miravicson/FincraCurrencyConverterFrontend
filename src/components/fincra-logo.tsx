import { cn } from '@/lib/utils';

interface FincraLogoProps {
  className?: string;
}

export function FincraLogo({ className }: FincraLogoProps) {
  return (
    <img
      src="/public/fincra-website-logo-colored.png"
      alt="Fincra Logo"
      className={cn('object-contain', className)}
    />
  );
}
