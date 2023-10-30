import { Injectable } from '@angular/core';
import { IAdmin } from './IAdmin';
import { ADMINISTRATORS } from './mock-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAdmins(): IAdmin[] {
    const admins = ADMINISTRATORS;
    return admins;
  }

  getAdmin(id: number): IAdmin {
    const admin = ADMINISTRATORS.find(adm => adm.id === id)!;
    return admin;
  }

  addAdmin(admin: IAdmin): void {
    if (admin) {
      ADMINISTRATORS.push(admin);
    }
  }

}
