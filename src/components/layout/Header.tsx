import { Shield, Activity, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useVehicle } from '@/contexts/VehicleContext';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Activity },
  { path: '/risk-center', label: 'Risk Center', icon: Shield },
  { path: '/quantum-optimizer', label: 'Quantum Optimizer', icon: Settings },
  { path: '/emergency', label: 'Emergency', icon: Shield },
  { path: '/analytics', label: 'Analytics', icon: Activity },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { riskAnalysis, isRunning } = useVehicle();

  const getRiskColor = () => {
    switch (riskAnalysis.level) {
      case 'CRITICAL':
        return 'text-danger animate-pulse';
      case 'HIGH':
        return 'text-danger';
      case 'MEDIUM':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-primary/30 blur-lg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-orbitron text-lg md:text-xl font-bold text-primary text-glow">
                AUTO GUARDIAN
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-widest">
                Q-AI SAFETY SYSTEM
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                    'hover:bg-primary/10 hover:text-primary',
                    isActive && 'bg-primary/20 text-primary neon-border'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    isRunning ? 'bg-success animate-pulse' : 'bg-muted'
                  )}
                />
                <span className="text-xs text-muted-foreground">
                  {isRunning ? 'LIVE' : 'PAUSED'}
                </span>
              </div>
              <div className={cn('font-orbitron text-sm font-bold', getRiskColor())}>
                {riskAnalysis.level}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-in-up">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                    'hover:bg-primary/10 hover:text-primary',
                    isActive && 'bg-primary/20 text-primary'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
