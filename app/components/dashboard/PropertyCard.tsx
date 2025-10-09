import React from 'react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'valid': return 'text-green-600 bg-green-50';
      case 'expiring': return 'text-amber-600 bg-amber-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div 
      className="p-6 hover:bg-gray-50 cursor-pointer transition"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{property.address}</h3>
            <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
              {property.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {property.city} • {property.postcode} • {property.bedrooms} bedrooms
          </p>

          <div className="flex flex-wrap gap-2">
            {property.certificates.map((cert) => (
              <div 
                key={cert.id} 
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}
              >
                {cert.type}: {cert.status === 'expired' ? 'Overdue' : `${cert.daysLeft} days`}
              </div>
            ))}
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
          <p className={`text-3xl font-bold ${getScoreColor(property.complianceScore)}`}>
            {property.complianceScore}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
