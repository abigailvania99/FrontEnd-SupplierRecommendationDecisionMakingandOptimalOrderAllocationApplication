import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSubcriteriaElement, AddSupplierElement, AhpReq, ChangePasswordUser, PrometheeReq, ResponseService, ResponseServiceAhp, ResponseServicePromethee, ResponseServiceSimplex, ResponseServiceUser, SimplexReq, SubcriteriaElement, SupplierElement, UserElement } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/supplier/';
  urlSubcriteria = 'http://localhost:8081/subcriteria/';
  urlUser = 'http://localhost:8081/user/';
  urlAhpPrometheeSimplex = 'http://localhost:8081/ahpprometheesimplex/';

  public saveSupplier(supplier: AddSupplierElement){
    return this.http.post<ResponseService>(this.url + 'addSupplier', supplier);
  }

  public getSupplier(userId: number){
     return this.http.get<ResponseService>(this.url + 'getAllSupplier?id=' + userId);
  }

  public updateSupplier(supplier: SupplierElement){
    return this.http.put<ResponseService>(this.url + 'updateSupplier', supplier);
  }

  public deleteSupplier(id: number){
    return this.http.delete<ResponseService>(this.url + 'deleteSupplier?id=' + id);
  }

  public saveSubcriteria(subcriteria: AddSubcriteriaElement){
    return this.http.post<ResponseService>(this.urlSubcriteria + 'addSubcriteria', subcriteria);
  }

  public getSubcriteria(userId: number){
     return this.http.get<ResponseService>(this.urlSubcriteria + 'getAllSubcriteria?id=' + userId);
  }

  public updateSubcriteria(subcriteria: SubcriteriaElement){
    return this.http.put<ResponseService>(this.urlSubcriteria + 'updateSubcriteria', subcriteria);
  }

  public deleteSubcriteria(id: number){
    return this.http.delete<ResponseService>(this.urlSubcriteria + 'deleteSubcriteria?id=' + id);
  }
  public saveUser(user: UserElement){
    return this.http.post<ResponseService>(this.urlUser + 'addUser', user);
  }

  public getUser(email: string){
    return this.http.get<ResponseServiceUser>(this.urlUser + 'getUser?email=' + email);
  }

  public updatePassword(param: ChangePasswordUser){
    return this.http.put<ResponseService>(this.urlUser + 'updatePassword', param);
  }

  public countSimplex(param: SimplexReq){
    return this.http.post<ResponseServiceSimplex>(this.urlAhpPrometheeSimplex + 'simplex', param);
  }

  public countAHP(param: AhpReq){
    return this.http.post<ResponseServiceAhp>(this.urlAhpPrometheeSimplex + 'ahp', param);
  }

  public countPromethee(param: PrometheeReq){
    return this.http.post<ResponseServicePromethee>(this.urlAhpPrometheeSimplex + 'promethee', param);
  }

}
