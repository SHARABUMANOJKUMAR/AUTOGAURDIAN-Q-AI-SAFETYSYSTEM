import { useEffect, useRef } from 'react';
import { AlertTriangle, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVehicle } from '@/contexts/VehicleContext';
import { useVoiceAlert } from '@/hooks/useVoiceAlert';
import { Button } from '@/components/ui/button';

export const AlertBanner = () => {
  const { alerts, acknowledgeAlert, riskAnalysis } = useVehicle();
  const { speak, stop, isSpeaking } = useVoiceAlert();
  const lastAlertRef = useRef<string | null>(null);

  const latestAlert = alerts.find((a) => !a.acknowledged);

  useEffect(() => {
    if (
      latestAlert &&
      latestAlert.voiceMessage &&
      latestAlert.id !== lastAlertRef.current &&
      (latestAlert.type === 'danger' || latestAlert.type === 'critical')
    ) {
      lastAlertRef.current = latestAlert.id;
      speak(latestAlert.voiceMessage);
    }
  }, [latestAlert, speak]);

  if (!latestAlert || riskAnalysis.level === 'LOW') return null;

  const getAlertStyles = () => {
    switch (latestAlert.type) {
      case 'critical':
        return 'bg-danger/20 border-danger text-danger animate-danger-pulse';
      case 'danger':
        return 'bg-danger/10 border-danger/50 text-danger';
      case 'warning':
        return 'bg-warning/10 border-warning/50 text-warning';
      default:
        return 'bg-primary/10 border-primary/50 text-primary';
    }
  };

  return (
    <div
      className={cn(
        'fixed top-20 md:top-24 left-4 right-4 z-40',
        'glass-card border-2 p-4 rounded-xl',
        'animate-slide-in',
        getAlertStyles()
      )}
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-orbitron font-bold text-sm md:text-base">
            {latestAlert.title}
          </h3>
          <p className="text-sm opacity-90 mt-1">{latestAlert.message}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (isSpeaking ? stop() : speak(latestAlert.voiceMessage))}
            className="text-current hover:bg-current/10"
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              stop();
              acknowledgeAlert(latestAlert.id);
            }}
            className="text-current hover:bg-current/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
