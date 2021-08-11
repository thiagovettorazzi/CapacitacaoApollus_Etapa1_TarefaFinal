import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfissionaisService } from 'src/app/services/profissionais.service';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {
  public form: FormGroup;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private profissionaisService: ProfissionaisService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.form = this.fb.group({
      id: [0],
      cpf: ["", [Validators.required]],
      nome: ["", [Validators.required]],
      nis: ["", [Validators.required]],
      registroConselho: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      responsavelTecnico: [false]
    });

    if (id) {
      this.profissionaisService.buscarProfissional(id).subscribe(retorno => this.form.patchValue(retorno));
    }
  }
  
  public onSubmit() {
    if (this.form.valid) {
      this.profissionaisService.adicionarProfissional(this.form.value).subscribe(retorno => {
        if (retorno)
          this.router.navigateByUrl('/lista');
      });
    }
  }
  
}