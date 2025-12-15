import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/vehicle';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge = ({ score, level, size = 'md' }: RiskGaugeProps) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const getColor = () => {
    switch (level) {
      case 'CRITICAL':
        return { stroke: 'stroke-danger', text: 'text-danger', glow: 'danger-glow' };
      case 'HIGH':
        return { stroke: 'stroke-danger', text: 'text-danger', glow: '' };
      case 'MEDIUM':
        return { stroke: 'stroke-warning', text: 'text-warning', glow: 'warning-glow' };
      default:
        return { stroke: 'stroke-success', text: 'text-success', glow: 'success-glow' };
    }
  };

  const colors = getColor();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className={cn('relative', sizeClasses[size])}>
      {/* Background glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-full opacity-30 blur-xl',
          level === 'CRITICAL' && 'bg-danger animate-pulse',
          level === 'HIGH' && 'bg-danger',
          level === 'MEDIUM' && 'bg-warning',
          level === 'LOW' && 'bg-success'
        )}
      />

      <svg
        className={cn('transform -rotate-90 w-full h-full', colors.glow)}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={cn(colors.stroke, 'transition-all duration-500')}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
        {/* Tick marks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="8"
            x2="50"
            y2="12"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground/50"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'font-orbitron font-bold transition-all duration-300',
            textSizes[size],
            colors.text,
            level === 'CRITICAL' && 'animate-pulse text-glow'
          )}
        >
          {Math.round(score)}
        </span>
        <span
          className={cn(
            'font-orbitron font-semibold tracking-widest',
            labelSizes[size],
            colors.text
          )}
        >
          {level}
        </span>
      </div>
    </div>
  );
};
