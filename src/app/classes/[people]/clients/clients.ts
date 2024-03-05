import { Injectable } from '@angular/core';
import { Core } from '../../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { User } from 'src/app/interfaces/user';

@Injectable()
export class ClientClass extends Core {
  public data: any = [];
  public headers = [
    'Código',
    'Cliente',
    'Contato',
    'Situação',
    'Data Contrato',
    'Ação',
  ];
  constructor(public override getter: HelperGetterService) {
    super(getter);
  }

  makeData(data, userLevel: string) {
    const result: any = [];
    data.forEach((e, i) => {
      result.push({
        info: [
          e.id,
          e.nome,
          e.celular ? e.celular : e.telefone,
          e.financial_status ? e.financial_status : 'Desconhecido',
          new Date(e.createdAt.seconds * 1000).toLocaleDateString('pt-BR'),
          'actions',
        ],
        actions:
          userLevel === '7' ? ['edit', 'share', 'delete'] : ['edit', 'share'],
        index: i,
        extra: [e.email, 'clients', e.associate_to],
      });
    });
    return result;
  }
}
