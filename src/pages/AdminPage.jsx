import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Tabs from '../components/Tabs';
import Modal from '../components/Modal';
import Table from '../components/Table';
import Notification from '../components/Notification';
import { clients as initialClients } from '../data/clients';
import { users as initialUsers } from '../data/users';
import { formatCurrency } from '../utils/formatters';

// Helper function to format user roles for display
const formatUserRoles = (user, clientsList) => {
  if (!user.roles || user.roles.length === 0) return 'No roles assigned';
  
  return user.roles.map(role => {
    if (role.type === 'Trader') {
      const companyNames = role.companies
        .map(companyId => clientsList.find(c => c.id === companyId)?.name)
        .filter(Boolean)
        .join(', ');
      const limit = formatCurrency(role.dailyLimit, 'EUR');
      return `Trader (${companyNames}: ${limit})`;
    } else if (role.type === 'Middle Office') {
      const companyNames = role.companies
        .map(companyId => clientsList.find(c => c.id === companyId)?.name)
        .filter(Boolean)
        .join(', ');
      return `Middle Office (${companyNames})`;
    } else if (role.type === 'Admin') {
      const privileges = role.privileges?.join(', ') || 'All privileges';
      return `Admin (${privileges})`;
    }
    return role.type;
  }).join(' | ');
};

