import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../config/authConfig";

class AuthService {
  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
    this.account = null;
    this.accessToken = null;
  }

  async initialize() {
    try {
      await this.msalInstance.initialize();
      const accounts = this.msalInstance.getAllAccounts();
      
      if (accounts.length > 0) {
        this.account = accounts[0];
        console.log("User already signed in:", this.account.username);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Auth initialization failed:", error);
      return false;
    }
  }

  async signIn() {
    try {
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
      this.account = loginResponse.account;
      console.log("Sign-in successful:", this.account.username);
      return true;
    } catch (error) {
      console.error("Sign-in failed:", error);
      return false;
    }
  }

  async getAccessToken() {
    if (!this.account) {
      throw new Error("No account found. Please sign in first.");
    }

    try {
      const tokenRequest = {
        ...loginRequest,
        account: this.account
      };

      const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
      this.accessToken = response.accessToken;
      return this.accessToken;
    } catch (error) {
      console.log("Silent token acquisition failed, trying popup");
      const response = await this.msalInstance.acquireTokenPopup(tokenRequest);
      this.accessToken = response.accessToken;
      return this.accessToken;
    }
  }

  signOut() {
    this.msalInstance.logoutPopup();
    this.account = null;
    this.accessToken = null;
  }

  isSignedIn() {
    return this.account !== null;
  }
}

export const authService = new AuthService();