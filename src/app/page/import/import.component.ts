import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpExcelReadService } from 'src/app/http/http-excel-read.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    private $excel: HttpExcelReadService,
    private $loader: NgxUiLoaderService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await Swal.fire({
      title: "Enter your password",
      allowEnterKey: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        if (v.value == 'apple') {
          Swal.fire({
            title:"SUCCESS",
            icon:'success',
            showConfirmButton:false,
            timer:1500
          })
        } else {
          this.router.navigate([''])
        }
      } else {
        this.router.navigate([''])
      }
    })

  }
  async onUpload(e: any) {
    try {
      this.$loader.start()
      let files: FileList = e.target.files
      const formData = new FormData()
      formData.append('uploadedFile', files[0])
      await lastValueFrom(this.$excel.upload(formData))
      this.$loader.stop()
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['query-data']).then(() => location.reload())
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

}
