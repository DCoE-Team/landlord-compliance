import { Property } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    address: '45 Oak Lane',
    city: 'Manchester',
    postcode: 'M15 4JK',
    type: 'House',
    bedrooms: 3,
    complianceScore: 95,
    certificates: [
      { id: 'c1', type: 'Gas Safety', issueDate: '2024-03-15', expiryDate: '2025-03-15', status: 'valid', daysLeft: 164 },
      { id: 'c2', type: 'EICR', issueDate: '2023-01-10', expiryDate: '2028-01-10', status: 'valid', daysLeft: 1195 },
      { id: 'c3', type: 'EPC', issueDate: '2020-05-20', expiryDate: '2030-05-20', status: 'valid', daysLeft: 1692 }
    ]
  },
  {
    id: '2',
    address: '12A High Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    type: 'Flat',
    bedrooms: 2,
    complianceScore: 70,
    certificates: [
      { id: 'c4', type: 'Gas Safety', issueDate: '2024-09-01', expiryDate: '2025-09-01', status: 'valid', daysLeft: 334 },
      { id: 'c5', type: 'EICR', issueDate: '2024-08-15', expiryDate: '2024-11-15', status: 'expiring', daysLeft: 44 },
      { id: 'c6', type: 'EPC', issueDate: '2024-01-01', expiryDate: '2034-01-01', status: 'valid', daysLeft: 3378 }
    ]
  },
  {
    id: '3',
    address: '78 Victoria Road',
    city: 'Birmingham',
    postcode: 'B15 2TU',
    type: 'HMO',
    bedrooms: 5,
    complianceScore: 40,
    certificates: [
      { id: 'c7', type: 'Gas Safety', issueDate: '2023-12-01', expiryDate: '2024-09-01', status: 'expired', daysLeft: -31 },
      { id: 'c8', type: 'HMO License', issueDate: '2024-01-15', expiryDate: '2025-01-15', status: 'valid', daysLeft: 105 },
      { id: 'c9', type: 'Fire Safety', issueDate: '2024-08-01', expiryDate: '2024-10-15', status: 'expiring', daysLeft: 13 }
    ]
  }
];

export const CERTIFICATE_TYPES = [
  'Gas Safety', 'EICR', 'EPC', 'HMO License', 'Legionella', 'Fire Safety', 'Deposit Protection', 'Right to Rent'
];
