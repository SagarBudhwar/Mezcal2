import { Component, OnInit } from '@angular/core';
import { ApiService} from 'src/app/services/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data:any;
  usersCount: any
  hologramStockCount: any
  mappingCount: any
  yearRange: any
  selectedCity: any
  deMappingCount: any
  damagedCount: any
  stolenCount: any
  mappingData: any
  deMappingData: any
  damageData: any
  stolenData: any
  userRegistrationData: any
  constructor(private api: ApiService) {
  //   this.data = {
  //     datasets: [{
  //         data: [
  //             11,
  //             16,
  //             7,
  //             3
  //         ],
  //         backgroundColor: [
  //             "#ffa726",
  //             "#43a047",
  //             "#e53935",
  //             "#26c6da"
  //         ],
  //         label: 'My dataset'
  //     }],
  //     labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April"
  //     ]
  // }
  }

  ngOnInit() {
    var year = (new Date()).getFullYear()

    this.yearRange = [
      {name: year-2, code: 'NY'},
      {name: year-1, code: 'RM'},
      {name: year, code: 'LDN'}
  ];
    this.selectedCity=this.yearRange[2]
    this.getCountForDashboard(year)
    this.getMappingDataForDashboard(year)
    this.getDamageDataForDashboard(year)
    this.getDemappingDataForDashboard(year)
    this.getStolenDataForDashboard(year)
    this.getUsersRegisteredDataForDashboard(year)

  }

  valueChanged(){

    var year = this.selectedCity.name
    this.getMappingDataForDashboard(year)
    this.getDamageDataForDashboard(year)
    this.getDemappingDataForDashboard(year)
    this.getStolenDataForDashboard(year)
    this.getUsersRegisteredDataForDashboard(year)
  }

  getCountForDashboard(year: number){
    this.api.getApi(`Dashboard/GetCountForDashboard`).subscribe((resp: any)=> {

      if(resp.responseCode == 200){
        this.usersCount = resp.responseData[0].totalUser
        this.hologramStockCount = resp.responseData[0].totalHologramStock
        this.mappingCount = resp.responseData[0].totalMapping
        this.damagedCount = resp.responseData[0].totalDamage
        this.deMappingCount = resp.responseData[0].totalDeMapping
        this.stolenCount = resp.responseData[0].totalHologramStolen
      }
    })
  }
  getStolenDataForDashboard(year: number){
    this.api.getApi(`Dashboard/GetStolenDataForDashboard?year=${year}`).subscribe((resp: any) =>{
      this.stolenData = resp.responseData
    })
  }
  getDamageDataForDashboard(year: number){
    this.api.getApi(`Dashboard/GetDamageDataForDashboard?year=${year}`).subscribe((resp:any) => {
      this.damageData = resp.responseData
    })
  }
  getDemappingDataForDashboard(year: number){
    this.api.getApi(`Dashboard/GetDeMappingDataForDashboard?year=${year}`).subscribe((resp:any) => {
      this.deMappingData = resp.responseData
    })
  }
  getUsersRegisteredDataForDashboard(year: number){
    this.api.getApi(`Dashboard/GetRegisteredDataForDashboard?year=${year}`).subscribe((resp:any) => {
      this.userRegistrationData = resp.responseData
    })
  }
  getMappingDataForDashboard(year: number){
    this.api.getApi(`Dashboard/GetMappingDataForDashboard?year=${year}`).subscribe((resp: any) => {
      this.mappingData = resp.responseData
    })
  }


}
