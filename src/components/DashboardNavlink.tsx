import { cn } from '@/lib/utils';
import { NavLinkRenderProps, NavLink } from 'react-router-dom';
import { DashboardNavConfigType } from './DashboardNavbar';

type DashboardNavlinkProps = DashboardNavConfigType;

export function DashboardNavlink({
  link,
  preElement,
  postElement,
  text,
  className,
  isMobile = false,
  preComponent: PreComponent,
  postComponent: PostComponent,
}: DashboardNavlinkProps) {
  const classNameFunc = ({ isActive }: NavLinkRenderProps) => {
    return cn(
      {
        'flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary':
          !isMobile,
        'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground':
          isMobile,
      },
      className,
      { 'bg-muted text-primary': isActive },
    );
  };

  const normPreComponent = PreComponent ? (
    <PreComponent
      className={cn({ 'w-4 h-4': !isMobile, 'w-5 h-5': isMobile })}
    />
  ) : null;

  const normPostComponent = PostComponent ? (
    <PostComponent
      className={cn({ 'w-4 h-4': !isMobile, 'w-5 h-5': isMobile })}
    />
  ) : null;

  return (
    <NavLink to={link} className={classNameFunc}>
      {normPreComponent ?? preElement}
      {text}
      {normPostComponent ?? postElement}
    </NavLink>
  );
}
