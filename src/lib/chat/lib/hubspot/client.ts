import { Client } from "@hubspot/api-client";
import type { BookMeetingInput, HubspotMeetingSlot } from "../../types/widget";

const hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export async function getAvailableMeetingSlots(
  meetingLinkSlug: string,
  startMs: number,
  endMs: number
): Promise<HubspotMeetingSlot[]> {
  try {
    const response = await hubspot.apiRequest({
      method: "GET",
      path: `/scheduler/v3/meetings/meeting-links/book/${meetingLinkSlug}/available-times`,
      qs: { startTime: startMs, endTime: endMs },
    });
    const data = await response.json() as { times?: HubspotMeetingSlot[] };
    return data.times ?? [];
  } catch {
    return [];
  }
}

export async function bookMeeting(
  meetingLinkSlug: string,
  input: BookMeetingInput
): Promise<{ success: boolean; confirmationId?: string; error?: string }> {
  try {
    const response = await hubspot.apiRequest({
      method: "POST",
      path: `/scheduler/v3/meetings/meeting-links/book`,
      body: {
        slug: meetingLinkSlug,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        startTime: input.startTime,
        subject: input.subject ?? "Meeting via Portfolio",
      },
    });
    const data = await response.json() as { id?: string };
    return { success: true, confirmationId: data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function upsertContact(
  email: string,
  firstName: string,
  lastName: string
): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await hubspot.crm.contacts.basicApi.create({
      properties: { email, firstname: firstName, lastname: lastName },
    } as any);
    return result.id;
  } catch {
    try {
      const search = await hubspot.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              { propertyName: "email", operator: "EQ" as any, value: email },
            ],
          },
        ],
        properties: ["email"],
        limit: 1,
        after: "0",
        sorts: [],
      });
      return search.results[0]?.id ?? null;
    } catch {
      return null;
    }
  }
}
