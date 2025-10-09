"use client";
import React, { useState } from 'react';
import { Calendar, Upload, Bell, Home, AlertTriangle, CheckCircle, Clock, FileText, Plus, X, Settings } from 'lucide-react';

// Mock data
const MOCK_PROPERTIES = [
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

const CERTIFICATE_TYPES = [
  'Gas Safety', 'EICR', 'EPC', 'HMO License', 'Legionella', 'Fire Safety', 'Deposit Protection', 'Right to Rent'
];

const ComplianceTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    days: [90, 60, 30, 14, 7]
  });

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

  const getDashboardStats = () => {
    const total = properties.length;
    const compliant = properties.filter((p:any) => p.complianceScore >= 80).length;
    const allCerts = properties.flatMap((p:any) => p.certificates);
    const expiring = allCerts.filter((c:any) => c.status === 'expiring').length;
    const expired = allCerts.filter((c:any) => c.status === 'expired').length;
    return { total, compliant, expiring, expired };
  };

  const stats = getDashboardStats();

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <Home className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fully Compliant</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.compliant}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{stats.expiring}</p>
            </div>
            <Clock className="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.expired}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Properties</h2>
          <button 
            onClick={() => setShowAddPropertyModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {properties.map((property:any) => (
            <div 
              key={property.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer transition"
              onClick={() => setSelectedProperty(property)}
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
                    {property.certificates.map((cert:any) => (
                      <div key={cert.id} className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
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
          ))}
        </div>
      </div>
    </div>
  );

  // Property Detail View
  const PropertyDetailView = () => {
    if (!selectedProperty) return <DashboardView />;

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedProperty(null)}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Properties
        </button>

        {/* Property Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedProperty.address}</h2>
              <p className="text-gray-600">
                {selectedProperty.city} • {selectedProperty.postcode}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedProperty.type} • {selectedProperty.bedrooms} bedrooms
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(selectedProperty.complianceScore)}`}>
                {selectedProperty.complianceScore}
              </p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold">Certificates</h3>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Certificate
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {selectedProperty.certificates.map((cert:any) => (
              <div key={cert.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <FileText className="w-8 h-8 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{cert.type}</h4>
                      <p className="text-sm text-gray-600">
                        Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                      </p>
                      <div className="mt-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                          {cert.status === 'expired' 
                            ? `Expired ${Math.abs(cert.daysLeft)} days ago` 
                            : cert.status === 'expiring'
                            ? `Expires in ${cert.daysLeft} days`
                            : `Valid for ${cert.daysLeft} days`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Calendar View
  const CalendarView = () => {
    const upcomingRenewals = properties
      .flatMap((p:any) => p.certificates.map((c:any) => ({ ...c, property: p })))
      .filter((c:any) => c.status !== 'expired')
      .sort((a:any, b:any) => a.daysLeft - b.daysLeft)
      .slice(0, 10);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Renewals</h2>
          <div className="space-y-4">
            {upcomingRenewals.map((renewal:any) => (
              <div key={renewal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    renewal.daysLeft <= 30 ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <p className={`text-2xl font-bold ${
                      renewal.daysLeft <= 30 ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {renewal.daysLeft}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">{renewal.type}</h4>
                    <p className="text-sm text-gray-600">{renewal.property.address}</p>
                    <p className="text-xs text-gray-500 mt-1">Expires: {renewal.expiryDate}</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Book Renewal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings View
  const SettingsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-semibold">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive compliance reminders via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-semibold">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Get urgent alerts via text message</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="py-3">
            <h4 className="font-semibold mb-3">Notification Schedule</h4>
            <p className="text-sm text-gray-600 mb-4">Choose when to receive reminders before certificate expiry</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[90, 60, 30, 14, 7].map((day) => (
                <label key={day} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.days.includes(day)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNotifications({...notifications, days: [...notifications.days, day].sort((a,b:any) => b-a)});
                      } else {
                        setNotifications({...notifications, days: notifications.days.filter((d:any) => d !== day)});
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm">{day} days</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Subscription</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Premium Plan</h4>
            <p className="text-2xl font-bold text-blue-600 mb-2">£5 <span className="text-sm font-normal">/property/month</span></p>
            <p className="text-sm text-gray-600">Currently managing {properties.length} properties</p>
          </div>
          <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );

  // Upload Modal
  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Upload Certificate</h3>
          <button onClick={() => setShowUploadModal(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Certificate Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              {CERTIFICATE_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Issue Date</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Certificate uploaded successfully! (Demo)');
                setShowUploadModal(false);
              }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add Property Modal
  const AddPropertyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Property</h3>
          <button onClick={() => setShowAddPropertyModal(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Property Address</label>
            <input type="text" placeholder="45 Oak Lane" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input type="text" placeholder="Manchester" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postcode</label>
            <input type="text" placeholder="M15 4JK" className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Property Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>House</option>
              <option>Flat</option>
              <option>HMO</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bedrooms</label>
            <input type="number" min="1" defaultValue={2} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setShowAddPropertyModal(false)}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Property added successfully! (Demo)');
                setShowAddPropertyModal(false);
              }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stats.expired + stats.expiring}
                </span>
              </button>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSelectedProperty(null);
              }}
              className={`py-4 border-b-2 font-medium ${
                activeTab === 'dashboard' && !selectedProperty
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 border-b-2 font-medium ${
                activeTab === 'calendar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 border-b-2 font-medium ${
                activeTab === 'settings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedProperty ? (
          <PropertyDetailView />
        ) : activeTab === 'dashboard' ? (
          <DashboardView />
        ) : activeTab === 'calendar' ? (
          <CalendarView />
        ) : (
          <SettingsView />
        )}
      </main>

      {/* Modals */}
      {showUploadModal && <UploadModal />}
      {showAddPropertyModal && <AddPropertyModal />}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>💡 <strong>Prototype Demo</strong> - Click around to test the user experience</p>
        </div>
      </footer>
    </div>
  );
};

export default function Page() {
  return <ComplianceTracker />;
}
