export interface WorkItemMessage {
  title: string;
  company: string;
  date: string;
  description: string;
  logoAlt?: string;
  group: string;
}

export interface SchoolItemMessage {
  degree: string;
  school: string;
  date: string;
  description: string;
  logoAlt?: string;
  group: string;
}

export interface CertificationItemMessage {
  title: string;
  issuer: string;
  date: string;
  logoAlt?: string;
}

export interface SoftSkillItemMessage {
  label: string;
}

export type WorkItem = WorkItemMessage & { id: string };
export type SchoolItem = SchoolItemMessage & { id: string };
export type CertificationItem = CertificationItemMessage & { id: string };
export type SoftSkillItem = SoftSkillItemMessage & { id: string };
