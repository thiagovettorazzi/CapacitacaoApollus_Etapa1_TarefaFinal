import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Profissional } from 'src/app/models/profissional.model';
import { ProfissionaisService } from 'src/app/services/profissionais.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  
  public listaProfissionais: Profissional[] = [];
  
  public pesquisar = new FormControl('');
  
  constructor(private profissionaisService: ProfissionaisService, private router: Router) { }
  
  ngOnInit(): void {
    this.buscarProfissionais("");
  }
  
  public editar(id: number): void {
    this.router.navigateByUrl('/profissional/' + id);
  }
  
  public excluir(id: number): void {
    this.profissionaisService.excluirProfissional(id).subscribe(retorno => {
      if (retorno)
        this.buscarProfissionais("");
    });
  }

  public buscarProfissionais(pesquisa: string): void {
    this.profissionaisService.listarProfissionais(pesquisa).subscribe(profissionais => this.listaProfissionais = profissionais);
  }

  public filtrar(): void {
    this.buscarProfissionais(this.pesquisar.value);
  }
  
}
