import Dexie, { Table } from 'dexie';

export interface Field {
  id: string;
  userId: number;
  farmName: string;
  nome: string;
  cultura: string;
  hectares: number;
  dataPlantio: string;
  variedade?: string;
  createdAt: string;
  updatedAt?: string;
  syncStatus: 'pending' | 'synced';
}
// farm.ts
export interface Farm {
  id: string; // uuid
  name: string; // Nome da fazenda / Razão social
  ownerName: string; // Usuário responsável
  phoneE164: string; // Telefone em E.164 (do componente <phone/>)
  pin?: string; // PIN numérico opcional para login offline
  createdAt: number; // epoch ms
}
// finance-entry.ts
export type FinanceType = 'RECEITA' | 'DESPESA';
export type PayMethod = 'DINHEIRO' | 'PIX' | 'CARTAO' | 'FIADO';

export interface FinanceEntry {
  id: string;
  farmId: string;
  date: string; // ISO (YYYY-MM-DD)
  type: FinanceType;
  category:
    | 'Plantio'
    | 'Colheita'
    | 'Insumos'
    | 'Mão de obra'
    | 'Transporte'
    | 'Venda de Safra'
    | 'Outros';
  description?: string;
  valueCents: number; // SEM flutuante
  payMethod?: PayMethod;
  fieldId?: string; // área vinculada
  docUrl?: string; // upload
  createdAt: number;
  updatedAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}

// inventory.ts
export interface InventoryItem {
  id: string;
  farmId: string;
  name: string; // Produto/insumo
  qty: number;
  unit: 'kg' | 'L' | 'sacas' | 'un';
  reorderPoint?: number;
  lastInDate?: string; // ISO
  createdAt: number;
  updatedAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}

// activity.ts
export interface Activity {
  id: string;
  farmId: string;
  date: string; // ISO
  type:
    | 'Plantio'
    | 'Pulverização'
    | 'Irrigação'
    | 'Colheita'
    | 'Calagem'
    | 'Adubação'
    | 'Outro';
  fieldId?: string;
  title: string;
  assignee?: string; // Responsável
  notes?: string;
  notifyAt?: string; // ISO para notificação local
  createdAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}

// soil.ts
export interface SoilAnalysis {
  id: string;
  farmId: string;
  fieldId: string;
  date: string; // ISO
  ph: number;
  compaction: 'Leve' | 'Moderada' | 'Alta';
  nLevel: 'Baixo' | 'Médio' | 'Alto';
  pLevel: 'Baixo' | 'Médio' | 'Alto';
  kLevel: 'Baixo' | 'Médio' | 'Alto';
  notes?: string;
  reportUrl?: string;
  createdAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}

// fertilization.ts
export interface Fertilization {
  id: string;
  farmId: string;
  date: string;
  product: string;
  dosePerHa: number; // kg/ha ou L/ha (guardar número + unidade se quiser)
  areaHa: number;
  costCents?: number; // opcional; se preencher → cria FinanceEntry
  notes?: string;
  createdAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}

// pests.ts
export interface PestRecord {
  id: string;
  farmId: string;
  date: string;
  fieldId: string;
  crop: string;
  kind: 'Lagarta' | 'Percevejo' | 'Ferrugem' | 'Oídio' | 'Ralado' | 'Outro';
  infestation: 'Baixo' | 'Médio' | 'Alto';
  affectedPct?: number;
  action: 'Pulverização' | 'Manual' | 'Nenhuma' | 'Outra';
  photos?: string[]; // URLs locais/Blob
  notes?: string;
  createdAt: number;
  syncStatus: 'local' | 'queued' | 'synced' | 'error';
}
export interface Transaction {
  id: string;
  userId: number;
  farmName: string;
  type: 'income' | 'expense';
  category?: string;
  description?: string;
  value: number;
  date: string;
  paymentMethod?: string;
  fieldId?: string;
  syncStatus: 'pending' | 'synced';
  createdAt: string;
  updatedAt?: string;
}

export class UserLocalDB extends Dexie {
  transactions!: Table<Transaction, string>;
  fields!: Table<Field, string>;

  constructor() {
    super('realtorium-db');
    this.version(2).stores({
      transactions: 'id, userId, type, date, syncStatus',
      fields: 'id, userId, nome, cultura, dataPlantio',
    });
  }
}

export const db = new UserLocalDB();
