export type ProofStatus = 'mock' | 'verified' | 'pending' | 'hidden';

interface BaseProof {
  id: string;
  status: ProofStatus;
  productionVisible: boolean;
  source?: string;
  authorizedAt?: string;
}

export interface ReviewProof extends BaseProof {
  kind: 'A_review';
  platform: 'tripadvisor' | 'google' | 'email' | 'other';
  rating?: number;
  quote: { en: string; zh: string };
  travelType: string;
  destination: string;
  evidenceUrl?: string;
}

export interface AdvisorProof extends BaseProof {
  kind: 'B_advisor';
  displayName: { en: string; zh: string };
  role: { en: string; zh: string };
  languages: string[];
  destinations: string[];
  yearsOfExperience?: number;
  photoSrc?: string;
  responseModel: { en: string; zh: string };
}

export interface CaseProof extends BaseProof {
  kind: 'C_case';
  customerType: string;
  durationDays: number;
  partySize: number;
  destinations: string[];
  challenge: { en: string; zh: string };
  outcome: { en: string; zh: string };
  feedbackAvailable: boolean;
}

export interface CredentialProof extends BaseProof {
  kind: 'D_credential';
  category: 'entity' | 'license' | 'partner' | 'payment' | 'privacy' | 'process';
  displayName: { en: string; zh: string };
  description: { en: string; zh: string };
  publicAllowed: boolean;
}

export type TrustProof = ReviewProof | AdvisorProof | CaseProof | CredentialProof;

// Phase 6 时根据 spec §4.3 与现有 components/sections/AdvisorCard.tsx 等内容迁移；初始为空数组占位。
export const TRUST_PROOFS: TrustProof[] = [];

export const renderableProofs = (
  proofs: TrustProof[],
  { isProduction }: { isProduction: boolean }
): TrustProof[] =>
  proofs.filter((p) => {
    if (p.status === 'hidden') return false;
    if (isProduction && p.status === 'mock') return false;
    return p.productionVisible || !isProduction;
  });
