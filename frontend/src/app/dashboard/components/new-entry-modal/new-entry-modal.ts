import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-new-entry-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './new-entry-modal.html',
  styleUrls: ['./new-entry-modal.scss'],
})
export class NewEntryModal {
  /** renamed from "close" to avoid collision with native event names */
  @Output() dismissed = new EventEmitter<void>();
  @Output() select = new EventEmitter<
    'receita' | 'despesa' | 'atividade' | 'observacao' | 'relatorio'
  >();

  choose(option: 'receita' | 'despesa' | 'atividade' | 'observacao' | 'relatorio') {
    this.select.emit(option);
  }

  onClose() {
    this.dismissed.emit();
  }
}
