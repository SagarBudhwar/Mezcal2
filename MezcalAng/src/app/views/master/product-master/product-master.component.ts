import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, Validator, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {
  sales: any[] = [];
  cols: any[] = [];
  colors: any[] = [];
  selectedData: any[] = [];
  attributeValue: string = '';
  ingredientsInString: string
  brandList: any[] = []
  previousImagePath: string
  selectedColumns: any[] = [];
  totalRecords: number
  categoryList: any[] = []
  productHeader: string
  imageToShow: string = ''
  isImageAvailable: boolean = false
  typeList: any[] = []
  ImageBase64: any
  pagedetails: any
  checkCheckbox: boolean = false
  stateList: any[] = []
  speciesList: any[] = []
  submitted: boolean = false;
  display: boolean = false;
  productMasterForm: FormGroup;
  ExcelReportResult: any[] = [];
  list: any[] = [];
  attributesInArray: any[] = [];
  preservationChecked: boolean = false
  earthNdWaterChecked: boolean = false
  traditionalWayChecked: boolean = false
  controlnaturalChecked: boolean = false
  plagueChecked: boolean = false
  constructor(private excelService: ExcelService, private fb: FormBuilder, private api: ApiService, private tstr: ToastrService) {

  }
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  showDialog() {
    this.checkCheckbox = false
    this.preservationChecked = false
    this.earthNdWaterChecked = false
    this.traditionalWayChecked = false
    this.uncheckAll()
    this.controlnaturalChecked = false
    this.plagueChecked = false
    this.isImageAvailable = true
    this.productHeader = 'agregar producto'
    this.imageToShow = ''
    this.createForm()
    this.productMasterForm.patchValue({
      ingredients: null
    })
    this.display = true;
  }
  createForm() {
    this.productMasterForm = this.fb.group({
      ID: [null],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      species: ['', Validators.required],
      state: ['', Validators.required],
      productName: ['', Validators.required],
      CategoryID: [0],
      BrandID: [0],
      TypeID: [0],
      SpeciesID: [0],
      Image: [],
      StateID: [0],
      ingredients: ['', Validators.required],
      ingredients2: [''],
      presentation: ['', Validators.required],
      certificationNo: ['', Validators.required],
      bottledLot: ['', Validators.required],
      companyName: ['', Validators.required],
      //productionState: ['',Validators.required],
      attributes: [Validators.required],
      attributesCheck: new FormArray([]),
      ImageBase64: [''],
      imagePath: [''],
      IsActive: [true],
      IngredientsString: ['']
    })
  }
  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }
  lazyLoad(event: any) {

    //this method is called on page load to fetch data on the page
    this.pagedetails = event;
    const obj = this.getPageInfo(this.pagedetails);
    this.getProductList(obj);
  }
  getPageInfo(event: any) {
    //this method is used to get page information


    const requestFilter = {
      PageNo: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      SearchValue: event.globalFilter ? event.globalFilter : '',
      SortColumn: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  getProductList(obj: any) {
    
    this.api.postApi(`Product/GetProductList`, obj).subscribe((resp: any) => {

      if (resp.responseCode == 200) {
        this.totalRecords = resp.responseData[0].totalRows
        this.sales = resp.responseData
      } else {
        this.sales = []
        this.totalRecords = 0
      }
    })
  }
  getBrandData() {
    this.api.getApi(`Product/GetBrandListForDDL`).subscribe((resp: any) => {

      this.brandList = resp.responseData
    })
  }
  getCategoryData() {
    this.api.getApi(`Product/GetCategoryListForDDL`).subscribe((resp: any) => {

      this.categoryList = resp.responseData
    })
  }

  onImageUpload(event: any) {


    var fileReader = new FileReader();
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.productMasterForm.patchValue({
        ImageBase64: ''
      })
      // this.tstr.warning('Only images are supported.');
      this.tstr.warning('ingrese un producto valido');
      return;
    }
    else if (event.target.files[0].size > 2500000) {
      this.productMasterForm.patchValue({
        ImageBase64: ''
      })
      // this.tstr.error('', 'Image size is more than 2.5 MB Please reduce or select other');
      this.tstr.error('', 'imagen mayor a 2.5MB por favor reducir resolucion ')
      return;
    }
    else {
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = () => {
        this.ImageBase64 = fileReader.result;
        this.imageToShow = this.ImageBase64

      };
    }
  }


  getTypeData() {
    this.api.getApi(`Product/GetTypeListForDDL`).subscribe((resp: any) => {
      this.typeList = resp.responseData
    })
  }
  getSpeciesData() {
    this.api.getApi(`Product/GetSpeciesListForDDL`).subscribe((resp: any) => {

      this.speciesList = resp.responseData
    })
  }
  getStateData() {
    this.api.getApi(`Product/GetStateListForDDL`).subscribe((resp: any) => {

      this.stateList = resp.responseData
    })
  }
  ngOnInit() {
    this.cols = [
      { field: 'productName', header: 'nombre del producto' },
      { field: 'brandName', header: 'nombre de la marca' },
      { field: 'productCategory', header: 'Categoria' },
      { field: 'type', header: 'Clase' },
      { field: 'speciesName', header: 'Especie de maguey' },
      { field: 'stateName', header: 'nombre del estado' },
      { field: 'certificationNo', header: 'Numero de certificado.' },
      { field: 'presentation', header: 'Presentacion' },
      { field: 'bottledLot', header: 'Lote evasado' },
      { field: 'companyName', header: 'Comercializado por' },
      // { field: 'productionState', header: 'Production State' },
    ];
    this.selectedColumns = this.cols;
    this.sales = [];
    this.createForm()
    this.getBrandData()
    this.getCategoryData()
    this.getTypeData()
    this.getSpeciesData()
    this.getStateData()
  }
  setDefaultValuesOfCheckBox(){
    this.preservationChecked = false
    this.earthNdWaterChecked = false
    this.traditionalWayChecked = false
    this.controlnaturalChecked = false
    this.plagueChecked = false
  }
  editProductData(rowData: any) {
    // this.uncheckAll()
    this.productMasterForm.reset()
    this.createForm()
    this.setDefaultValuesOfCheckBox()
    this.checkCheckbox = true
    this.attributesInArray = rowData.attributes.split(',')
    const formArray: FormArray = this.productMasterForm.get('attributesCheck') as FormArray;
    formArray.clear()
    for (var i = 0; i < this.attributesInArray.length; i++) {
      if (this.attributesInArray[i] == 'Preservacion de la Diversidad Biológica de Magueyes') {
        this.preservationChecked = true
        formArray.push(new FormControl(this.attributesInArray[i]));
      }
      else if (this.attributesInArray[i] == 'Conservacion de Suelo y Agua') {
        this.earthNdWaterChecked = true
        formArray.push(new FormControl(this.attributesInArray[i]));
      }
      else if (this.attributesInArray[i] == 'Manejo Tradicional del Maguey') {
        this.traditionalWayChecked = true
        formArray.push(new FormControl(this.attributesInArray[i]));
      }
      else if (this.attributesInArray[i] == 'Aprovechamiento Controlado de Magueyes Silvestres') {
        this.controlnaturalChecked = true
        formArray.push(new FormControl(this.attributesInArray[i]));
      }
      else if (this.attributesInArray[i] == 'Manejo intergado de Plagas y Enfermedades') {
        this.plagueChecked = true
        formArray.push(new FormControl(this.attributesInArray[i]));
      }
    }
    this.checkboxes.forEach((element) => {
      // element.nativeElement.checked = false;
      var flag=0
      var nativeValue = element.nativeElement.value
      for(var i = 0;i<this.attributesInArray.length;i++){
        if(nativeValue == this.attributesInArray[i]){
          flag=1
          element.nativeElement.checked=true
          break
        }
      }
      if(flag==0){
        element.nativeElement.checked=false
      }
    });
    this.display = true
    this.productMasterForm.patchValue({
      ImageBase64: ''
    })
    this.previousImagePath = rowData.imagePath
    this.isImageAvailable = true
    this.productHeader = 'actualizacion de producto '
    this.imageToShow = rowData.imagePath
    let ingredientsArray = rowData.ingredients == null ? null : rowData.ingredients.split(',')

    let brandData = this.brandList.find(x => x.id == rowData.brandID)
    let categoryData = this.categoryList.find(x => x.id == rowData.categoryId)
    let stateData = this.stateList.find(x => x.id == rowData.stateID)
    let speciesData = this.speciesList.find(x => x.id == rowData.speciesID)
    let typeData = this.typeList.find(x => x.id == rowData.typeID)
    var attributesInString = (this.productMasterForm.value.attributesCheck).toString()
    this.productMasterForm.patchValue({
      productName: rowData.productName,
      certificationNo: rowData.certificationNo,
      presentation: rowData.presentation,
      bottledLot: rowData.bottledLot,
      // productionState: rowData.productionState,
      CategoryID: rowData.categoryId,
      BrandID: rowData.brandID,
      SpeciesID: rowData.speciesID,
      TypeID: rowData.typeID,
      StateID: rowData.stateID,
      brand: brandData,
      category: categoryData,
      state: stateData,
      companyName: rowData.companyName,
      species: speciesData,
      type: typeData,
      ingredients: ingredientsArray,
      ID: rowData.productID,
      createdBy: localStorage.getItem('UserID'),
      IsActive: rowData.isActive,
      attributes: attributesInString,
      imageBase64: this.ImageBase64,
    })
  }

  saveBrand() {


    if (this.productMasterForm.value.productName.trim() == '') {
      // this.tstr.warning(`Enter a valid product name`)
      this.tstr.warning(`ingrese un producto valido`)
      return
    }
    this.ingredientsInString = (this.productMasterForm.value.ingredients).toString()
    var attributesInString = (this.productMasterForm.value.attributesCheck).toString()
    this.productMasterForm.patchValue({
      BrandID: this.productMasterForm.value.brand.id,
      CategoryID: this.productMasterForm.value.category.id,
      TypeID: this.productMasterForm.value.type.id,
      SpeciesID: this.productMasterForm.value.species.id,
      StateID: this.productMasterForm.value.state.id,
      ingredientsString: this.ingredientsInString,
    })
    let obj = {
      productName: this.productMasterForm.value.productName,
      categoryID: this.productMasterForm.value.CategoryID,
      brandID: this.productMasterForm.value.BrandID,
      speciesID: this.productMasterForm.value.SpeciesID,
      typeID: this.productMasterForm.value.TypeID,
      stateID: this.productMasterForm.value.StateID,
      ingredients: this.ingredientsInString,
      presentation: this.productMasterForm.value.presentation,
      certificationNo: this.productMasterForm.value.certificationNo,
      bottledLot: this.productMasterForm.value.bottledLot,
      companyName: this.productMasterForm.value.companyName,
      // productionState: this.productMasterForm.value.productionState,
      createdBy: localStorage.getItem('UserID'),
      isActive: this.productMasterForm.value.IsActive,
      imageBase64: this.ImageBase64,
      attributes: attributesInString
    }

    this.api.postApi(`Product/AddProduct`, obj).subscribe((resp: any) => {
      if (resp.responseCode == "200") {


        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfo(this.pagedetails);
        this.getProductList(obj)
        this.display = false
      } else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  get f() {
    return this.productMasterForm.controls
  }
  onCheckChange(event: any) {
    const formArray: FormArray = this.productMasterForm.get('attributesCheck') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
      // this.productMasterForm.value.attributesCheck.push(event.target.value)
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  editBrand() {
    if(this.productMasterForm.value.attributesCheck.length<1){
      this.tstr.warning(`por favor seleccione atributos`)
      return
    }
    let obj = { ...this.productMasterForm.value }
    let ingredientsString = (obj.ingredients).toString()
    obj.createdBy = localStorage.getItem('UserID')
    obj.ingredients = ingredientsString
    obj.companyName = this.productMasterForm.value.companyName
    obj.attributes = (this.productMasterForm.value.attributesCheck).toString()
    obj.imageBase64 = this.ImageBase64,

      obj.speciesID = this.productMasterForm.value.species.id
    obj.brandID = this.productMasterForm.value.brand.id
    obj.categoryID = this.productMasterForm.value.category.id
    obj.typeID = this.productMasterForm.value.type.id
    obj.stateID = this.productMasterForm.value.state.id
    obj.previousImagePath = this.previousImagePath
    this.api.postApi(`Product/UpdateProduct`, obj).subscribe((resp: any) => {


      if (resp.responseCode == "200") {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfo(this.pagedetails);
        this.getProductList(obj)
        this.display = false
      } else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  viewImage(rowData: any) {

    if (rowData.imagePath.includes(`localhost`)) {
      window.open(rowData.imagePath, '_blank')
    } else {
      var http = new XMLHttpRequest();
      http.open('HEAD', rowData.imagePath, false);
      http.send();

      if (http.status != 200) {
        window.open('https://sureassure.com/Files/noimage.png', '_blank')
      } else {
        window.open(rowData.imagePath, '_blank')
      }
    }
  }
  submit() {
    if (this.productMasterForm.invalid) {
      return
    }
    if (this.productMasterForm.valid) {
      if (this.productHeader == 'agregar producto') {
        this.saveBrand()
      } else if (this.productHeader == 'actualizacion de producto ') {
        this.editBrand()
      }
    }
  }


  //////////////////////////////// Export to Excel Code Start

  exportAsXLSX() {

    this.loadLazyExportExcel();
    // this.excelService.exportAsExcelFile(this.ExcelReport, 'PassBook_Report');
  }
  loadLazyExportExcel() {

    const obj = this.getLazyLoadingValuesExportToExcel(this.pagedetails);
    this.getLazyLoadLblPrintForExport(obj);

  }
  getLazyLoadingValuesExportToExcel(event: any): any {
    ;
    const obj = {
      pageSize: -1,
      pageNo: 1,
      sortColumn: event.multiSortMeta == undefined ? 'ProductId' : event.multiSortMeta[0].field,
      sortOrder: event.multiSortMeta == undefined ? 'Desc' : event.multiSortMeta[0].order == 1 ? 'Desc' : 'Asc',
      searchValue: event.globalFilter ? event.globalFilter : '',
    };
    return obj;
  }
  //////// Get Product List for Excel

  getLazyLoadLblPrintForExport(event: any) {
    this.api.postApi('Product/GetProductList', event).subscribe((response: any) => {

      if (response.responseCode == 200) {

        //this.list = response.ResponseData;
        this.totalRecords = response.responseData[0].totalRows;
        this.ExcelReportResult = [];

        for (let index = 0; index < response.responseData.length; index++) {
          let colHead = {
            'Sr. No': index + 1,
            'nombre del producto': response.responseData[index].productName,
            'nombre de la marca': response.responseData[index].brandName,
            'Categoria': response.responseData[index].productCategory,
            'Clase': response.responseData[index].type,
            'Especie de Maguey': response.responseData[index].speciesName,
            'Nombre del Estado': response.responseData[index].stateName,
            'Numero de Certificado.': response.responseData[index].certificationNo,
            'Presentacion': response.responseData[index].presentation,
            'Lote Evasado': response.responseData[index].bottledLot,
            'Comercializado por': response.responseData[index].companyName,                    //this._date.transform(response.ResponseData[index].transactionDate, 'dd-MMM-y'),

          }

          this.ExcelReportResult.push(colHead);
          // this.printReport[index].IssueDate = this._date.transform(response.ResponseData[index].IssueDate, 'dd-MMM-y')
        }
        this.ExcelReportResult.slice();



        this.excelService.exportAsExcelFile(this.ExcelReportResult, 'Configurar Producto - ' + new Date());


      }
      else if (response.responseCode == 400) {

        this.tstr.warning('', response.responseMessage);
      }
      else {
        this.list = response.ResponseData;
        this.totalRecords = 0;
      }
    }, err => {
      this.list = [];
      this.totalRecords = 0;
    });
  }


  //////////////////////////////// Export to Excel Code End


}