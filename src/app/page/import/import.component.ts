import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpExcelReadService } from 'src/app/http/http-excel-read.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    private $excel: HttpExcelReadService
  ) { }

  ngOnInit(): void {
  }
  async onUpload(e: any) {
    let files: FileList = e.target.files
    const formData = new FormData()
    formData.append('uploadedFile', files[0])
    await lastValueFrom(this.$excel.upload(formData))
  }

}
