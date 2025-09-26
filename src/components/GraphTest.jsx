// Test component to verify Microsoft Graph integration
// Create this as: src/components/GraphTest.jsx

import React, { useState, useEffect } from 'react';
import { authService } from '../services/AuthService';
import { graphService } from '../services/GraphService';
import { DataMigration } from '../utils/DataMigration';

const GraphTest = () => {
  const [status, setStatus] = useState('Initializing...');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setStatus('Checking authentication...');
      const signedIn = await authService.initialize();
      
      if (signedIn) {
        setIsSignedIn(true);
        setStatus('User already signed in');
        await initializeGraph();
      } else {
        setStatus('Ready to sign in');
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError('Authentication initialization failed: ' + error.message);
      setStatus('Authentication failed');
    }
  };

  const handleSignIn = async () => {
    try {
      setStatus('Signing in...');
      setError(null);
      
      const success = await authService.signIn();
      
      if (success) {
        setIsSignedIn(true);
        setStatus('Sign-in successful, initializing Graph...');
        await initializeGraph();
      } else {
        setStatus('Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Sign-in failed: ' + error.message);
      setStatus('Sign-in failed');
    }
  };

  const initializeGraph = async () => {
    try {
      setStatus('Initializing Microsoft Graph...');
      await graphService.initialize();
      setStatus('Graph initialized successfully');
      
      // Test loading data
      await loadTestData();
    } catch (error) {
      console.error('Graph initialization error:', error);
      setError('Graph initialization failed: ' + error.message);
      setStatus('Graph initialization failed');
    }
  };

  const loadTestData = async () => {
    try {
      setStatus('Loading data from SharePoint...');
      
      // Load staff
      const staff = await graphService.getAllStaff();
      setStaffData(staff);
      
      // Load clients
      const clients = await graphService.getAllClients();
      setClientData(clients);

     
      setStatus(`Data loaded successfully! ${staff.length} staff, ${clients.length} clients`);
    } catch (error) {
      console.error('Data loading error:', error);
      setError('Data loading failed: ' + error.message);
      setStatus('Data loading failed');
    }
  };

  const testCreateStaff = async () => {
    try {
      setStatus('Testing staff creation...');
      
      const newStaff = await graphService.createStaff({
        name: 'Test User',
        role: 'RBT',
        available: true
      });
      
      console.log('Created staff:', newStaff);
      setStatus('Staff created successfully!');
      
      // Reload data
      await loadTestData();
    } catch (error) {
      console.error('Staff creation error:', error);
      setError('Staff creation failed: ' + error.message);
    }
  };

  const testCreateClient = async () => {
    try {
      setStatus('Testing client creation...');
      
      const newClient = await graphService.createClient({
        name: 'Test Student',
        ratio: '1:1',
        lunchSchedule: 'First',
        requiresLunch1to1: false,
        teamStaff: ['Test User', 'Allie']
      });
      
      console.log('Created client:', newClient);
      setStatus('Client created successfully!');
      
      // Reload data
      await loadTestData();
    } catch (error) {
      console.error('Client creation error:', error);
      setError('Client creation failed: ' + error.message);
    }
  };
  const runDataMigration = async () => {
  try {
    setStatus('Starting data migration...');
    setError(null);
    
    const { DataMigration } = await import('../utils/DataMigration');
    await DataMigration.migrateAllData();
    
    setStatus('Migration completed! Reloading data...');
    await loadTestData();
  } catch (error) {
    console.error('Migration error:', error);
    setError('Migration failed: ' + error.message);
    setStatus('Migration failed');
  }
};

  const handleSignOut = () => {
    authService.signOut();
    setIsSignedIn(false);
    setUserData(null);
    setStaffData([]);
    setClientData([]);
    setStatus('Signed out');
    setError(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Microsoft Graph SharePoint Test</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <strong>Status:</strong> {status}
      </div>

      {error && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ffe6e6', color: 'red', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        {!isSignedIn ? (
          <button 
            onClick={handleSignIn}
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#0078d4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Sign In with Microsoft 365
          </button>
        ) : (
          <div>
            <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Signed in successfully</p>
            <button 
              onClick={handleSignOut}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#d13438', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
            >
              Sign Out
            </button>
            <button 
              onClick={loadTestData}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#107c10', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
            >
              Reload Data
            </button>
            <button 
              onClick={testCreateStaff}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#ff8c00', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
            >
              Test Create Staff
            </button>
            <button 
              onClick={testCreateClient}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#5c2d91', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Test Create Client
            </button>
            <button 
              onClick={runDataMigration}
              style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#b83dba', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
            >
              Import All Data
            </button>
          </div>
        )}
      </div>

      {isSignedIn && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Staff Data ({staffData.length} records)</h3>
            <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
              {staffData.length > 0 ? (
                staffData.map(staff => (
                  <div key={staff.id} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
                    <strong>{staff.name}</strong> - {staff.role} - {staff.available ? 'Available' : 'Unavailable'}
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666' }}>No staff data found</p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>Client Data ({clientData.length} records)</h3>
            <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
              {clientData.length > 0 ? (
                clientData.map(client => (
                  <div key={client.id} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
                    <strong>{client.name}</strong> - {client.ratio} - {client.lunchSchedule} Lunch 
                    {client.teamStaff && client.teamStaff.length > 0 && (
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        {' '}(Team: {client.teamStaff.slice(0, 3).join(', ')}{client.teamStaff.length > 3 && '...'})
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666' }}>No client data found</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e6f3ff', borderRadius: '5px', fontSize: '14px' }}>
        <h4>Testing Instructions:</h4>
        <ol>
          <li>Click "Sign In with Microsoft 365" - should open popup for authentication</li>
          <li>Sign in with your Evoke Behavioral Health account</li>
          <li>Verify staff and client data loads from your SharePoint lists</li>
          <li>Test creating a staff member and client</li>
          <li>Check your SharePoint lists to see the new data</li>
        </ol>
      </div>
    </div>
  );
};

export default GraphTest;