import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import * as CryptoJS from 'crypto-js';

export interface User {
  id?: number;
  farmName: string;
  ownerName: string;
  phone: string;
  password: string; // stored as SHA-256 hash
}

@Injectable({ providedIn: 'root' })
export class AuthLocalService extends Dexie {
  users!: Table<User, number>;
  private loggedUser: User | null = null;

  constructor() {
    super('FarmAuthDB');

    this.version(1).stores({
      users: '++id, farmName, ownerName, phone',
    });

    this.users = this.table('users');
  }
  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
  async signUp(user: User): Promise<void> {
    const existing = await this.users
      .where('farmName')
      .equals(user.farmName)
      .first();

    if (existing) throw new Error('Fazenda já cadastrada!');

    const hashedUser = {
      ...user,
      password: this.hashPassword(user.password),
    };

    await this.users.add(hashedUser);
  }
  async login(farmName: string, ownerName: string, password: string): Promise<User> {
    const user = await this.users.where('farmName').equals(farmName).first();
    if (!user) throw new Error('Fazenda não encontrada!');

    const hash = this.hashPassword(password);

    if (user.ownerName !== ownerName || user.password !== hash) {
      throw new Error('Credenciais inválidas!');
    }

    this.loggedUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    return user;
  }

  logout(): void {
    this.loggedUser = null;
    localStorage.removeItem('loggedUser');
  }
  getLoggedUser(): User | null {
    if (this.loggedUser) return this.loggedUser;
    const cached = localStorage.getItem('loggedUser');
    return cached ? JSON.parse(cached) : null;
  }
  isAuthenticated(): boolean {
    return !!this.getLoggedUser();
  }
  async clearAll(): Promise<void> {
    await this.users.clear();
    localStorage.removeItem('loggedUser');
    this.loggedUser = null;
  }
}
