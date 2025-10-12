import { Injectable } from '@angular/core';

interface UserData {
  farmName: string;
  ownerName: string;
  phone: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';

  constructor() {}

  async signUp(data: UserData) {
    // Em produção: enviar para Supabase via HTTP POST
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return { success: true, message: 'Fazenda criada com sucesso!' };
  }

  async login(farmName: string, ownerName: string, password: string) {
    const user = localStorage.getItem(this.STORAGE_KEY);
    if (!user) throw new Error('Nenhum usuário cadastrado.');
    const parsed = JSON.parse(user);

    if (
      parsed.farmName === farmName &&
      parsed.ownerName === ownerName &&
      parsed.password === password
    ) {
      localStorage.setItem('auth_logged', 'true');
      return { success: true };
    } else {
      throw new Error('Credenciais inválidas.');
    }
  }

  logout() {
    localStorage.removeItem('auth_logged');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_logged') === 'true';
  }
}
