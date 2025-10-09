import React from 'react';
import { FileText } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificateCardProps {
  certificate: Certificate;
  onViewPdf: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onViewPdf }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'valid': return 'text-green-600 bg-green-50';
      case 'expiring': return 'text-amber-600 bg-amber-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <FileText className="w-8 h-8 text-gray-400 mt-1" />
          <div>
            <h4 className="font-semibold text-lg mb-1">{certificate.type}</h4>
            <p className="text-sm text-gray-600">
              Issued: {certificate.issueDate} • Expires: {certificate.expiryDate}
            </p>
            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(certificate.status)}`}>
                {certificate.status === 'expired' 
                  ? `Expired ${Math.abs(certificate.daysLeft)} days ago` 
                  : certificate.status === 'expiring'
                  ? `Expires in ${certificate.daysLeft} days`
                  : `Valid for ${certificate.daysLeft} days`
                }
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onViewPdf}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View PDF
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;
