export interface SubcriteriaElement {
  id: number;
  userId?: number;
  criteria: string;
  subcriteria: string;
  type: string;
}

export interface AddSubcriteriaElement {
  criteria: string;
  subcriteria: string;
  type: string;
  userId?: number;

}

export interface SupplierElement {
  id: number;
  userId?: number;
  name: string;
  phone: string;
  address: string;
}

export interface AddSupplierElement {
  name: string;
  phone: string;
  address: string;
  userId?: number;

}

export interface TableAhp {
  score ?: number;
  subcriteria1?: SubcriteriaElement;
  subcriteria2?: SubcriteriaElement;

}

export interface ResponseService{
  status?: string;
  message ?: string;
  datas ?: any[];
}

export interface ResponseServiceUser{
  status?: string;
  message ?: string;
  datas ?: UserElement;
}

export interface UserElement{
  id?: number;
  name: string;
  email: string;
  password: string;
  answer: string;
}

export interface ChangePasswordUser{
  id: number;
  password: string;
}

export interface SimplexReq {
  inputMatrix: number[];
}

export interface SimplexResponse{
  result: number[];
}

export interface ResponseServiceSimplex{
  status?: string;
  message ?: string;
  datas ?: SimplexResponse;
}

export interface AhpReq{
  length: number;
  matrix: number[];
}

export interface AhpResponse{
  perbandinganBerpasangan: number[][];
  normalisasi: number[][];
  bobotPrioritas: number[];
  perbandinganBerpasanganDikaliBobot: number[][];
  pembagianDenganBobot: number[][];
  lambdaX: number;
  ci: number;
  cr: number;
}

export interface ResponseServiceAhp{
  status?: string;
  message ?: string;
  datas ?: AhpResponse;
}

export interface PrometheeResponse{
  nilaiAlternatif: number[][];
  normalisasi: number[][];
  selisih: number[][];
  nilaiPreferensi: number[][];
  nilaiIndeksPreferensiMultiKriteria: [][];
  aggregatPreferensi: number[][];
  enteringFlow: number[];
  leavingFlow: number[];
  netFlow: number[];
  rank: number[];
}

export interface PrometheeReq{
  matrix: number[];
  type: string[];
  bobot: number[];
  lengthSupplier: number;
}

export interface ResponseServicePromethee{
  status?: string;
  message ?: string;
  datas ?: PrometheeResponse;
}
