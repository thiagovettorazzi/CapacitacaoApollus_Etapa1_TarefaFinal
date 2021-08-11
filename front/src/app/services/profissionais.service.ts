import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { idAtual, profissionais } from '../mocks/bd';
import { Profissional } from '../models/profissional.model';

@Injectable({
  providedIn: 'root'
})

export class ProfissionaisService {
  constructor() { }
  
  public listarProfissionais(pesquisa: string): Observable<Profissional[]> {
    let resultado: Profissional[] = [];

    if (pesquisa) {
      resultado = profissionais.filter(item =>  item.nome .toLowerCase().includes(pesquisa) ||
                                                item.cargo.toLowerCase().includes(pesquisa) ||
                                                item.cpf  .toLowerCase().includes(pesquisa) ||
                                                item.nis  .toLowerCase().includes(pesquisa));
    }
    else {
      resultado = profissionais;
    }
    
    return new Observable(subscriber => {
      //setTimeout(() => {
        subscriber.next(resultado);
        subscriber.complete();
      //}, 2000);
    });
  }
  
  public adicionarProfissional(profissional: Profissional): Observable<boolean> {
    if (profissional.id == 0) {
      let id = idAtual[idAtual.length - 1];
      profissional.id = id;
      idAtual.push(id + 1);
      
      profissionais.push(profissional);
    }
    else {
      let index = profissionais.findIndex(item => item.id == profissional.id);
      profissionais[index] = profissional;
    }
    
    return new Observable(subscriber => {
      //setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      //}, 2000);
    });
  }
  
  public buscarProfissional(id: number): Observable<Profissional> {
    return new Observable(subscriber => {
      //setTimeout(() => {
        subscriber.next(profissionais.find(profissional => profissional.id == id));
        subscriber.complete();
      //}, 2000);
    });
  }
  
  public excluirProfissional(id: number): Observable<boolean> {
    let index = profissionais.findIndex(item => item.id == id);
    
    profissionais.splice(index, 1);

    return new Observable(subscriber => {
      //setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      //}, 2000);
    });
  }

}