// Helper to get company access list
const getCompanyAccess = (user, clientsList) => {
  const companyIds = new Set();
  user.roles?.forEach(role => {
    if (role.companies) {
      role.companies.forEach(id => companyIds.add(id));
    }
  });
  
  if (companyIds.size === 0) return 'All companies';
  
  return Array.from(companyIds)
    .map(id => clientsList.find(c => c.id === id)?.name)
    .filter(Boolean)
    .join(', ');
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('Clients');
  const [clients, setClients] = useState(initialClients);
  const [users, setUsers] = useState(initialUsers);
  
  // Modal states
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  
  // Selected user for editing
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    traderCompanies: [],
    dailyLimit: '',
    middleOfficeCompanies: [],
    adminPrivileges: []
  });
  
  // Notification state
  const [notification, setNotification] = useState(null);
  
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Handle Add Client
  const handleAddClient = () => {
    if (!formData.name || !formData.email) {
      showNotification('error', 'Please fill in all fields');
      return;
    }
    
    const newClient = {
      id: Date.now(),
      name: formData.name,
      contactEmail: formData.email,
      status: 'Active',
      users: []
    };
    
    setClients([...clients, newClient]);
    setShowAddClientModal(false);
    setFormData({ ...formData, name: '', email: '' });
    showNotification('success', `Client "${newClient.name}" added successfully`);
  };
  
  // Handle Invite User
  const handleInviteUser = () => {
    if (!formData.email) {
      showNotification('error', 'Please enter an email address');
      return;
    }
    
    showNotification('success', `Invitation sent to ${formData.email}`);
    setShowInviteUserModal(false);
    setFormData({ ...formData, email: '' });
  };
  
  // Handle Edit User - Open modal
  const handleEditUser = (user) => {
    setSelectedUser(user);
    
    // Pre-populate form data
    const traderRole = user.roles.find(r => r.type === 'Trader');
    const middleOfficeRole = user.roles.find(r => r.type === 'Middle Office');
    const adminRole = user.roles.find(r => r.type === 'Admin');
    
    setFormData({
      name: user.name,
      email: user.email,
      traderCompanies: traderRole?.companies || [],
      dailyLimit: traderRole?.dailyLimit?.toString() || '',
      middleOfficeCompanies: middleOfficeRole?.companies || [],
      adminPrivileges: adminRole?.privileges || []
    });
    
    setShowEditUserModal(true);
  };
  
  // Handle Save User
  const handleSaveUser = () => {
    if (!selectedUser) return;
    
    // Build new roles array
    const newRoles = [];
    
    // Add Trader role if companies selected
    if (formData.traderCompanies.length > 0) {
      newRoles.push({
        type: 'Trader',
        companies: formData.traderCompanies,
        dailyLimit: parseFloat(formData.dailyLimit) || 0
      });
    }
    
    // Add Middle Office role if companies selected
    if (formData.middleOfficeCompanies.length > 0) {
      newRoles.push({
        type: 'Middle Office',
        companies: formData.middleOfficeCompanies
      });
    }
    
    // Add Admin role if privileges selected
    if (formData.adminPrivileges.length > 0) {
      newRoles.push({
        type: 'Admin',
        privileges: formData.adminPrivileges
      });
    }
    
    // Update user in users array
    const updatedUsers = users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, roles: newRoles }
        : u
    );
    
    setUsers(updatedUsers);
    setShowEditUserModal(false);
    setSelectedUser(null);
    showNotification('success', 'User updated successfully');
  };
  
  // Handle multi-select for companies and privileges
  const handleMultiSelectChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const valueNum = typeof value === 'string' ? parseInt(value) : value;
      
      if (currentValues.includes(valueNum)) {
        return { ...prev, [field]: currentValues.filter(v => v !== valueNum) };
      } else {
        return { ...prev, [field]: [...currentValues, valueNum] };
      }
    });
  };
  
  const handlePrivilegeToggle = (privilege) => {
    setFormData(prev => {
      const currentPrivileges = prev.adminPrivileges || [];
      if (currentPrivileges.includes(privilege)) {
        return { ...prev, adminPrivileges: currentPrivileges.filter(p => p !== privilege) };
      } else {
        return { ...prev, adminPrivileges: [...currentPrivileges, privilege] };
      }
    });
  };
  
  // Client columns
  const clientColumns = [
    { key: 'name', label: 'Company Name' },
    { key: 'contactEmail', label: 'Contact Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => showNotification('info', `Edit functionality for ${row.name}`)}
        >
          Edit
        </Button>
      )
    }
  ];
  
  // User columns
  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'roles',
      label: 'Role(s)',
      render: (value, row) => formatUserRoles(row, clients)
    },
    {
      key: 'companyAccess',
      label: 'Company Access',
      render: (value, row) => getCompanyAccess(row, clients)
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => handleEditUser(row)}
        >
          Edit
        </Button>
      )
    }
  ];
  
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtitle">Manage B2B clients, users, and access privileges</p>
      </div>
      
      {/* Notification */}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      
      {/* Tabs */}
      <div className="admin-tabs">
        <Tabs
          tabs={['Clients', 'Users']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {/* Clients Tab */}
      {activeTab === 'Clients' && (
        <Card>
          <div className="admin-actions">
            <Button 
              variant="primary"
              onClick={() => setShowAddClientModal(true)}
            >
              + Add Client
            </Button>
          </div>
          
          <Table
            columns={clientColumns}
            data={clients}
            onRowClick={(client) => console.log('Client clicked:', client)}
          />
        </Card>
      )}
      
      {/* Users Tab */}
      {activeTab === 'Users' && (
        <Card>
          <div className="admin-actions">
            <Button 
              variant="primary"
              onClick={() => setShowInviteUserModal(true)}
            >
              + Invite User
            </Button>
          </div>
          
          <Table
            columns={userColumns}
            data={users}
            onRowClick={(user) => console.log('User clicked:', user)}
          />
        </Card>
      )}
      
      {/* Add Client Modal */}
      {showAddClientModal && (
        <Modal
          title="Add New Client"
          onClose={() => setShowAddClientModal(false)}
        >
          <div className="modal-form">
            <Input
              label="Company Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter company name"
            />
            <Input
              label="Contact Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="[email protected]"
            />
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Invite User Modal */}
      {showInviteUserModal && (
        <Modal
          title="Invite User"
          onClose={() => setShowInviteUserModal(false)}
        >
          <div className="modal-form">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="[email protected]"
            />
            <p className="form-help-text">
              An invitation email will be sent to the user with setup instructions.
            </p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowInviteUserModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleInviteUser}>
                Send Invitation
              </Button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <Modal
          title={`Edit User: ${selectedUser.name}`}
          onClose={() => setShowEditUserModal(false)}
        >
          <div className="modal-form">
            {/* Trader Role Section */}
            <div className="role-form-section">
              <h3>Trader Role</h3>
              <label className="form-label">Companies</label>
              <div className="multi-select">
                {clients.map(client => (
                  <label key={client.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.traderCompanies.includes(client.id)}
                      onChange={() => handleMultiSelectChange('traderCompanies', client.id)}
                    />
                    {client.name}
                  </label>
                ))}
              </div>
              {formData.traderCompanies.length > 0 && (
                <Input
                  label="Daily Trading Limit (EUR)"
                  type="number"
                  value={formData.dailyLimit}
                  onChange={(e) => setFormData({ ...formData, dailyLimit: e.target.value })}
                  placeholder="500000"
                />
              )}
            </div>
            
            {/* Middle Office Role Section */}
            <div className="role-form-section">
              <h3>Middle Office Role</h3>
              <label className="form-label">Companies</label>
              <div className="multi-select">
                {clients.map(client => (
                  <label key={client.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.middleOfficeCompanies.includes(client.id)}
                      onChange={() => handleMultiSelectChange('middleOfficeCompanies', client.id)}
                    />
                    {client.name}
                  </label>
                ))}
              </div>
            </div>
            
            {/* Admin Role Section */}
            <div className="role-form-section">
              <h3>Admin Role</h3>
              <label className="form-label">Privileges</label>
              <div className="checkbox-group">
                {['Add Users', 'Manage Profits', 'Manage Settlements', 'Manage Other Admins'].map(privilege => (
                  <label key={privilege} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.adminPrivileges.includes(privilege)}
                      onChange={() => handlePrivilegeToggle(privilege)}
                    />
                    {privilege}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowEditUserModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveUser}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
