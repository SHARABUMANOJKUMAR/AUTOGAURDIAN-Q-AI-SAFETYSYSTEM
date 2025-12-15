import { useState, useEffect, useCallback } from 'react';
import type { SensorData, RiskAnalysis, RiskLevel, SafetyAction, Alert } from '@/types/vehicle';

const generateNormalData = (): SensorData => ({
  speed: 60 + Math.random() * 40,
  brakeTemperature: 80 + Math.random() * 50,
  tirePressure: {
    frontLeft: 32 + Math.random() * 4,
    frontRight: 32 + Math.random() * 4,
    rearLeft: 32 + Math.random() * 4,
    rearRight: 32 + Math.random() * 4,
  },
  engineTemperature: 85 + Math.random() * 20,
  batteryHealth: 85 + Math.random() * 15,
  fuelLevel: 40 + Math.random() * 50,
  timestamp: new Date(),
});

const generateHighRiskData = (): SensorData => ({
  speed: 120 + Math.random() * 40,
  brakeTemperature: 180 + Math.random() * 80,
  tirePressure: {
    frontLeft: 22 + Math.random() * 8,
    frontRight: 32 + Math.random() * 4,
    rearLeft: 32 + Math.random() * 4,
    rearRight: 18 + Math.random() * 6,
  },
  engineTemperature: 105 + Math.random() * 25,
  batteryHealth: 30 + Math.random() * 40,
  fuelLevel: 10 + Math.random() * 20,
  timestamp: new Date(),
});

const analyzeRisk = (data: SensorData): RiskAnalysis => {
  let score = 0;
  let rootCause = '';
  let explanation = '';
  let affectedComponent = '';

  // Speed analysis
  if (data.speed > 140) {
    score += 35;
    rootCause = 'Excessive Speed';
    explanation = 'Vehicle speed exceeds safe limits for current conditions';
    affectedComponent = 'Speedometer';
  } else if (data.speed > 120) {
    score += 20;
  }

  // Brake temperature analysis
  if (data.brakeTemperature > 220) {
    score += 40;
    rootCause = 'Brake System Overheating';
    explanation = 'Brake temperature critically high - risk of brake fade and failure';
    affectedComponent = 'Brake System';
  } else if (data.brakeTemperature > 180) {
    score += 25;
    if (!rootCause) {
      rootCause = 'Elevated Brake Temperature';
      explanation = 'Brake temperature above optimal range';
      affectedComponent = 'Brake System';
    }
  }

  // Tire pressure analysis
  const pressures = Object.values(data.tirePressure);
  const lowPressure = pressures.some((p) => p < 25);
  const veryLowPressure = pressures.some((p) => p < 20);

  if (veryLowPressure) {
    score += 35;
    rootCause = 'Critical Tire Pressure';
    explanation = 'Dangerously low tire pressure detected - immediate attention required';
    affectedComponent = 'Tire System';
  } else if (lowPressure) {
    score += 15;
    if (!rootCause) {
      rootCause = 'Low Tire Pressure';
      explanation = 'One or more tires below recommended pressure';
      affectedComponent = 'Tire System';
    }
  }

  // Engine temperature
  if (data.engineTemperature > 120) {
    score += 30;
    if (!rootCause) {
      rootCause = 'Engine Overheating';
      explanation = 'Engine temperature exceeds safe operating range';
      affectedComponent = 'Engine';
    }
  }

  // Battery health
  if (data.batteryHealth < 30) {
    score += 20;
    if (!rootCause) {
      rootCause = 'Low Battery Health';
      explanation = 'Battery degradation may affect vehicle systems';
      affectedComponent = 'Battery';
    }
  }

  score = Math.min(100, score);

  let level: RiskLevel = 'LOW';
  if (score >= 75) level = 'CRITICAL';
  else if (score >= 50) level = 'HIGH';
  else if (score >= 25) level = 'MEDIUM';

  if (!rootCause) {
    rootCause = 'Normal Operation';
    explanation = 'All systems operating within normal parameters';
    affectedComponent = 'None';
  }

  return { score, level, rootCause, explanation, affectedComponent };
};

