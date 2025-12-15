import { cn } from '@/lib/utils';
import { Bot, CheckCircle, Loader2 } from 'lucide-react';

interface AgentStatusCardProps {
  name: string;
  description: string;
  status: 'active' | 'idle' | 'processing';
  lastUpdate?: Date;
}

export const AgentStatusCard = ({
  name,
  description,
  status,
  lastUpdate,
}: AgentStatusCardProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          color: 'text-primary',
          bg: 'bg-primary/10',
          border: 'border-primary/50',
          icon: Loader2,
          iconClass: 'animate-spin',
          label: 'Processing',
        };
      case 'active':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/50',
          icon: CheckCircle,
          iconClass: '',
          label: 'Active',
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted/10',
          border: 'border-muted/50',
          icon: Bot,
          iconClass: '',
          label: 'Idle',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        'glass-card p-4 rounded-xl border transition-all duration-300',
        'hover:scale-[1.02]',
        config.border,
        config.bg
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'p-2 rounded-lg',
            config.bg,
            config.color
          )}
        >
          <Bot className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-orbitron font-semibold text-sm truncate">
              {name}
            </h4>
            <div className={cn('flex items-center gap-1', config.color)}>
              <StatusIcon className={cn('w-3 h-3', config.iconClass)} />
              <span className="text-xs">{config.label}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
          {lastUpdate && (
            <p className="text-[10px] text-muted-foreground/70 mt-2">
              Last update: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
