import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EscuelaService } from '../../service/escuela.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Escuela } from '../../models/escuela';

@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css'] // Corregido el nombre de la propiedad a "styleUrls"
})
export class EscuelaComponent {
  escuelas: Escuela[] = [];
  titulo: string = '';
  opc: string = '';
  escuela: Escuela = new Escuela(); // Instancia del modelo Escuela
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;

  constructor(
    private escuelaService: EscuelaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarEscuelas();
  }

  listarEscuelas() {
    this.escuelaService.getEscuela().subscribe((data) => {
      this.escuelas = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Escuela';
    this.opc = 'Guardar';
    this.op = 0;
    this.visible = true; // Cambia la visibilidad del diálogo
    this.escuela = new Escuela(); // Resetea el objeto escuela
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Escuela';
    this.opc = 'Editar';
    this.escuelaService.getEscuelaById(id).subscribe((data) => {
      this.escuela = data;
      this.op = 1;
    });
    this.visible = true; // Cambia la visibilidad del diálogo
  }

  confirmDeleteEscuela(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta escuela?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Elimina la escuela si el usuario confirma (clic en "Sí")
        this.deleteEscuela(id);
      },
      reject: () => {
        // Si el usuario rechaza la confirmación (clic en "No"), muestra notificación
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteEscuela(id: number) {
    this.escuelaService.deleteEscuela(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La escuela ha sido eliminada exitosamente',
        });
        this.listarEscuelas(); // Actualiza la lista después de la eliminación
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la escuela',
        });
      },
    });
  }

  addEscuela(): void {
    this.escuelaService.createEscuela(this.escuela).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela registrada',
        });
        this.listarEscuelas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la escuela',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveEscuela() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar esta escuela?'
          : '¿Estás seguro de que deseas editar esta escuela?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion(); // Llama a opcion() si el usuario confirma
      },
    });
  }

  editEscuela() {
    this.escuelaService.updateEscuela(this.escuela, this.escuela.idescuela).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela editada',
        });
        this.listarEscuelas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la escuela',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op === 0) {
      this.addEscuela();
      this.limpiar();
    } else if (this.op === 1) {
      this.editEscuela();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.escuela = new Escuela(); // Resetea el objeto escuela
  }
}
