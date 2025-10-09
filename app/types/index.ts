export interface Certificate {
  id: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  daysLeft: number;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  postcode: string;
  type: string;
  bedrooms: number;
  complianceScore: number;
  certificates: Certificate[];
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  days: number[];
}
