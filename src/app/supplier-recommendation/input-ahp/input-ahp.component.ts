import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AhpResponse, PrometheeResponse, ResponseServiceAhp, TableAhp } from 'src/app/model/model';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-input-ahp',
  templateUrl: './input-ahp.component.html',
  styleUrls: ['./input-ahp.component.css'],
})
export class InputAhpComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['subcriteriaA', 'score', 'subcriteriaB'];

  dataSource: any;

  @Input() subcriteriaData: any;

  @Input() supplierData: any;

  dataTableAHP: TableAhp[] = [];
  tabelScore: number[] = [];
  validationTabel = false;
  prometheeTabelScore: number[] = [];
  validationTabelPromethee = false;
  submitted = false;
  submittedPromethee = false;
  crValidation = false;
  bobot: number[] = [];
  type: string[] = [];
  columnSubcriteria: string[] = [];
  columnSupplier: string[] = [];
  rowSupplier: string[] = [];
  rowNilaiAlternatif: string[] = [];
  rankSupplier: number[] = [];
  // @ts-ignore
  ahpResp: AhpResponse;
  // @ts-ignore
  prometheeResp: PrometheeResponse;
  processAhp = false;
  processPromethee = false;


  constructor(private service: ServiceService) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTableAHP.length = 0;
    this.columnSubcriteria.length = 0;
    this.type.length = 0;
    this.rowSupplier.length = 0;
    this.columnSupplier.length = 0;
    this.rowNilaiAlternatif.length = 0;

    let i, j;
    const k = 0;
    for (i = 0; i < this.subcriteriaData.length; i++) {
      this.type.push(this.subcriteriaData[i].type);
      this.columnSubcriteria.push(this.subcriteriaData[i].subcriteria);
      for (j = 0; j < this.subcriteriaData.length; j++) {
        if (i === j || j < i) { continue; }
        else {
          this.dataTableAHP.push({
            subcriteria1: this.subcriteriaData[i],
            subcriteria2: this.subcriteriaData[j],
          });
        }
      }
    }
    console.log(this.dataTableAHP);
    this.dataSource = new MatTableDataSource<TableAhp>(this.dataTableAHP);

    for (i = 0; i < this.supplierData.length; i++) {
      this.columnSupplier.push(this.supplierData[i].name);
      this.rowNilaiAlternatif.push(this.supplierData[i].name);
      for (j = 0; j < this.supplierData.length; j++){
        if (i !== j){
          this.rowSupplier.push('D(' + this.supplierData[i].name + '-' + this.supplierData[j].name + ')');
        }
      }
    }

    this.rowNilaiAlternatif.push('max');
    this.rowNilaiAlternatif.push('min');
  }

  calculateAhp() {
    this.tabelScore = [];
    this.submitted = true;
    this.validationTabel = false;
    this.crValidation = false;


    let i, k;
    k = 0;

    for (i = 0; i < this.dataSource.filteredData.length; i++) {
      if (this.dataSource.filteredData[i].score <=0) {
        this.validationTabel = true;
        this.tabelScore.length = 0;
        break;
      }else if(this.dataSource.filteredData[i].score){
        this.validationTabel = false;
        this.tabelScore.push(this.dataSource.filteredData[i].score);
      }
      else {
        this.validationTabel = true;
        this.tabelScore.length = 0;
        break;
      }
    }

    if (!this.validationTabel){
      this.processAhp = true;
      this.service.countAHP({
        length: this.subcriteriaData.length,
        matrix: this.tabelScore
      }).subscribe(
        data => {
          this.processAhp = false;
          console.log(data.datas?.cr);
          // @ts-ignore
          this.ahpResp = data.datas;
          // @ts-ignore
          this.bobot = data.datas?.bobotPrioritas;
          this.validasiCR(data);
        }
      );
    }
  }

  validasiCR(data: ResponseServiceAhp) {
    // @ts-ignore
    if (data.datas?.cr >= 0.1) {
      this.crValidation = true;
    }
    else {
      this.crValidation = false;
      const element: any = document.getElementById('scorePromethee');
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  }

  calculatePromethee() {
    this.validationTabelPromethee = false;
    this.submittedPromethee = true;
    if (this.prometheeTabelScore.length === 0) {
      this.validationTabelPromethee = true;
    } else {
      let i;
      for (i = 0; i < this.prometheeTabelScore.length; i++) {
        console.log(this.prometheeTabelScore[i]);
        if (this.prometheeTabelScore[i] === undefined || this.prometheeTabelScore[i] === null) {
          this.validationTabelPromethee = true;
          break;
        } else if(this.prometheeTabelScore[i]<0){
          this.validationTabelPromethee = true;
          break;
        }
        else {
          this.validationTabelPromethee = false;
        }
      }
    }

    if (this.submittedPromethee && !this.validationTabelPromethee){

      this.processPromethee = true;
      this.service.countPromethee({
        matrix: this.prometheeTabelScore,
        bobot: this.bobot,
        type: this.type,
        lengthSupplier: this.supplierData.length
      }).subscribe(
        data => {
          this.processPromethee = false;
          // @ts-ignore
          this.prometheeResp = data.datas;
          let i;
          for (i = 0; i < this.prometheeResp.rank.length; i++){
            this.rankSupplier[this.prometheeResp.rank[i]] = i + 1;
          }
          console.log(this.rankSupplier);
          const element: any = document.getElementById('resultAhpPromethee');
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 10);
        }
      );
    }
    console.log(this.prometheeTabelScore);
  }
}
