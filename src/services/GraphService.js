import { Client } from "@microsoft/microsoft-graph-client";
import { authService } from "./AuthService";
import { sharePointConfig } from "../config/authConfig";

class GraphService {
  constructor() {
    this.graphClient = null;
    this.siteId = null;
    this.listIds = {};
  }

  async initialize() {
    // Create Graph client with authentication
    this.graphClient = Client.init({
      authProvider: async (done) => {
        try {
          const token = await authService.getAccessToken();
          done(null, token);
        } catch (error) {
          done(error, null);
        }
      }
    });

    // Get site ID and list IDs
    await this.getSiteId();
    await this.getListIds();
  }

  async getSiteId() {
    try {
      const url = sharePointConfig.siteUrl;
      const hostname = url.split("//")[1].split("/")[0];
      const sitePath = url.split(hostname)[1];
      
      const site = await this.graphClient
        .api(`/sites/${hostname}:${sitePath}`)
        .get();
      
      this.siteId = site.id;
      console.log("Site ID obtained:", this.siteId);
    } catch (error) {
      console.error("Failed to get site ID:", error);
      throw error;
    }
  }

  async getListIds() {
    try {
      const lists = await this.graphClient
        .api(`/sites/${this.siteId}/lists`)
        .get();

      for (const listName in sharePointConfig.listNames) {
        const spListName = sharePointConfig.listNames[listName];
        const list = lists.value.find(l => l.displayName === spListName);
        
        if (list) {
          this.listIds[listName] = list.id;
        } else {
          console.error(`List not found: ${spListName}`);
        }
      }
      
      console.log("List IDs obtained:", this.listIds);
    } catch (error) {
      console.error("Failed to get list IDs:", error);
      throw error;
    }
  }

  // ===================================================================
  // STAFF OPERATIONS
  // ===================================================================

  async getAllStaff() {
    try {
      const response = await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.staff}/items`)
        .expand('fields')
        .get();

      return response.value.map(item => ({
        id: item.fields.id || item.id,
        name: item.fields.Title,
        role: item.fields.Role,
        available: item.fields.Available,
        lastUpdated: item.fields.LastUpdated
      }));
    } catch (error) {
      console.error("Failed to get staff:", error);
      return [];
    }
  }

  async createStaff(staffData) {
    try {
      const response = await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.staff}/items`)
        .post({
          fields: {
            Title: staffData.name,
            Role: staffData.role,
            Available: staffData.available !== undefined ? staffData.available : true,
            LastUpdated: new Date().toISOString()
          }
        });

      return {
        id: response.fields.id || response.id,
        name: response.fields.Title,
        role: response.fields.Role,
        available: response.fields.Available,
        lastUpdated: response.fields.LastUpdated
      };
    } catch (error) {
      console.error("Failed to create staff:", error);
      throw error;
    }
  }

  async updateStaffAvailability(staffId, available) {
    try {
      await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.staff}/items/${staffId}`)
        .patch({
          fields: {
            Available: available,
            LastUpdated: new Date().toISOString()
          }
        });
    } catch (error) {
      console.error("Failed to update staff availability:", error);
      throw error;
    }
  }

  // ===================================================================
  // CLIENT OPERATIONS
  // ===================================================================

  async getAllClients() {
    try {
      const response = await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.clients}/items`)
        .expand('fields')
        .get();

      return response.value.map(item => ({
        id: item.fields.id || item.id,
        name: item.fields.Title,
        ratio: item.fields.Ratio,
        amRatio: item.fields.AmRatio,
        pmRatio: item.fields.PmRatio,
        lunchSchedule: item.fields.LunchSchedule,
        requiresLunch1to1: item.fields.RequiresLunch1to1,
        lunchPairing: this.parseJsonField(item.fields.LunchPairing),
        pairedWith: item.fields.PairedWith,
        teamStaff: this.parseJsonField(item.fields.TeamStaff)
      }));
    } catch (error) {
      console.error("Failed to get clients:", error);
      return [];
    }
  }

  async createClient(clientData) {
    try {
      const response = await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.clients}/items`)
        .post({
          fields: {
            Title: clientData.name,
            Ratio: clientData.ratio,
            AmRatio: clientData.amRatio,
            PmRatio: clientData.pmRatio,
            LunchSchedule: clientData.lunchSchedule,
            RequiresLunch1to1: clientData.requiresLunch1to1 || false,
            LunchPairing: JSON.stringify(clientData.lunchPairing || []),
            PairedWith: clientData.pairedWith,
            TeamStaff: JSON.stringify(clientData.teamStaff || [])
          }
        });

      return {
        id: response.fields.id || response.id,
        name: response.fields.Title,
        ratio: response.fields.Ratio,
        amRatio: response.fields.AmRatio,
        pmRatio: response.fields.PmRatio,
        lunchSchedule: response.fields.LunchSchedule,
        requiresLunch1to1: response.fields.RequiresLunch1to1,
        lunchPairing: this.parseJsonField(response.fields.LunchPairing),
        pairedWith: response.fields.PairedWith,
        teamStaff: this.parseJsonField(response.fields.TeamStaff)
      };
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  }

  async updateClientTeams(clientId, teamStaff) {
    try {
      await this.graphClient
        .api(`/sites/${this.siteId}/lists/${this.listIds.clients}/items/${clientId}`)
        .patch({
          fields: {
            TeamStaff: JSON.stringify(teamStaff)
          }
        });
    } catch (error) {
      console.error("Failed to update client teams:", error);
      throw error;
    }
  }

  // ===================================================================
  // UTILITY FUNCTIONS
  // ===================================================================

  parseJsonField(field) {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return typeof field === 'string' ? [field] : [];
    }
  }
}

export const graphService = new GraphService();