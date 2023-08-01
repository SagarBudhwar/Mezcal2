import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-common-master',
  templateUrl: './common-master.component.html',
  styleUrls: ['./common-master.component.scss']
})
export class CommonMasterComponent implements OnInit {

  sales: any[] = [];
  salesState: any[] = [];
  salesBrand: any[] = [];
  modalStateHeader: string;
  pagedetails: any;
  pagedetailsType: any
  pagedetailsState: any
  pagedetailsSpecies: any
  totalRecords: any;
  modalSpeciesHeader: string
  selectedTypeColumn: any[] = []
  totalRecordsType: number
  salesType: any[] = []
  cols: any[] = [];
  displayState: boolean = false
  displayBrand: boolean = false
  displaySpecies: boolean = false
  selectedData: any[] = [];
  modalTypeHeader: any;
  selectedColumns: any[] = [];
  salectedStateColumn: any[] = []
  modalCategoryHeader: string
  totalRecordsBrand:number=0
  selectedCategoryColumn: any[] = []
  selectedBrandColumn: any[] = []
  pagedetailsCategory: any
  pagedetailsBrand: any
  totalRecordsCategory: any
  salesCategory: any[] = []

  displayType: boolean = false
  totalRecordsSpecies: number
  totalRecordsState: number
  submitted: boolean = false;
  display: boolean = false;
  selectedSpeciesColumn: any[] = []
  displayCategory: boolean = false
  salesSpecies: any[] = []
  CategoryMaster: FormGroup
  CommonMaster: FormGroup
  StateMaster: FormGroup
  TypeMaster: FormGroup
  SpeciesMaster: FormGroup
  BrandMaster: FormGroup
  modalBrandHeader: string;
  constructor(private fb: FormBuilder, private api: ApiService, private tstr: ToastrService) {


  }

