// Environment Configuration for Attendance Tracker
// This file contains non-sensitive configuration that can be publicly deployed

window.ENV_CONFIG = {
    // Firebase Configuration (these are safe to expose for web apps)
    firebase: {
        apiKey: "AIzaSyCB2BR1uIJLXH_tw-AJatC5f9tVrMhhHio",
        authDomain: "smstt-c0a67.firebaseapp.com", 
        projectId: "smstt-c0a67",
        storageBucket: "smstt-c0a67.firebasestorage.app",
        messagingSenderId: "6657651110",
        appId: "1:6657651110:web:78567936db83da39025f67",
        measurementId: "G-3H3TQEQFH9"
    },
    
    // App Settings
    app: {
        name: "Class Attendance System",
        version: "2.0.0",
        author: "School Management Team"
    },
    
    // Default Demo Students (anonymized for public deployment)
    defaultStudents: {
        'STU001': { id: 'STU001', name: 'Student A' },
        'STU002': { id: 'STU002', name: 'Student B' },
        'STU003': { id: 'STU003', name: 'Student C' },
        'STU004': { id: 'STU004', name: 'Student D' },
        'STU005': { id: 'STU005', name: 'Student E' },
        'STU006': { id: 'STU006', name: 'Student F' },
        'STU007': { id: 'STU007', name: 'Student G' },
        'STU008': { id: 'STU008', name: 'Student H' }
    },
    
    // Security Settings
    security: {
        // Admin password will be set at runtime
        requireAdminAuth: true,
        maxFailedAttempts: 3,
        sessionTimeout: 30 * 60 * 1000 // 30 minutes
    },
    
    // Location Settings
    location: {
        accuracy: 20000, // 20km radius
        campusLocations: [
            { lat: 25.2048, lng: 55.2708, name: 'Campus A' },
            { lat: 25.3548, lng: 55.4105, name: 'Campus B' }
        ]
    }
};
