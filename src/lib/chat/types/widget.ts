export interface WidgetConfig {
  id: string;
  name: string;
  greeting: string;
  voiceGreeting?: string;
  primaryColor: string;
  agentName: string;
  agentAvatar?: string;
  hubspotMeetingUrl?: string;
  voiceEnabled: boolean;
  position: "bottom-right" | "bottom-left";
}

export interface HubspotMeetingSlot {
  startTime: number;
  endTime: number;
}

export interface BookMeetingInput {
  firstName: string;
  lastName: string;
  email: string;
  startTime: number;
  subject?: string;
}
