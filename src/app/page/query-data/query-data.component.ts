import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInOnEnterAnimation } from 'angular-animations';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpDepartmentService } from 'src/app/http/http-department.service';
import { HttpRecordService } from 'src/app/http/http-record.service';

@Component({
  selector: 'app-query-data',
  templateUrl: './query-data.component.html',
  styleUrls: ['./query-data.component.scss'],
  animations: [fadeInOnEnterAnimation()],
  providers: [

  ]
})
export class QueryDataComponent implements OnInit {

  filterOption: string[] = ['department code', 'employee code']
  filterSelected: any = 'department code'
  departmentOption: any = []
  // departmentCtrl = new FormControl([])
  departmentSelected: any = []

  start: any
  end: any

  mode: string = ''
  summary: boolean = true
  detail: boolean = false

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource([]);

  userOption: any = []
  userSelect: any = null

  radioSelected!: MatRadioChange

  employeeCodeSelected: any = null

  constructor(
    private $department: HttpDepartmentService,
    private _liveAnnouncer: LiveAnnouncer,
    private $record: HttpRecordService,

  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.departmentOption = await lastValueFrom(this.$department.departmentOption(new HttpParams()))
      this.onSubmit()
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }


  // valueChange(e: any) {
  //   this.departmentSelected.push(e)
  // }
  onSelectMode2(e: MatRadioChange) {
    this.radioSelected = e
  }
  onSelectMode(mode: string, e: any) {
    let checked = e.checked

    // if (!this.summary && !this.detail) {
    //   if (mode == 'summary') {
    //     this.summary = true
    //   }
    //   if (mode == 'detail') {
    //     this.detail = true
    //   }
    // } else
    //   if (mode == 'summary') {
    //     this.summary = true
    //     this.detail = false
    //   } else
    //     if (mode == 'detail') {
    //       this.detail = true
    //       this.summary = false
    //     }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async onSubmit() {
    try {
      this.userSelect = 'all'
      this.displayedColumns = []
      let params: HttpParams = new HttpParams()
      params = params.set('department', JSON.stringify(this.departmentSelected))
      params = params.set('start', moment(this.start).format('YYYY-MM-DD'))
      params = params.set('end', moment(this.end).format('YYYY-MM-DD'))
      params = params.set('sort', 1)
      this.mode = this.radioSelected?.value ? this.radioSelected.value : 'summary'
      params = params.set('mode', this.mode)
      params = params.set('employeeCode', this.employeeCodeSelected)
      const result: any = await lastValueFrom(this.$record.get(params))
      if (this.mode == 'summary') {
        this.displayedColumns = ['department', 'name', 'employeeCode', 'totalWh', 'totalOT', 'totalOT2', 'totalOT3', 'totalOT4', 'totalOT5', 'totalAll'];
        this.dataSource = new MatTableDataSource(result)
        this.userOption = [...new Map(result.map((item: any) =>
          [item['employeeCode'], item])).values()];
      }
      if (this.mode == 'detail') {
        this.displayedColumns = ['department', 'name', 'employeeCode', 'type', 'date', 'in', 'out', 'wh', 'OT', 'OT2', 'OT3', 'OT4', 'OT5'];
        this.dataSource = new MatTableDataSource(result.map((item: any) => {
          item.date = moment(item.date).format('DD-MMM-YYYY')
          return item
        }))
        this.userOption = [...new Map(result.map((item: any) =>
          [item['employeeCode'], item])).values()];


      }

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  cssType(value: string) {
    if (value.toLocaleLowerCase() == 'workday') return 'text-workday'
    return 'text-weekend'
  }
  hideValueAfterFirst(key: string, index: number) {
    if (index != 0) {
      let prevRow = this.dataSource.filteredData[index - 1]
      let curRow = this.dataSource.filteredData[index]
      if (prevRow[key] == curRow[key]) return false
    }
    return true
  }
  cssTime(textTime: string) {
    if (textTime) {
      let sp = textTime.split(':')
      if (Number(sp[0]) > 0 || Number(sp[1]) > 0) return 'text-time'
    }
    return ''
  }

  onChangeUserSelect() {
    if (this.userSelect != 'all') {
      this.dataSource.filter = this.userSelect
    } else {
      this.dataSource.filter = ''
    }
  }

  footerSum(key: string) {
    if (this.dataSource.filteredData) {
      let data = this.dataSource.filteredData
      const hour = data.reduce((p: any, n: any) => {
        p.h = p.h + n.total[key]['h']
        p.m = p.m + n.total[key]['m']
        if (p.m >= 60) {
          p.m = p.m - 60
          p.h = p.h + 1
        }
        return p
      }, { h: 0, m: 0 })

      return `${hour.h.toString().padStart(2, '0')}:${hour.m.toString().padStart(2, '0')}`
    }
    return ''
  }

  // todo onChangeFilter
  onChangeFilter() {
    if (this.filterSelected == 'employee code') {
      this.departmentSelected = []
    }
    if (this.filterSelected == 'department code') {
      this.employeeCodeSelected = null
    }
  }

  // todo validateSubmitButton
  validateSubmitButton() {
    if (this.filterSelected == 'employee code') {
      if (this.employeeCodeSelected && this.start && this.end) return false
    }
    if (this.filterSelected == 'department code') {
      if (this.departmentSelected && this.departmentSelected.length > 0 && this.start && this.end) return false
    }
    return true
  }

}
