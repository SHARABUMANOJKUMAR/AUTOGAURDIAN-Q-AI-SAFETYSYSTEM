import { Shield, AlertTriangle, Activity, Brain } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { cn } from '@/lib/utils';

const RiskCenter = () => {
  const { riskAnalysis, sensorData, alerts } = useVehicle();

  const recentAlerts = alerts.slice(0, 5);

  const getRiskDescription = () => {
    switch (riskAnalysis.level) {
      case 'CRITICAL':
        return 'Immediate attention required. Multiple safety systems are compromised.';
      case 'HIGH':
        return 'Elevated risk detected. Preventive action recommended.';
      case 'MEDIUM':
        return 'Minor anomalies detected. Continue monitoring.';
      default:
        return 'All systems operating within normal parameters.';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow flex items-center gap-3">
          <Shield className="w-8 h-8" />
          Risk & Safety Center
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered threat detection and safety analysis
        </p>
      </div>

      {/* Main Risk Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Gauge Panel */}
        <div className="glass-card rounded-xl border border-border/50 p-6">
          <div className="flex flex-col items-center">
            <RiskGauge score={riskAnalysis.score} level={riskAnalysis.level} size="lg" />
            
            <div className="mt-6 text-center max-w-md">
              <p className="text-muted-foreground">{getRiskDescription()}</p>
            </div>
          </div>
        </div>

        {/* Analysis Details */}
        <div className="space-y-4">
          {/* Root Cause Card */}
          <div
            className={cn(
              'glass-card rounded-xl border p-6',
              riskAnalysis.level === 'CRITICAL' && 'border-danger danger-glow',
              riskAnalysis.level === 'HIGH' && 'border-danger/50',
              riskAnalysis.level === 'MEDIUM' && 'border-warning/50',
              riskAnalysis.level === 'LOW' && 'border-success/50'
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  'p-3 rounded-xl',
                  riskAnalysis.level === 'CRITICAL' && 'bg-danger/20 text-danger',
                  riskAnalysis.level === 'HIGH' && 'bg-danger/10 text-danger',
                  riskAnalysis.level === 'MEDIUM' && 'bg-warning/10 text-warning',
                  riskAnalysis.level === 'LOW' && 'bg-success/10 text-success'
                )}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                  Root Cause
                </h3>
                <p
                  className={cn(
                    'font-orbitron text-xl font-bold mt-1',
                    riskAnalysis.level === 'CRITICAL' && 'text-danger animate-pulse',
                    riskAnalysis.level === 'HIGH' && 'text-danger',
                    riskAnalysis.level === 'MEDIUM' && 'text-warning',
                    riskAnalysis.level === 'LOW' && 'text-success'
                  )}
                >
                  {riskAnalysis.rootCause}
                </p>
              </div>
            </div>
          </div>

          {/* Affected Component */}
          <div className="glass-card rounded-xl border border-border/50 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                  Affected Component
                </h3>
                <p className="font-orbitron text-xl font-bold mt-1">
                  {riskAnalysis.affectedComponent}
                </p>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="glass-card rounded-xl border border-border/50 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-neon-purple/10 text-neon-purple">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider">
                  AI Analysis
                </h3>
                <p className="mt-2 text-foreground/90">
                  {riskAnalysis.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <h2 className="font-orbitron text-lg font-semibold mb-4">
          Recent Alerts
        </h2>
        {recentAlerts.length > 0 ? (
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'glass-card rounded-lg border p-4 flex items-start gap-4',
                  alert.type === 'critical' && 'border-danger/50 bg-danger/5',
                  alert.type === 'danger' && 'border-danger/30',
                  alert.type === 'warning' && 'border-warning/30',
                  alert.type === 'info' && 'border-primary/30'
                )}
              >
                <AlertTriangle
                  className={cn(
                    'w-5 h-5 flex-shrink-0 mt-0.5',
                    alert.type === 'critical' && 'text-danger animate-pulse',
                    alert.type === 'danger' && 'text-danger',
                    alert.type === 'warning' && 'text-warning',
                    alert.type === 'info' && 'text-primary'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-sm truncate">
                      {alert.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-xl border border-border/50 p-8 text-center">
            <Shield className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No recent alerts. System operating normally.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskCenter;
