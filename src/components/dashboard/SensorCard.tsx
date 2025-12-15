import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'stable';
}

export const SensorCard = ({
  icon: Icon,
  label,
  value,
  unit,
  status,
  trend,
}: SensorCardProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'danger':
        return {
          border: 'border-danger/50',
          icon: 'text-danger',
          glow: 'danger-glow',
          bg: 'bg-danger/5',
        };
      case 'warning':
        return {
          border: 'border-warning/50',
          icon: 'text-warning',
          glow: 'warning-glow',
          bg: 'bg-warning/5',
        };
      default:
        return {
          border: 'border-primary/30',
          icon: 'text-primary',
          glow: '',
          bg: 'bg-primary/5',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      className={cn(
        'glass-card p-4 rounded-xl border transition-all duration-300',
        'hover:scale-[1.02] hover:border-primary/50',
        styles.border,
        styles.bg,
        styles.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('p-2 rounded-lg bg-secondary/50', styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-danger',
              trend === 'down' && 'text-success',
              trend === 'stable' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'stable' && '→'}
          </span>
        )}
      </div>

      <div className="mt-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <div className="flex items-baseline gap-1 mt-1">
          <span
            className={cn(
              'font-orbitron text-2xl font-bold transition-all duration-300',
              status === 'danger' && 'text-danger animate-pulse',
              status === 'warning' && 'text-warning',
              status === 'normal' && 'text-foreground'
            )}
          >
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>

      {/* Animated bar */}
      <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            status === 'danger' && 'bg-danger animate-pulse',
            status === 'warning' && 'bg-warning',
            status === 'normal' && 'bg-primary'
          )}
          style={{
            width: `${Math.min(
              100,
              typeof value === 'number' ? (value / 150) * 100 : 50
            )}%`,
          }}
        />
      </div>
    </div>
  );
};
