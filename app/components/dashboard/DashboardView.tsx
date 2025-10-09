import React from 'react';
import { Home, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';
import PropertyList from './PropertyList';
import { Property } from '../../types';

interface DashboardViewProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  onAddProperty: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  properties,
  onPropertySelect,
  onAddProperty,
}) => {
  const getDashboardStats = () => {
    const total = properties.length;
    const compliant = properties.filter((p) => p.complianceScore >= 80).length;
    const allCerts = properties.flatMap((p) => p.certificates);
    const expiring = allCerts.filter((c) => c.status === 'expiring').length;
    const expired = allCerts.filter((c) => c.status === 'expired').length;
    return { total, compliant, expiring, expired };
  };

  const stats = getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Properties"
          value={stats.total}
          icon={Home}
          color="blue"
        />
        <StatsCard
          title="Fully Compliant"
          value={stats.compliant}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Expiring Soon"
          value={stats.expiring}
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="Overdue"
          value={stats.expired}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Properties List */}
      <PropertyList
        properties={properties}
        onPropertyClick={onPropertySelect}
        onAddProperty={onAddProperty}
      />
    </div>
  );
};

export default DashboardView;
