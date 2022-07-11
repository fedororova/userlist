// Import the core angular services.
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
  selector: 'yakutsk-page-editable',
  inputs: ['value'],
  outputs: ['valueChangeEvents: valueChange'],
  template: `
    <div *ngIf="isEditing" class="editor">
      <input
        type="text"
        name="value"
        autofocus
        [(ngModel)]="pendingValue"
        (keydown.Enter)="processChanges()"
        (keydown.Meta.Enter)="processChanges()"
        (keydown.Escape)="cancel()"
      />
      <button (click)="processChanges()">Save</button>

      <a (click)="cancel()" (keydown.Enter)="cancel()" tabindex="0"> Cancel </a>
    </div>

    <div *ngIf="!isEditing" (click)="edit()">
      {{ value }}
    </div>
  `,
})
export class EditableComponent {
  public isEditing: boolean;
  public pendingValue: string;
  public value!: string;
  public valueChangeEvents: EventEmitter<string>;

  // I initialize the editable component.
  constructor() {
    this.isEditing = false;
    this.pendingValue = '';
    this.valueChangeEvents = new EventEmitter();
  }

  // ---
  // PUBLIC METHODS.
  // ---
  ngOnInit() {}
  // I cancel the editing of the value.
  public cancel(): void {
    this.isEditing = false;
  }

  // I enable the editing of the value.
  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }
  // I process changes to the pending value.
  session: string;
  public processChanges(): void {
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }
    this.isEditing = false;
  }
}
