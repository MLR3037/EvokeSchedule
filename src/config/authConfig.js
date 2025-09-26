// Environment detection
const isDevelopment = window.location.hostname === 'localhost';
const isGitHubPages = window.location.hostname.includes('github.io');
const isProduction = !isDevelopment;

console.log('Environment:', {
  isDevelopment,
  isGitHubPages,
  isProduction,
  origin: window.location.origin,
  hostname: window.location.hostname
});

export const msalConfig = {
  auth: {
    clientId: "f76d3db3-50c8-4cac-8dcb-7a23fa4b5805",
    authority: "https://login.microsoftonline.com/a4adcc38-7b4e-485c-80f9-7d9ca4e83d64",
    redirectUri: window.location.origin,
    // Add known redirect URIs for validation
    knownAuthorities: ["login.microsoftonline.com"],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false // Disable native broker for web deployment
  }
};

export const loginRequest = {
  scopes: ["Sites.ReadWrite.All", "Sites.Manage.All", "User.Read"]
};

export const sharePointConfig = {
  siteUrl: "https://evokebehavioralhealthcom.sharepoint.com/sites/Clinistrators",
  listNames: {
    staff: "Staff",
    clients: "Clients", 
    schedule: "DailySchedule",
    history: "AssignmentHistory"
  }
};