export interface PersonData {
  name: string;
  role: string;
  avatar?: string; // Base64 string
  bio?: {
    dob?: string;
    location?: string;
    notes?: string;
    education?: string;
    workHistory?: string;
  };
}

export type KinOrgNode = {
  id: string;
  type: 'person';
  data: PersonData;
  position: { x: number; y: number };
};