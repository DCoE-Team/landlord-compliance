import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'amber';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
}) => {
  const colors = {
    blue: { text: 'text-blue-600', bg: 'bg-blue-500', icon: 'text-blue-500' },
    green: { text: 'text-green-600', bg: 'bg-green-500', icon: 'text-green-500' },
    red: { text: 'text-red-600', bg: 'bg-red-500', icon: 'text-red-500' },
    amber: { text: 'text-amber-600', bg: 'bg-amber-500', icon: 'text-amber-500' },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${colors[color].text}`}>
            {value}
          </p>
        </div>
        <Icon className={`w-10 h-10 ${colors[color].icon}`} />
      </div>
    </div>
  );
};

export default StatsCard;
