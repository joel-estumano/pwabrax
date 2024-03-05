import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionService {
  constructor(private user: UserClass) {}

  hasPermission(permissionsLevel: string[]) {
    return permissionsLevel.includes(this.user.value?.level);
  }
}
