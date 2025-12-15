import { cn } from '@/lib/utils';
import { Atom, CheckCircle, Circle } from 'lucide-react';
import type { SafetyAction } from '@/types/vehicle';

interface QuantumOptimizerProps {
  actions: SafetyAction[];
  isActive: boolean;
}

export const QuantumOptimizer = ({ actions, isActive }: QuantumOptimizerProps) => {
  return (
    <div
      className={cn(
        'glass-card rounded-xl border overflow-hidden',
        isActive
          ? 'border-primary neon-border'
          : 'border-border/50 opacity-50'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
          )}>
            <Atom className={cn('w-6 h-6', isActive && 'animate-spin-slow')} />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-lg">
              Quantum-Inspired Decision Optimization
            </h3>
            <p className="text-xs text-muted-foreground">
              Hybrid Model • Evaluating {actions.length} safety pathways
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        {actions.map((action, index) => (
          <div
            key={action.id}
            className={cn(
              'relative p-4 rounded-lg border transition-all duration-500',
              action.selected
                ? 'border-success bg-success/10 success-glow'
                : 'border-border/30 bg-secondary/30',
              !isActive && 'opacity-50'
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'mt-0.5',
                action.selected ? 'text-success' : 'text-muted-foreground'
              )}>
                {action.selected ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={cn(
                    'font-orbitron font-semibold',
                    action.selected && 'text-success'
                  )}>
                    {action.name}
                  </h4>
                  <div className={cn(
                    'flex items-center gap-2',
                    action.selected ? 'text-success' : 'text-muted-foreground'
                  )}>
                    <span className="text-sm font-mono">
                      {(action.probability * 100).toFixed(0)}%
                    </span>
                    {action.selected && (
                      <span className="text-xs bg-success/20 px-2 py-0.5 rounded">
                        OPTIMAL
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
                {action.selected && (
                  <p className="text-xs text-success/80 mt-2 italic">
                    Reasoning: {action.reasoning}
                  </p>
                )}
              </div>
            </div>

            {/* Probability bar */}
            <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700',
                  action.selected ? 'bg-success' : 'bg-primary/50'
                )}
                style={{ width: `${action.probability * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="px-4 py-3 bg-secondary/30 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground text-center">
          ⚛️ Quantum-Inspired Optimization uses classical algorithms inspired by quantum computing principles.
          No actual quantum hardware is used.
        </p>
      </div>
    </div>
  );
};
