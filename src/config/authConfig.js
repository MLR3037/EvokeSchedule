export const msalConfig = {
  auth: {
    clientId: "f76d3db3-50c8-4cac-8dcb-7a23fa4b5805",
    authority: "https://login.microsoftonline.com/a4adcc38-7b4e-485c-80f9-7d9ca4e83d64",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
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