import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SicoobService {

  constructor() { }

  async createClient(data: any) {
    // this.api.post(environment.apiUrl )
  }

  async getClient(id: string) {
    // this.api.post(environment.apiUrl )
  }

  async getAllClients() {
    // this.api.post(environment.apiUrl )
  }

  async deleteClient(id: string) {
    // this.api.post(environment.apiUrl )
  }

  async createBoleto(data: any) {
    // this.api.post(environment.apiUrl + 'boletos')
  }

  async getBoleto(id: string) {
    // this.api.get(environment.apiUrl + 'boletos')
  }

  async getBoletoByClient(cpfCnpj: string) {
    // this.api.get(environment.apiUrl + 'boletos/pagadores/' + cpfCnpj)
  }

  async getSegundaVia(data: any) {
    // this.api.get(environment.apiUrl + 'boletos/segunda-via')
  }

}
