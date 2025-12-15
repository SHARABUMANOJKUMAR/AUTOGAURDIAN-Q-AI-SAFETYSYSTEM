import { BarChart3, PieChart, TrendingUp, Shield, Lock } from 'lucide-react';
import { InsightCard } from '@/components/analytics/InsightCard';
import type { ManufacturerInsight } from '@/types/vehicle';

const mockInsights: ManufacturerInsight[] = [
  {
    componentName: 'Brake System',
    failureCount: 234,
    riskScore: 72,
    trend: 'decreasing',
  },
  {
    componentName: 'Tire Pressure Sensors',
    failureCount: 156,
    riskScore: 45,
    trend: 'stable',
  },
  {
    componentName: 'Battery Module',
    failureCount: 89,
    riskScore: 38,
    trend: 'increasing',
  },
  {
    componentName: 'Engine Cooling',
    failureCount: 67,
    riskScore: 55,
    trend: 'stable',
  },
  {
    componentName: 'Transmission',
    failureCount: 43,
    riskScore: 28,
    trend: 'decreasing',
  },
  {
    componentName: 'Electrical System',
    failureCount: 112,
    riskScore: 61,
    trend: 'increasing',
  },
];

const AnalyticsPage = () => {
  const totalEvents = mockInsights.reduce((sum, i) => sum + i.failureCount, 0);
  const avgRiskScore = Math.round(
    mockInsights.reduce((sum, i) => sum + i.riskScore, 0) / mockInsights.length
  );
  const criticalComponents = mockInsights.filter((i) => i.riskScore >= 60).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Manufacturer Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Aggregated fleet insights for safety improvements
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="glass-card rounded-xl border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Privacy Protected:</strong> All data shown is anonymized and aggregated.
            No personally identifiable information is collected or displayed.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Risk Events</p>
              <p className="font-orbitron text-2xl font-bold">{totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-warning/10 text-warning">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Risk Score</p>
              <p className="font-orbitron text-2xl font-bold">{avgRiskScore}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-danger/10 text-danger">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical Components</p>
              <p className="font-orbitron text-2xl font-bold">{criticalComponents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Component Insights */}
      <div>
        <h2 className="font-orbitron text-lg font-semibold mb-4">
          Component Risk Analysis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInsights.map((insight) => (
            <InsightCard key={insight.componentName} insight={insight} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Chart Placeholder */}
        <div className="glass-card rounded-xl border border-border/50 p-6">
          <h3 className="font-orbitron font-semibold mb-4">Risk Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-primary mx-auto mb-3 animate-spin-slow" />
              <p className="text-muted-foreground text-sm">
                Interactive charts powered by real-time data
              </p>
            </div>
          </div>
        </div>

        {/* Trend Chart Placeholder */}
        <div className="glass-card rounded-xl border border-border/50 p-6">
          <h3 className="font-orbitron font-semibold mb-4">Monthly Trends</h3>
          <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Historical data visualization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="glass-card rounded-xl border border-border/50 p-6">
        <h3 className="font-orbitron font-semibold mb-4">About This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="text-foreground font-semibold mb-2">Data Collection</h4>
            <p>
              Telemetry from fleet vehicles is aggregated in real-time to identify
              patterns and potential safety issues.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-2">Anonymization</h4>
            <p>
              All data is stripped of identifiable information before analysis.
              Individual vehicles cannot be traced.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-2">Usage</h4>
            <p>
              Insights help manufacturers improve vehicle safety and issue
              proactive recalls when patterns emerge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
