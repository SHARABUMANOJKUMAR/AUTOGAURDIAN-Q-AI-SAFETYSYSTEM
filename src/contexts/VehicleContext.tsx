import React, { createContext, useContext, ReactNode } from 'react';
import { useSensorSimulation } from '@/hooks/useSensorSimulation';
import type { SensorData, RiskAnalysis, SafetyAction, Alert } from '@/types/vehicle';

interface VehicleContextType {
  sensorData: SensorData;
  riskAnalysis: RiskAnalysis;
  safetyActions: SafetyAction[];
  alerts: Alert[];
  isHighRiskMode: boolean;
  isRunning: boolean;
  toggleHighRiskMode: () => void;
  toggleSimulation: () => void;
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const vehicleState = useSensorSimulation();

  return (
    <VehicleContext.Provider value={vehicleState}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
