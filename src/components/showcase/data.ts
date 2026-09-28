import type { BrandKey } from '@/lib/brand-logos';

/**
 * Everything the hero showcase shows is driven from here: five campaigns for
 * five different businesses, each on its own platform, and the leads each one
 * produces for the pipeline underneath.
 *
 * The businesses are invented. They are the kind of local advertiser the
 * product is built for, so a reader recognises their own trade in them.
 */

export type Platform = 'google' | 'instagram' | 'youtube' | 'facebook' | 'linkedin';

export interface CampaignStats {
  reachLabel: string;
  reach: number;
  clicks: number;
  leads: number;
  costPerLead: number;
}

export interface LeadTemplate {
  /** Two names per campaign, alternated each time round the loop. */
  names: [string, string];
  want: string;
  value: number;
}

export interface Campaign {
  platform: Platform;
  brand: BrandKey;
  label: string;
  format: string;
  business: string;
  stats: CampaignStats;
  lead: LeadTemplate;
}

export const CAMPAIGNS: Campaign[] = [
  {
    platform: 'google',
    brand: 'google',
    label: 'Google',
    format: 'Search ad',
    business: 'Kasavu House, clothing',
    stats: { reachLabel: 'Impressions', reach: 18240, clicks: 1126, leads: 64, costPerLead: 142 },
    lead: { names: ['Meera J.', 'Lakshmi N.'], want: 'Kasavu saree set', value: 6800 },
  },
  {
    platform: 'instagram',
    brand: 'instagram',
    label: 'Instagram',
    format: 'Reel ad',
    business: 'Malabar Table, restaurant',
    stats: { reachLabel: 'Reach', reach: 42800, clicks: 1912, leads: 88, costPerLead: 96 },
    lead: { names: ['Arjun P.', 'Sneha T.'], want: 'Onam sadya for 8', value: 4400 },
  },
  {
    platform: 'youtube',
    brand: 'youtube',
    label: 'YouTube',
    format: 'In-stream ad',
    business: 'Oakline Interiors',
    stats: { reachLabel: 'Views', reach: 61300, clicks: 2040, leads: 37, costPerLead: 310 },
    lead: { names: ['Rahul & Divya', 'Joseph M.'], want: 'Modular kitchen', value: 240000 },
  },
  {
    platform: 'facebook',
    brand: 'facebook',
    label: 'Facebook',
    format: 'Feed ad',
    business: 'Pearl Dental Studio',
    stats: { reachLabel: 'Reach', reach: 27500, clicks: 980, leads: 52, costPerLead: 168 },
    lead: { names: ['Fathima K.', 'Anoop R.'], want: 'Clear aligners', value: 45000 },
  },
  {
    platform: 'linkedin',
    brand: 'linkedin',
    label: 'LinkedIn',
    format: 'Lead gen ad',
    business: 'Stackwise Academy',
    stats: { reachLabel: 'Impressions', reach: 9860, clicks: 402, leads: 29, costPerLead: 455 },
    lead: { names: ['Nikhil S.', 'Aparna V.'], want: 'DevOps weekend batch', value: 38000 },
  },
];

/** How long each ad stays on screen, in milliseconds. */
export const SLOT_MS = 6000;

export const PIPELINE_STAGES = ['New', 'Contacted', 'Qualified', 'Won'] as const;

/** The pipeline's position at slot 0, so the numbers never start from nothing. */
export const PIPELINE_BASE = {
  leads: 214,
  won: 38,
  revenue: 486200,
  columnCounts: [11, 17, 9, 38] as [number, number, number, number],
};

export interface Lead {
  id: number;
  campaign: Campaign;
  name: string;
  want: string;
  value: number;
}

/** Lead `id` comes from campaign `id % 5`, arriving in the slot of the same number. */
export function leadFor(id: number): Lead {
  // Ids go negative before the first capture, so wrap rather than use `%` alone.
  const campaign = CAMPAIGNS[((id % CAMPAIGNS.length) + CAMPAIGNS.length) % CAMPAIGNS.length]!;
  const round = Math.floor(id / CAMPAIGNS.length);
  return {
    id,
    campaign,
    name: campaign.lead.names[((round % 2) + 2) % 2]!,
    want: campaign.lead.want,
    value: campaign.lead.value,
  };
}

/** Indian digit grouping (4,86,200), done by hand so server and client agree. */
export function formatINR(value: number): string {
  const digits = Math.round(value).toString();
  if (digits.length <= 3) return digits;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${rest},${last3}`;
}
