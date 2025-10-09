import React from 'react';
import { Property } from '../../types';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  onAddProperty: () => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onPropertyClick,
  onAddProperty,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Properties</h2>
        <button
          onClick={onAddProperty}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          Add Property
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => onPropertyClick(property)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
