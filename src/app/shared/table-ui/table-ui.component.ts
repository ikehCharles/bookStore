import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface InitDisplayedCol {
  name: string;
  type: string;
  value: string;
  key?: string;
  values?: string[];
  maxLen?: number;
}

export interface More {
  name: string;
  value: string;
}
export interface TableItem {
  auditID: string;
  id: string;
}
export interface ClickMoreRes {
  option: More;
  item: any;
}

@Component({
  selector: 'app-table-ui',
  templateUrl: './table-ui.component.html',
  styleUrls: ['./table-ui.component.css'],
})
export class TableUiComponent implements OnInit {
  @Input() data: any;
  @Input() initColumns!: InitDisplayedCol[];
  @Input() more!: More[];

  @Output('onCheckboxCheck') onCheckboxCheck: EventEmitter<any> =
    new EventEmitter();
  @Output('onClickMore') onClickMore: EventEmitter<any> = new EventEmitter();

  public masterCheckboxChecked!: boolean;
  public displayedColumns!: string[];
  

  constructor() {}

  onCheck(event: MatCheckboxChange, item: any) {
    if (this.masterCheckboxChecked) this.masterCheckboxChecked = false;
    const elemCount = this.data.length;
    const selectedData: any[] = [];
    this.data.map((d: any) => {
      if (d.id === item.id) d.checked = event.checked;
      if (d.checked) {
        selectedData.push(d);
      }
    });
    if (selectedData.length === elemCount) this.masterCheckboxChecked = true;
    this.onCheckboxCheck.emit(selectedData);
  }

  onCheckAll(event: MatCheckboxChange) {
    this.masterCheckboxChecked = event.checked;
    this.data.forEach((element: any) => {
      element.checked = event.checked;
    });
    event.checked
      ? this.onCheckboxCheck.emit(this.data)
      : this.onCheckboxCheck.emit([]);
  }

  unCheckAll() {
    this.masterCheckboxChecked = false;
    this.data.forEach((element: any) => {
      element.checked = false;
    });
  }

  clickMore(option: More, item: TableItem) {
    const value: ClickMoreRes = {
      option,
      item,
    };
    this.onClickMore.emit(value);
  }

  ngOnInit(): void {
    this.displayedColumns = this.initColumns?.map((col) => col.value);
  }
}
