import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
export class ProductDamageComponent implements OnInit {


    cols: any[];

    public datasource: any[];
    public DamageStockForm: any;
    event: any;
    DamageDetails: any[] = [];
    totalRecords: number;
    selectedDamageColumns: any[];
    editMode: boolean = false;
    btnText: string;
    display: boolean = false;
    modalHeading: string;
    setToNumber: number;


    constructor(private fb: FormBuilder, private apiService: ApiService, private toastrService: ToastrService) { }

    ngOnInit() {

      this.createForm();
      this.cols = [
        { field: 'fromNumber', header: 'FromNumber' },
        { field: 'toNumber', header: 'ToNumber' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'remarks', header: 'Remarks' },
        { field: 'createdDate', header: 'Created Date' },
      ];

      this.selectedDamageColumns = this.cols;

    }

    createForm() {
      this.DamageStockForm = this.fb.group({
        Id:[],
        FromNumber: ['', Validators.required],
        ToNumber: ['', Validators.required],
        Quantity: ['', Validators.required],
        Remarks: ['',Validators.required],
        IsActive: [true],
        CreatedBy: localStorage.getItem('UserID'),
      });

      // this.DamageStockForm.valueChanges.subscribe((data) => {
      //   this.logValidationErrors();
      // })

    }

    formErrors = {
      FromNumber: '',
      ToNumber: '',
      Quantity: '',
      Remarks: '',
    };

    // logValidationErrors(group: FormGroup = this.DamageStockForm): void {
    //   //    ;
    //   Object.keys(group.controls).forEach((key: string) => {
    //     const abstractControl = group.get(key);
    //     if (abstractControl instanceof FormGroup) {
    //       this.logValidationErrors(abstractControl);
    //     } else {
    //       this.formErrors[key] = '';
    //       if (abstractControl && !abstractControl.valid &&
    //         (abstractControl.touched || abstractControl.dirty)) {
    //         const messages = this.validationMessages[key];
    //         for (const errorKey in abstractControl.errors) {
    //           if (errorKey) {
    //             this.formErrors[key] += messages[errorKey] + ' ';
    //           }
    //         }
    //       }
    //     }
    //   });
    // }

    validationMessages = {
      'FromNumber': {
        'required': 'FromNumber is required.',
      },
      'ToNumber': {
        'required': 'ToNumber is required.',
      },
      'Quantity': {
        'required': 'Quantity is required.',
      },
      'Remarks': {
        'required': 'Remarks is required.',
      },
    }

    //this method is used to load the data grid when we needed.
    public loadLazy(event:any) {

      this.event = event;
      const obj = this.getLazyLoadingValues(this.event);
      this.getAllDamageStock(obj);
    }

    //this method use for set the requiered parameter like page number and page size etc.
    private getLazyLoadingValues(event: any): any {
      const obj = {
        pageSize: event.rows,
        pageNumber: event.first == 0 ? 1 : event.first / event.rows + 1,
        sortBy: event.sortField,
        sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC',
        search: event.globalFilter ? event.globalFilter : '',
      };
      return obj;
    }

    // get all hologram stock from the api.
    public getAllDamageStock(event: any): any {
      this.apiService.postApi( 'Damage/GetAllDamageStock',event).subscribe((res: any) => {
        if (res.responseCode == '200') {

          this.DamageDetails = res.responseData;

          this.totalRecords = res.responseData[0].totalRows;
        } else {
          this.DamageDetails = [];
          this.totalRecords = 0;
        }
      });
    }

    showDialog() {
      this.display = true;
      this.modalHeading = 'Create Damage Stock';
      this.btnText = 'Submit';
      this.DamageStockForm.reset();
      this.createForm();
    }

  //QHT-42,QHT-43 solved by working on calculate quantity functionality and fetching the values only at valid from number input
    public focusOutFunction() {
         ;
      if(this.DamageStockForm.controls['Quantity'].value !=undefined && this.DamageStockForm.controls['Quantity'].value != "" && this.DamageStockForm.controls['Quantity'].value !='0'){
        const sumQtyAndFromNumber = Number(this.DamageStockForm.controls['Quantity'].value) + Number(this.DamageStockForm.controls['FromNumber'].value) - 1;
        this.DamageStockForm.get('ToNumber').setValue(sumQtyAndFromNumber);
      }
    }

    //save the hologram stock details in the database
    public SaveDamageStockDetail() {

      if (this.DamageStockForm.invalid) {
        return;
      }
      else {
        this.save('Damage/SaveDamage');
      }
    }

    public save(url: string) {

      this.apiService.postApi( url,this.DamageStockForm.value).subscribe((response: any) => {

        if (response.responseCode == 200) {
          this.display = false;
          this.editMode = false;

          this.loadLazy(this.event);
          this.toastrService.success('', response.responseMessage);


        }
        else {
          this.toastrService.warning('', response.responseMessage);
        }
      }, err => {

        this.toastrService.error('', "Server Error");
      })
    }

  }
