import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ManufacturerInsight } from '@/types/vehicle';

interface InsightCardProps {
  insight: ManufacturerInsight;
}

export const InsightCard = ({ insight }: InsightCardProps) => {
  const getTrendIcon = () => {
    switch (insight.trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-danger" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-success" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRiskColor = () => {
    if (insight.riskScore >= 70) return 'text-danger';
    if (insight.riskScore >= 40) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="glass-card p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h4 className="font-orbitron font-semibold text-sm">
          {insight.componentName}
        </h4>
        {getTrendIcon()}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Failure Count</p>
          <p className="font-orbitron text-xl font-bold">
            {insight.failureCount}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Risk Score</p>
          <p className={cn('font-orbitron text-xl font-bold', getRiskColor())}>
            {insight.riskScore}
          </p>
        </div>
      </div>

      {/* Risk bar */}
      <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            insight.riskScore >= 70 && 'bg-danger',
            insight.riskScore >= 40 && insight.riskScore < 70 && 'bg-warning',
            insight.riskScore < 40 && 'bg-success'
          )}
          style={{ width: `${insight.riskScore}%` }}
        />
      </div>
    </div>
  );
};
