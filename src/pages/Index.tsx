import {
  Gauge,
  Thermometer,
  CircleDot,
  Battery,
  Fuel,
  Zap,
  Play,
  Pause,
} from 'lucide-react';
import { useVehicle } from '@/contexts/VehicleContext';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { SensorCard } from '@/components/dashboard/SensorCard';
import { AgentStatusCard } from '@/components/dashboard/AgentStatusCard';
import { ModeToggle } from '@/components/dashboard/ModeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const agents = [
  {
    name: 'Sensor Agent',
    description: 'Real-time vehicle telemetry monitoring and data collection',
    status: 'active' as const,
  },
  {
    name: 'AI Risk Analysis Agent',
    description: 'Continuous anomaly detection and risk score calculation',
    status: 'processing' as const,
  },
  {
    name: 'Quantum Optimizer Agent',
    description: 'Multi-path safety decision evaluation using hybrid algorithms',
    status: 'active' as const,
  },
  {
    name: 'Driver Communication Agent',
    description: 'Voice and visual alert generation for driver safety',
    status: 'active' as const,
  },
  {
    name: 'Service Coordination Agent',
    description: 'Emergency service discovery and booking management',
    status: 'idle' as const,
  },
  {
    name: 'Manufacturer Insights Agent',
    description: 'Aggregated analytics for fleet safety improvements',
    status: 'idle' as const,
  },
];

const Index = () => {
  const {
    sensorData,
    riskAnalysis,
    isHighRiskMode,
    isRunning,
    toggleHighRiskMode,
    toggleSimulation,
  } = useVehicle();

  const getSensorStatus = (value: number, warningThreshold: number, dangerThreshold: number) => {
    if (value >= dangerThreshold) return 'danger';
    if (value >= warningThreshold) return 'warning';
    return 'normal';
  };

  const avgTirePressure =
    (sensorData.tirePressure.frontLeft +
      sensorData.tirePressure.frontRight +
      sensorData.tirePressure.rearLeft +
      sensorData.tirePressure.rearRight) /
    4;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow">
            Live Vehicle Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and accident prevention system
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant={isRunning ? 'outline' : 'default'}
            onClick={toggleSimulation}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Resume
              </>
            )}
          </Button>
          <ModeToggle isHighRisk={isHighRiskMode} onToggle={toggleHighRiskMode} />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Risk Gauge */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl border border-border/50 p-6 h-full flex flex-col items-center justify-center">
            <h3 className="font-orbitron text-sm text-muted-foreground mb-4 uppercase tracking-widest">
              Risk Assessment
            </h3>
            <RiskGauge score={riskAnalysis.score} level={riskAnalysis.level} size="lg" />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">Root Cause</p>
              <p
                className={cn(
                  'font-orbitron font-semibold mt-1',
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

        {/* Right Column - Sensor Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SensorCard
              icon={Gauge}
              label="Speed"
              value={sensorData.speed}
              unit="km/h"
              status={getSensorStatus(sensorData.speed, 120, 140)}
              trend={sensorData.speed > 100 ? 'up' : 'stable'}
            />
            <SensorCard
              icon={Thermometer}
              label="Brake Temp"
              value={sensorData.brakeTemperature}
              unit="°C"
              status={getSensorStatus(sensorData.brakeTemperature, 180, 220)}
              trend={sensorData.brakeTemperature > 150 ? 'up' : 'stable'}
            />
            <SensorCard
              icon={CircleDot}
              label="Tire Pressure"
              value={avgTirePressure}
              unit="PSI"
              status={avgTirePressure < 25 ? 'danger' : avgTirePressure < 30 ? 'warning' : 'normal'}
              trend={avgTirePressure < 30 ? 'down' : 'stable'}
            />
            <SensorCard
              icon={Zap}
              label="Engine Temp"
              value={sensorData.engineTemperature}
              unit="°C"
              status={getSensorStatus(sensorData.engineTemperature, 105, 120)}
              trend={sensorData.engineTemperature > 100 ? 'up' : 'stable'}
            />
            <SensorCard
              icon={Battery}
              label="Battery Health"
              value={sensorData.batteryHealth}
              unit="%"
              status={sensorData.batteryHealth < 30 ? 'danger' : sensorData.batteryHealth < 50 ? 'warning' : 'normal'}
              trend={sensorData.batteryHealth < 50 ? 'down' : 'stable'}
            />
            <SensorCard
              icon={Fuel}
              label="Fuel Level"
              value={sensorData.fuelLevel}
              unit="%"
              status={sensorData.fuelLevel < 15 ? 'danger' : sensorData.fuelLevel < 25 ? 'warning' : 'normal'}
              trend={sensorData.fuelLevel < 30 ? 'down' : 'stable'}
            />
          </div>
        </div>
      </div>

      {/* AI Agents Status */}
      <div>
        <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Multi-Agent System Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentStatusCard
              key={agent.name}
              name={agent.name}
              description={agent.description}
              status={agent.status}
              lastUpdate={new Date()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
