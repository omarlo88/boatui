import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoatsService } from './shared/boats.service';
import { Boat } from './shared/boat.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../core/shared/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/shared/model/user';

@Component({
  selector: 'baot-boats',
  templateUrl: './boats.component.html',
  styleUrls: [ './boats.component.css' ]
})
export class BoatsComponent implements OnInit, OnDestroy {

  boats: any = [];
  loading = false;
  totalElements: number = 0;
  size: number = 5;
  selectedItemId: number;
  displayBoatEditOrView = false;
  displayBoatAdd = false;
  addMode = false;
  editMode = false;
  displayMode = false;
  display = false;
  selected: Boat;

  userEventsSubscription: Subscription;
  loggedUser = null;

  get currentUser(): User {
    return this.loggedUser;
  }

  set currentUser(value: User) {
    this.loggedUser = value;
  }

  get isAdmin(): boolean {
    return this.currentUser && this.currentUser.id && this.currentUser.role === 'ADMIN';
  }

  /**
   * Constructor of BoatsComponent.
   *
   * @param: boatsService
   * @param: confirmService
   * @param: msgService
   * @param: authService
   */
  constructor(private boatsService: BoatsService,
              private confirmService: ConfirmationService,
              private msgService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.next();
    this.userEventsSubscription = this.authService.getCurrentUserProfileEvent().subscribe((user) => this.currentUser = user);
    this.findAll();
  }

  private findAll(): void {
    this.boatsService.findAll().subscribe({
      next: (data: Boat[]) => {
        this.boats = data;
        this.totalElements = this.boats.length;
        this.display = true;
      },
      error: err => console.log('Find all error ', err)
    });
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
    this.loading = false;
    this.display = false;
  }

  editBoat({id}): void {
    this.displayBoatEditOrView = false;
    this.selectedItemId = null;
    if (id) {
      this.selectedItemId = id;
      this.displayBoatEditOrView = true;
      this.editMode = true;
      this.displayMode = false;
    }
  }

  deleteBoat({id}): void {
    if (!Number.isNaN(id) && id > 0) {
      this._showConfirmDialog(id);
    }
  }

  private _showConfirmDialog(id: number): void {
    this.confirmService.confirm({
      header: 'Confirmation',
      message: 'Are you sure to delete this Boat?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.boatsService.delete(id).subscribe({
          next: () => {
            this.findAll();
            this._getMessageDeletOk();
          },
          error: err => {
            this._getMessageError(err);
            console.log(err);
          }
        }),
      reject: () => null
    });
  }

  private _getMessageDeletOk(): void {
    const msg = {
      severity: 'success',
      summary: 'Deleting Boat',
      detail: 'Delete success'
    };

    this.msgService.add(msg);
  }

  private _getMessageError(err?: any): void {
    const detailMsg = err && err.error && err.error.message ? err.error.message : 'You have not permission for this action';

    const msg = {
      severity: 'error',
      summary: 'Error',
      detail: detailMsg
    };

    this.msgService.add(msg);
  }

  onRowSelect(event: any): void {
    this.displayBoatEditOrView = false;
    this.selectedItemId = null;
    if (event) {
      this.selectedItemId = event.data.id;
      this.displayBoatEditOrView = true;
      this.editMode = false;
      this.displayMode = true;
    }
  }

  showAddForm(): void {
    this.displayBoatAdd = true;
    this.addMode = true;
  }

  handleAddBoat(event: boolean): void {
    this.findAll();
    this.displayBoatAdd = event;
    this.addMode = event
  }

  handleEditBoat(event: boolean): void {
    this.findAll();
    this.displayBoatEditOrView = event;
    this.editMode = event;
  }

  logout(): void {
    this.authService.logout();
  }
}
