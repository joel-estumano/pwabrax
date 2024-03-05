import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { HasPermissionService } from 'src/app/services/permissioner/has-permission.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() active?: string;
  @Input() total?: string;
  @Input() headers: Array<string> = [];
  @Input() data: Array<{
    info: Array<any>;
    actions: Array<string>;
    index: number;
    hasFile: boolean;
    url?: string;
    disabled?: string;
  }> = [];

  @Output() add: any = new EventEmitter();
  @Output() edit: any = new EventEmitter();
  @Output() del: any = new EventEmitter();
  @Output() share: any = new EventEmitter();
  @Output() accept: any = new EventEmitter();
  @Output() refuse: any = new EventEmitter();
  @Output() download: any = new EventEmitter();
  @Output() clickHeader: any = new EventEmitter();
  @Output() clickRow: any = new EventEmitter();

  constructor(
    public permissioner: HasPermissionService,
    private screen: ScreenService,
    private navigation: NavigationService
  ) {
    setTimeout(() => {
      this.getHeadersLength();
      // console.log('Table Data:', this.data);
    }, 1000);
  }

  getHeadersLength() {
    const headers = this.headers.map((e, i) => {
      return i;
    });
    return headers;
  }

  addClick(who, item) {
    const file = item.target.files[0];
    if (file.type !== 'application/pdf') {
      this.screen.presentToast('O arquivo deve ser do tipo PDF');
      return;
    }
    this.add.emit({ who, file });
  }

  editFunc(who) {
    this.edit.emit(who);
  }

  editClick(who, item) {
    const file = item.target.files[0];
    if (file.type !== 'application/pdf') {
      this.screen.presentToast('O arquivo deve ser do tipo PDF');
      return;
    }
    this.edit.emit({ who, file });
  }

  delClick(who) {
    this.screen.presentAlertConfirm('Você tem certeza que deseja excluir?', 'Essa ação é irreversível',
      '', () => {
        this.del.emit(who);
      }, () => { });
  }

  refuseClick(who) {
    this.screen.presentAlertConfirm('Deseja recusar a solicitação?', 'Recusar Solicitação',
      '', () => {
        this.refuse.emit(who);
      }, () => { });
  }

  acceptClick(who) {
    this.screen.presentAlertConfirm('Deseja aceitar a solicitação?', 'Aceitar Solicitação',
      '', () => {
        this.accept.emit(who);
      }, () => { });
  }

  // downloadClick(who) {
  //   this.download.emit(who);
  // }

  downloadBankslip(who) {
    this.download.emit(who);
  }

  clickFunc(who) {
    this.clickRow.emit(who);
  }

  headerClick(who) {
    this.clickHeader.emit(who);
  }

  shareClick(who) {
    this.share.emit(who);
  }

  view(who) {
    this.navigation.away(who.url);
  }
}
