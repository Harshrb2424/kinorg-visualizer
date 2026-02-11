import Dexie, { type Table } from 'dexie';

export interface GraphState {
  id?: number;
  nodes: any[];
  edges: any[];
  updatedAt: number;
}

export class KinOrgDatabase extends Dexie {
  graphs!: Table<GraphState>;

  constructor() {
    super('KinOrgDB');
    this.version(1).stores({
      graphs: '++id, updatedAt'
    });
  }
}

export const db = new KinOrgDatabase();