import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export default class CommonTableComponent {
  @Input() columns: any[] = []; // Define columns configuration
  @Input() data: any[] = []; // Define table data
  @Input() sortableColumns: string[] = []; // Define which columns are sortable

  // Flags for column behavior
  @Input() isActionColumn = false;
  @Input() isStatusColumn = false;
  @Input() isSerialNoColumn = false;

  // Flags for actions
  @Input() isEdit = false;
  @Input() isPreview = false;
  @Input() isDownload = false;
  @Input() isDelete = false;

  // Sorting logic (optional)
  sortData(column: string) {
    // Implement sorting logic
  }

  // Action handlers (optional)
  onEdit(row: any) {
    // Implement edit logic
  }

  onPreview(row: any) {
    // Implement preview logic
  }

  onDownload(row: any) {
    // Implement download logic
  }

  onDelete(row: any) {
    // Implement delete logic
  }

  constructor() {
    
  }
}
