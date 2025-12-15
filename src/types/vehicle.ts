export interface SensorData {
  speed: number;
  brakeTemperature: number;
  tirePressure: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  engineTemperature: number;
  batteryHealth: number;
  fuelLevel: number;
  timestamp: Date;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RiskAnalysis {
  score: number;
  level: RiskLevel;
  rootCause: string;
  explanation: string;
  affectedComponent: string;
}

export interface SafetyAction {
  id: string;
  name: string;
  description: string;
  probability: number;
  selected: boolean;
  reasoning: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'danger' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  voiceMessage: string;
  acknowledged: boolean;
}

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  available: boolean;
  estimatedArrival: string;
  booked: boolean;
}

export interface ManufacturerInsight {
  componentName: string;
  failureCount: number;
  riskScore: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'processing';
  lastUpdate: Date;
  messageCount: number;
}