  CreateFormCategory() {
    this.CategoryMaster = this.fb.group({
      ID: [null],
      ProductCategory: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]
    })
  }
  CreateFormState() {
    this.StateMaster = this.fb.group({
      ID: [0],
      StateName: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]
    })
  }
  CreateFormType() {
    this.TypeMaster = this.fb.group({
      ID: [0],
      Type: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]
    })
  }
  CreateFormSpecies() {
    this.SpeciesMaster = this.fb.group({
      ID: [0],
      SpeciesName: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]
    })
  }
  CreateFormBrand() {
    this.BrandMaster = this.fb.group({
      ID: [0],
      BrandName: ['', Validators.required],
      CreatedBy: [localStorage.getItem('UserID')],
      CreatedDate: [''],
      UpdatedBy: [localStorage.getItem('UserID')],
      UdatedDate: [''],
      IsActive: [true]
    })
  }
  lazyLoadBrand(event: any){
    this.pagedetailsBrand = event;
    const obj = this.getPageInfoBrand(this.pagedetailsBrand);
    this.getBrandList(obj);
  }
    lazyLoad(event: any){
      this.pagedetailsBrand = event;
      const obj = this.getPageInfo(this.pagedetailsCategory);
      this.getBrandList(obj);
    }
  lazyLoadCategory(event: any){
    this.pagedetailsCategory = event;
    const obj = this.getPageInfoCategory(this.pagedetailsCategory);
    this.getCategoryList(obj);
  }
  lazyLoadType(event: any) {

    //this method is called on page load to fetch data on the page
    this.pagedetailsType = event;
    const obj = this.getPageInfoType(this.pagedetailsType);
    this.getTypeList(obj);
  }
  getPageInfoBrand(event: any){

    const requestFilter = {
      PageNo: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      SearchValue: event.globalFilter ? event.globalFilter : '',
      SortColumn: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  getPageInfo(event: any){
    const requestFilter = {
      PageNo: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      SearchValue: event.globalFilter ? event.globalFilter : '',
      SortColumn: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  getPageInfoCategory(event: any){
    const requestFilter = {
      PageNo: event.first == 0 ? 1 : (event.first / event.rows) + 1,
      PageSize: event.rows,
      SearchValue: event.globalFilter ? event.globalFilter : '',
      SortColumn: event.sortField == undefined ? null : event.sortField,
      SortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC'
    }
    return requestFilter;
  }
  getPageInfoType(event: any) {
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
  getCategoryList(obj: any){
    this.api.postApi(`Common/GetCategoryList`, obj).subscribe((resp: any) => {

      if (resp.responseCode == 200) {
        this.totalRecordsCategory = resp.responseData[0].totalRows
        this.salesCategory = resp.responseData
      } else {

        this.salesCategory = []
        this.totalRecordsCategory = 0
      }
    })
  }
  getBrandList(obj: any){
    this.api.postApi(`Common/GetBrandList`, obj).subscribe((resp: any) => {

      if (resp.responseCode == 200) {
        this.totalRecordsBrand = resp.responseData[0].totalRows
        this.salesBrand = resp.responseData
      } else {

        this.salesBrand = []
        this.totalRecordsBrand = 0
      }
    })
  }

  showCategoryDialog(){
    this.displayCategory = true
    this.modalCategoryHeader = "agregar categoria"
    this.CreateFormCategory()
  }
  showBrandDialog(){
    this.displayBrand = true
    this.modalBrandHeader = "agregar marca"
    this.CreateFormBrand()
  }
  getTypeList(obj: any) {
    this.api.postApi(`Common/GetTypeMasterList`, obj).subscribe((resp: any) => {
      if (resp.responseCode == 200) {
        this.totalRecordsType = resp.responseData[0].totalRows
        this.salesType = resp.responseData
      } else {

        this.salesType = []
      }
    })
  }
  lazyLoadState(event: any) {

    //this method is called on page load to fetch data on the page
    this.pagedetailsState = event;
    const obj = this.getPageInfoState(this.pagedetailsState);
    this.getStateList(obj);
  }
  getPageInfoState(event: any) {
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
  get g() {
    return this.StateMaster.controls
  }
  get f() {
    return this.CommonMaster.controls;
  }
  get t() {
    return this.TypeMaster.controls
  }
  get s() {
    return this.SpeciesMaster.controls;
  }
  get c(){
    return this.CategoryMaster.controls
  }
  get b(){
    return this.BrandMaster.controls
  }

  showStateDialog() {
    this.modalStateHeader = "agregar estado"
    this.displayState = true
    this.CreateFormState()
  }
  showTypeDialog() {
    this.modalTypeHeader = "agregar clase"
    this.displayType = true
    this.CreateFormType()
  }
  getStateList(obj: any) {


    this.api.postApi(`Common/GetStateMasterList`, obj).subscribe((resp: any) => {

      if (resp.responseCode == 200) {
        this.totalRecordsState = resp.responseData[0].totalRows
        this.salesState = resp.responseData
      } else {

        this.salesState = []
      }
    })
  }
  showStateDialogEdit(rowData: any) {

    this.modalStateHeader = "actualizar estado"
    this.displayState = true
    this.StateMaster.patchValue({
      StateName: rowData.stateName,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  showBrandDialogEdit(rowData: any) {

    this.modalBrandHeader = "Actualizar marca"
    this.displayBrand = true
    this.BrandMaster.patchValue({
      BrandName: rowData.brandName,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  showTypeDialogEdit(rowData: any) {

    this.displayType = true
    this.modalTypeHeader = "actualizar clase"
    this.TypeMaster.patchValue({
      Type: rowData.type,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  showCategoryDialogEdit(rowData: any){
   this.displayCategory=true
    this.modalCategoryHeader = 'actualizar categoria'
    this.CategoryMaster.patchValue({
      ProductCategory: rowData.productCategory,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  editState() {
    this.api.postApi(`Common/UpdateStateMaster`, this.StateMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoState(this.pagedetailsState);
        this.getStateList(obj);
        this.salesState = resp.responseData
        this.displayState = false

      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  addBrandName() {

    this.api.postApi(`Common/AddBrandMaster`, this.BrandMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoBrand(this.pagedetailsBrand);
        this.getBrandList(obj);
        this.salesBrand = resp.responseData

        this.displayBrand = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  editBrandName() {
    this.api.postApi(`Common/UpdateBrandMaster`, this.BrandMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoBrand(this.pagedetailsBrand);
        this.getBrandList(obj);
        this.salesBrand = resp.responseData
        this.displayBrand = false

      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  addState() {
    this.api.postApi(`Common/AddStateMaster`, this.StateMaster.value).subscribe((resp: any) => {
      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoState(this.pagedetailsState);
        this.getStateList(obj);
        this.salesState = resp.responseData

        this.displayState = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }

  lazyLoadSpecies(event: any) {
    this.pagedetailsSpecies = event;
    const obj = this.getPageInfoSpecies(this.pagedetailsSpecies);
    this.getSpeciesList(obj);
  }
  getPageInfoSpecies(event: any) {
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
  getSpeciesList(obj: any) {
    this.api.postApi(`Common/GetSpeciesMasterList`, obj).subscribe((resp: any) => {

      if (resp.responseCode == 200) {
        this.totalRecordsSpecies = resp.responseData[0].totalRows
        this.salesSpecies = resp.responseData
      }else{
        this.salesSpecies=[]
        this.totalRecords = 0
      }
    })
  }

  showSpeciesDialog() {
    this.displaySpecies = true
    this.modalSpeciesHeader = "agregar especie"
    this.CreateFormSpecies()
  }
  showSpeciesDialogEdit(rowData: any) {
    this.displaySpecies = true
    this.modalSpeciesHeader = "actualizar especie"
    this.SpeciesMaster.patchValue({
      SpeciesName: rowData.speciesName,
      IsActive: rowData.isActive,
      ID: rowData.id
    })
  }
  addBrand() {

    this.api.postApi(`Common/AddBrandMaster`, this.CommonMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
      }
      else {
        this.tstr.warning(resp.responseMessage)

      }
    })
  }
  handleChangeState(event: any) {


    if (event.index == 3) {
      this.CreateFormState()
    }
    // this.CreateFormState()
  }
  handleChangeBrand(event: any) {


    if (event.index == 3) {
      this.CreateFormBrand()
    }
    // this.CreateFormBrand()
  }
  ngOnInit() {


    this.selectedColumns = this.cols;
    this.sales = []
    this.salectedStateColumn = [
      { field: 'stateName', header: 'nombre del estado' },
    ]
    this.selectedTypeColumn = [
      { field: 'type', header: 'escribir nombre' },
    ]
    this.selectedSpeciesColumn = [
      { field: 'speciesName', header: 'especie' },
    ]
    this.selectedCategoryColumn = [
      {field: 'productCategory', header: 'categoria'}
    ]
    this.selectedBrandColumn = [
      {field: 'brandName', header: 'Nombre de la marca'}
    ]
    this.salesState = []

    this.CreateFormState()
    this.CreateFormType()
    this.CreateFormSpecies()
    this.CreateFormCategory()
    this.CreateFormBrand()
  }




  addType() {
    this.api.postApi(`Common/AddTypeMaster`, this.TypeMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoType(this.pagedetailsType);
        this.getTypeList(obj);
        this.salesType = resp.responseData
        this.displayType = false
      }
      else {
        this.tstr.warning(resp.responseMessage)

      }
    })
  }
  editType() {
    this.api.postApi(`Common/UpdateTypeMaster`, this.TypeMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoType(this.pagedetailsType);
        this.getTypeList(obj);
        this.salesType = resp.responseData
        this.displayType = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  addSpecies() {
    this.api.postApi(`Common/AddSpeciesMaster`, this.SpeciesMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoSpecies(this.pagedetailsSpecies);
        this.getSpeciesList(obj);
        this.salesSpecies = resp.responseData
        this.displaySpecies = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  editSpecies() {
    this.api.postApi(`Common/UpdateSpeciesMaster`, this.SpeciesMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoSpecies(this.pagedetailsSpecies);
        this.getSpeciesList(obj);
        this.salesSpecies = resp.responseData
        this.displaySpecies = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  addCategory(){


    this.api.postApi(`Common/AddProductCategory`, this.CategoryMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoCategory(this.pagedetailsSpecies);
        this.getCategoryList(obj);
        this.salesCategory = resp.responseData
        this.displayCategory = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  editCategory(){

    this.api.postApi(`Common/UpdateProductCategory`, this.CategoryMaster.value).subscribe((resp: any) => {

      if (resp.responseCode == '200') {
        this.tstr.success(resp.responseMessage)
        const obj = this.getPageInfoCategory(this.pagedetailsSpecies);
        this.getCategoryList(obj);
        this.salesCategory = resp.responseData
        this.displayCategory = false
      }
      else {
        this.tstr.warning(resp.responseMessage)
      }
    })
  }
  submitCategory(){
    if (this.CategoryMaster.invalid) {
      return
    }
    if(this.CategoryMaster.value.ProductCategory.trim() == ''){
      // this.tstr.warning(`Enter a valid category name`)
      this.tstr.warning(`ingrese una categoria valida`)
      return
    }
    if (this.CategoryMaster.valid) {

      if (this.modalCategoryHeader == "agregar categoria") {
        this.addCategory()
      } else if (this.modalCategoryHeader == "actualizar categoria") {
      this.editCategory()
      }
    }
  }
  submitBrand(){
    if (this.BrandMaster.invalid) {
      return
    }
    if(this.BrandMaster.value.BrandName.trim() == ''){
      // this.tstr.warning(`Enter a valid brand name`)
      this.tstr.warning(`ingrese una marca valida `)
      return
    }
    if (this.BrandMaster.valid) {

      if (this.modalBrandHeader == "agregar marca") {
        this.addBrandName()
      } else if (this.modalBrandHeader == "Actualizar marca") {
        this.editBrandName()
      }
    }
  }
  submitType() {
    if (this.TypeMaster.invalid) {
      return
    }
    if(this.TypeMaster.value.Type.trim() == ''){
      this.tstr.warning(`ingrese un clase valido `)
      return
    }

    if (this.TypeMaster.valid) {

      if (this.modalTypeHeader == "agregar clase") {
        this.addType()
      } else if (this.modalTypeHeader == "actualizar clase") {
        this.editType()
      }
    }
  }
  submitState() {
    if (this.StateMaster.invalid) {
      return
    }
    if(this.StateMaster.value.StateName.trim() == ''){
      // this.tstr.warning(`Enter a valid state name`)
      this.tstr.warning(`ingrese un estado valido `)
      return
    }

    if (this.StateMaster.valid) {

      if (this.modalStateHeader == "agregar estado") {
        this.addState()
      } else if (this.modalStateHeader == "actualizar estado") {
        this.editState()
      }
    }
  }
  submitSpecies() {
    if (this.SpeciesMaster.invalid) {
      return
    }

    if(this.SpeciesMaster.value.SpeciesName.trim() == ''){
      // this.tstr.warning(`Enter a valid species name`)
      this.tstr.warning(`ingrese una especie valida`)
      return
    }
    if (this.SpeciesMaster.valid) {

      if (this.modalSpeciesHeader == "agregar especie") {
        this.addSpecies()
      } else if (this.modalSpeciesHeader == "actualizar especie") {
        this.editSpecies()
      }
    }
  }
  submit() {
    if (this.CommonMaster.invalid) {
      return
    }
    if (this.CommonMaster.valid) {

      this.addBrand();
      this.display = false;
    }
  }

}