const generateSafetyActions = (risk: RiskAnalysis): SafetyAction[] => {
  const actions: SafetyAction[] = [
    {
      id: '1',
      name: 'Continue Driving',
      description: 'Maintain current driving pattern with monitoring',
      probability: risk.level === 'LOW' ? 0.85 : risk.level === 'MEDIUM' ? 0.4 : 0.1,
      selected: false,
      reasoning: 'Continue if conditions are safe and stable',
    },
    {
      id: '2',
      name: 'Reduce Speed',
      description: 'Gradually decrease speed to reduce system stress',
      probability: risk.level === 'MEDIUM' ? 0.7 : risk.level === 'HIGH' ? 0.5 : 0.2,
      selected: false,
      reasoning: 'Speed reduction minimizes thermal and mechanical stress',
    },
    {
      id: '3',
      name: 'Pull Over Safely',
      description: 'Find a safe location to stop and allow systems to cool',
      probability: risk.level === 'HIGH' ? 0.75 : risk.level === 'CRITICAL' ? 0.6 : 0.15,
      selected: false,
      reasoning: 'Stopping prevents further damage and allows inspection',
    },
    {
      id: '4',
      name: 'Emergency Service',
      description: 'Contact emergency services and request immediate assistance',
      probability: risk.level === 'CRITICAL' ? 0.9 : risk.level === 'HIGH' ? 0.3 : 0.05,
      selected: false,
      reasoning: 'Professional intervention required for critical situations',
    },
  ];

  // Select the safest action (highest probability)
  const maxProb = Math.max(...actions.map((a) => a.probability));
  actions.forEach((a) => {
    a.selected = a.probability === maxProb;
  });

  return actions;
};

export const useSensorSimulation = () => {
  const [sensorData, setSensorData] = useState<SensorData>(generateNormalData());
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis>(analyzeRisk(sensorData));
  const [safetyActions, setSafetyActions] = useState<SafetyAction[]>(generateSafetyActions(riskAnalysis));
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isHighRiskMode, setIsHighRiskMode] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const generateAlert = useCallback((risk: RiskAnalysis): Alert | null => {
    if (risk.level === 'LOW') return null;

    const alertTypes: Record<RiskLevel, Alert['type']> = {
      LOW: 'info',
      MEDIUM: 'warning',
      HIGH: 'danger',
      CRITICAL: 'critical',
    };

    const voiceMessages: Record<RiskLevel, string> = {
      LOW: '',
      MEDIUM: `Attention driver. ${risk.rootCause} detected. Please monitor your vehicle systems.`,
      HIGH: `Warning! ${risk.rootCause} detected. ${risk.explanation}. Please reduce speed and prepare to pull over safely.`,
      CRITICAL: `Critical alert! ${risk.rootCause}. ${risk.explanation}. Please reduce speed immediately and pull over to a safe location. Emergency assistance may be required.`,
    };

    return {
      id: Date.now().toString(),
      type: alertTypes[risk.level],
      title: `${risk.level} RISK: ${risk.rootCause}`,
      message: risk.explanation,
      timestamp: new Date(),
      voiceMessage: voiceMessages[risk.level],
      acknowledged: false,
    };
  }, []);

  const toggleHighRiskMode = useCallback(() => {
    setIsHighRiskMode((prev) => !prev);
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newData = isHighRiskMode ? generateHighRiskData() : generateNormalData();
      setSensorData(newData);

      const newRisk = analyzeRisk(newData);
      setRiskAnalysis(newRisk);

      const newActions = generateSafetyActions(newRisk);
      setSafetyActions(newActions);

      const newAlert = generateAlert(newRisk);
      if (newAlert) {
        setAlerts((prev) => [newAlert, ...prev].slice(0, 10));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isHighRiskMode, isRunning, generateAlert]);

  return {
    sensorData,
    riskAnalysis,
    safetyActions,
    alerts,
    isHighRiskMode,
    isRunning,
    toggleHighRiskMode,
    toggleSimulation,
    acknowledgeAlert,
    clearAlerts,
  };
};
