import { cn } from '@/lib/utils';
import { AlertTriangle, Shield } from 'lucide-react';

interface ModeToggleProps {
  isHighRisk: boolean;
  onToggle: () => void;
}

export const ModeToggle = ({ isHighRisk, onToggle }: ModeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative flex items-center gap-3 px-6 py-3 rounded-xl',
        'border-2 transition-all duration-500',
        'font-rajdhani font-semibold uppercase tracking-wider',
        isHighRisk
          ? 'border-danger bg-danger/20 text-danger danger-glow'
          : 'border-success bg-success/20 text-success success-glow'
      )}
    >
      <div
        className={cn(
          'absolute left-2 w-10 h-10 rounded-lg transition-all duration-500',
          isHighRisk ? 'bg-danger/30' : 'bg-success/30'
        )}
      />
      
      <div className="relative z-10 flex items-center gap-2">
        {isHighRisk ? (
          <>
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span>High-Risk Mode</span>
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>Normal Mode</span>
          </>
        )}
      </div>

      {/* Toggle indicator */}
      <div
        className={cn(
          'ml-4 w-12 h-6 rounded-full relative transition-all duration-300',
          isHighRisk ? 'bg-danger/30' : 'bg-success/30'
        )}
      >
        <div
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full transition-all duration-300',
            isHighRisk
              ? 'right-1 bg-danger'
              : 'left-1 bg-success'
          )}
        />
      </div>
    </button>
  );
};
