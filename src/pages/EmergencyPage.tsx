import { useState } from 'react';
import { Phone, MapPin, AlertCircle } from 'lucide-react';
import { ServiceCenterCard } from '@/components/emergency/ServiceCenterCard';
import { useVehicle } from '@/contexts/VehicleContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ServiceCenter } from '@/types/vehicle';

const initialServiceCenters: ServiceCenter[] = [
  {
    id: '1',
    name: 'AutoCare Express',
    address: '1234 Highway Drive, Tech Park',
    distance: 2.3,
    rating: 4.8,
    available: true,
    estimatedArrival: '8 min',
    booked: false,
  },
  {
    id: '2',
    name: 'QuickFix Motors',
    address: '567 Industrial Ave, Zone B',
    distance: 4.1,
    rating: 4.5,
    available: true,
    estimatedArrival: '12 min',
    booked: false,
  },
  {
    id: '3',
    name: 'Premium Auto Service',
    address: '890 Main Street, Downtown',
    distance: 5.7,
    rating: 4.9,
    available: true,
    estimatedArrival: '15 min',
    booked: false,
  },
  {
    id: '4',
    name: 'RoadSide Rescue',
    address: '321 Service Road, Block C',
    distance: 7.2,
    rating: 4.3,
    available: false,
    estimatedArrival: '22 min',
    booked: false,
  },
];

const EmergencyPage = () => {
  const { riskAnalysis } = useVehicle();
  const [serviceCenters, setServiceCenters] = useState(initialServiceCenters);
  const [bookedCenter, setBookedCenter] = useState<string | null>(null);

  const handleBook = (centerId: string) => {
    setBookedCenter(centerId);
    setServiceCenters((prev) =>
      prev.map((center) =>
        center.id === centerId ? { ...center, booked: true } : center
      )
    );
  };

  const isEmergencyActive = riskAnalysis.level === 'HIGH' || riskAnalysis.level === 'CRITICAL';

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-primary text-glow flex items-center gap-3">
            <Phone className="w-8 h-8" />
            Emergency Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Book roadside assistance and emergency support
          </p>
        </div>

        <Button
          variant={isEmergencyActive ? 'critical' : 'outline'}
          size="lg"
          className="gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {isEmergencyActive ? 'EMERGENCY ACTIVE' : 'Services Ready'}
        </Button>
      </div>

      {/* Emergency Alert */}
      {isEmergencyActive && (
        <div
          className={cn(
            'glass-card rounded-xl border-2 p-6',
            'border-danger bg-danger/10 animate-danger-pulse'
          )}
        >
          <div className="flex items-center gap-4">
            <AlertCircle className="w-10 h-10 text-danger" />
            <div>
              <h2 className="font-orbitron text-xl font-bold text-danger">
                Emergency Mode Active
              </h2>
              <p className="text-danger/80 mt-1">
                Risk Level: {riskAnalysis.level} | Root Cause: {riskAnalysis.rootCause}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We recommend booking emergency service immediately for your safety.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation */}
      {bookedCenter && (
        <div className="glass-card rounded-xl border border-success bg-success/10 p-6 success-glow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/20">
              <MapPin className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="font-orbitron text-lg font-bold text-success">
                Emergency Service Successfully Booked
              </h3>
              <p className="text-success/80 mt-1">
                {serviceCenters.find((c) => c.id === bookedCenter)?.name} is on the way.
                Drive safely and pull over when possible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Service Centers */}
      <div>
        <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Nearby Service Centers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceCenters.map((center) => (
            <ServiceCenterCard
              key={center.id}
              center={center}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="glass-card rounded-xl border border-border/50 p-6">
        <h2 className="font-orbitron text-lg font-semibold mb-4">
          Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="danger" size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Emergency: 911
          </Button>
          <Button variant="warning" size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Roadside: 1-800-HELP
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Insurance: 1-800-CLAIM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
