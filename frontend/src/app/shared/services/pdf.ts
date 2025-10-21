import { Injectable } from '@angular/core';
import { db } from '../db/user-local';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({ providedIn: 'root' })
export class Pdf {
  async generateFinancialReport(userId: number): Promise<void> {
    const transactions = await db.transactions
      .where('userId')
      .equals(userId)
      .toArray();

    const receitas = transactions.filter((t) => t.type === 'income');
    const despesas = transactions.filter((t) => t.type === 'expense');

    const totalReceitas = receitas.reduce((s, t) => s + t.value, 0);
    const totalDespesas = despesas.reduce((s, t) => s + t.value, 0);
    const saldo = totalReceitas - totalDespesas;

    const body: (string | number)[][] = [
      ['Data', 'Categoria', 'Descrição', 'Tipo', 'Valor (R$)'],
      ...transactions.map((t) => [
        new Date(t.date).toLocaleDateString('pt-BR'),
        t.category || '',
        t.description || '',
        t.type === 'income' ? 'Receita' : 'Despesa',
        t.value.toFixed(2),
      ]),
    ];

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        { text: 'Relatório Financeiro', style: 'title' },
        {
          text: `Gerado em ${new Date().toLocaleString('pt-BR')}`,
          style: 'subtitle',
        },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto'],
            body,
          },
          layout: 'lightHorizontalLines',
        },
        { text: '\n' },
        {
          columns: [
            {
              width: '33%',
              text: `Receitas: R$ ${totalReceitas.toFixed(2)}`,
              style: 'summaryIncome',
            },
            {
              width: '33%',
              text: `Despesas: R$ ${totalDespesas.toFixed(2)}`,
              style: 'summaryExpense',
            },
            {
              width: '33%',
              text: `Saldo: R$ ${saldo.toFixed(2)}`,
              style: saldo >= 0 ? 'summaryPositive' : 'summaryNegative',
            },
          ],
        },
      ],
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
          color: '#2e7d32',
        },
        subtitle: {
          fontSize: 10,
          alignment: 'center',
          color: '#666',
        },
        summaryIncome: { bold: true, color: '#2e7d32', fontSize: 12 },
        summaryExpense: { bold: true, color: '#c62828', fontSize: 12 },
        summaryPositive: { bold: true, color: '#1b5e20', fontSize: 12 },
        summaryNegative: { bold: true, color: '#b71c1c', fontSize: 12 },
      },
    };

    // 🔽 Faz o download automático do PDF
    pdfMake
      .createPdf(docDefinition)
      .download(
        `relatorio-financeiro-${new Date().toISOString().slice(0, 10)}.pdf`
      );
  }
}
