import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Star, Clock, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ServiceCenter } from '@/types/vehicle';
import { toast } from '@/hooks/use-toast';

interface ServiceCenterCardProps {
  center: ServiceCenter;
  onBook: (centerId: string) => void;
}

export const ServiceCenterCard = ({ center, onBook }: ServiceCenterCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(center.booked);

  const handleBook = async () => {
    if (isBooked) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsBooking(false);
    setIsBooked(true);
    onBook(center.id);
    
    toast({
      title: "Emergency Service Booked",
      description: `Service at ${center.name} has been successfully booked. Drive safely.`,
    });
  };

  return (
    <div
      className={cn(
        'glass-card p-4 rounded-xl border transition-all duration-300',
        isBooked
          ? 'border-success/50 bg-success/5'
          : center.available
          ? 'border-border/50 hover:border-primary/50'
          : 'border-border/30 opacity-60'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-3 rounded-xl',
            isBooked
              ? 'bg-success/20 text-success'
              : 'bg-primary/10 text-primary'
          )}
        >
          <MapPin className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-orbitron font-semibold">{center.name}</h4>
              <p className="text-sm text-muted-foreground truncate">
                {center.address}
              </p>
            </div>
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{center.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {center.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {center.estimatedArrival}
            </span>
          </div>

          <div className="mt-4">
            {isBooked ? (
              <div className="flex items-center gap-2 text-success">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Booking Confirmed</span>
              </div>
            ) : (
              <Button
                onClick={handleBook}
                disabled={!center.available || isBooking}
                variant={center.available ? 'default' : 'secondary'}
                className="w-full"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking...
                  </>
                ) : center.available ? (
                  'Book Emergency Service'
                ) : (
                  'Currently Unavailable'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
