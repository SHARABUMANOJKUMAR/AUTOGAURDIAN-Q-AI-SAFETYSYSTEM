import { Atom, Cpu, Sparkles } from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { QuantumOptimizer } from '@/components/quantum/QuantumOptimizer';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { cn } from '@/lib/utils';

const QuantumOptimizerPage = () => {
  const { riskAnalysis, safetyActions } = useVehicle();

  const isOptimizerActive = riskAnalysis.level === 'HIGH' || riskAnalysis.level === 'CRITICAL';
  const selectedAction = safetyActions.find((a) => a.selected);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow flex items-center gap-3">
          <Atom className={cn('w-8 h-8', isOptimizerActive && 'animate-spin-slow')} />
          Quantum Safety Optimizer
        </h1>
        <p className="text-muted-foreground mt-1">
          Quantum-inspired decision optimization for accident prevention
        </p>
      </div>

      {/* Status Banner */}
      <div
        className={cn(
          'glass-card rounded-xl border p-6',
          isOptimizerActive
            ? 'border-primary neon-border bg-primary/5'
            : 'border-border/50'
        )}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            className={cn(
              'p-4 rounded-xl',
              isOptimizerActive
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Cpu className={cn('w-8 h-8', isOptimizerActive && 'animate-pulse')} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-orbitron text-xl font-bold">
              {isOptimizerActive
                ? 'Optimizer Active - Evaluating Safety Pathways'
                : 'Optimizer Standby - Low Risk Detected'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {isOptimizerActive
                ? 'Quantum-inspired algorithms are evaluating multiple safety actions simultaneously'
                : 'Optimizer activates automatically when risk level reaches HIGH or CRITICAL'}
            </p>
          </div>
          <RiskGauge score={riskAnalysis.score} level={riskAnalysis.level} size="sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optimizer Panel */}
        <div className="lg:col-span-2">
          <QuantumOptimizer actions={safetyActions} isActive={isOptimizerActive} />
        </div>

        {/* Selected Action Details */}
        <div className="space-y-4">
          {/* Recommended Action */}
          <div
            className={cn(
              'glass-card rounded-xl border p-6',
              isOptimizerActive && selectedAction
                ? 'border-success bg-success/5 success-glow'
                : 'border-border/50'
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles
                className={cn(
                  'w-6 h-6',
                  isOptimizerActive ? 'text-success' : 'text-muted-foreground'
                )}
              />
              <h3 className="font-orbitron font-semibold">Recommended Action</h3>
            </div>

            {selectedAction && isOptimizerActive ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-orbitron text-2xl font-bold text-success">
                    {selectedAction.name}
                  </h4>
                  <p className="text-muted-foreground mt-2">
                    {selectedAction.description}
                  </p>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                  <p className="text-sm text-success">
                    <strong>Optimization Reasoning:</strong>
                    <br />
                    {selectedAction.reasoning}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Safety Probability</span>
                  <span className="font-orbitron font-bold text-success">
                    {(selectedAction.probability * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active recommendation</p>
                <p className="text-sm mt-1">
                  System will provide guidance when risk is elevated
                </p>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="glass-card rounded-xl border border-border/50 p-6">
            <h3 className="font-orbitron font-semibold mb-4">How It Works</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <p>Sensor data feeds into risk analysis engine</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <p>Quantum-inspired algorithms evaluate multiple pathways</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <p>Optimal safety action is selected based on probability</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <p>Driver is notified via voice and visual alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumOptimizerPage;
