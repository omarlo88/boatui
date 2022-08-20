import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Boat } from '../shared/boat.model';
import { BoatsService } from '../shared/boats.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
  selector: 'baot-boat-form',
  templateUrl: './boat-form.component.html',
  styleUrls: ['./boat-form.component.css']
})
export class BoatFormComponent implements OnInit, OnDestroy {
  @Output() isEdit = new EventEmitter<boolean>();
  @Output() displayDecisionEditOrView = new EventEmitter<boolean>();
  @Output() displayBoatAdd = new EventEmitter<boolean>();
  @Output() displayBoatEdit = new EventEmitter<boolean>();

  @Input()
  set addBoatMode(value: boolean) {
    this.addMode = value;
    this._init();
  }

  @Input() editMode = false;
  @Input() displayMode = false;

  @Input()
  set boatId (value: number) {
    this.selectedBoatId = value;
    this.display = false;
    this._init();
  }

  get boatId(): number {
    return this.selectedBoatId;
  }

  selectedBoatId: number;
  addMode = false
  display = false;
  submitted = false;

  boat: Boat = {name: '', priceDutyFree: null, description: '', totalAmount: null};

  boatForm: FormGroup;

  /**
   * Constructor of BoatFormComponent.
   *
   * @param: fb
   * @param: boatsService
   * @param: msgService
   */
  constructor(private fb: FormBuilder,
              private boatsService: BoatsService,
              private msgService: MessageService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._resetForm();
    this.display = false;
    this.submitted = false;
  }

  private _init(): void {
    if (!Number.isNaN(this.boatId) && this.boatId > 0) {
      this.boatsService.findById(this.boatId).subscribe({
        next: (value: Boat) => {
          this.boat = {...value};
          this.initControls();
        },
        error: err => console.log('Error when creating boat ', err)
      });
    } else {
      this.initControls();
    }
  }

  initControls(): void {
    this.boatForm = this.fb.group({
      name: [this.boat.name, Validators.compose([Validators.required, Validators.maxLength(50)])],
      description: [this.boat.description, Validators.compose([Validators.required, Validators.maxLength(4000)])],
      priceDutyFree: [this.boat.priceDutyFree],
    });

    if (this.displayMode) {
      this.boatForm.disable();
    } else {
      this.boatForm.enable();
    }
    this.boatForm.updateValueAndValidity();
    this.display = true;
  }

  cancel(event: MouseEvent) {
    if (this.selectedBoatId && (this.editMode || this.displayMode)) {
      this.displayBoatEdit.emit(false);
    } else {
      this.displayBoatAdd.emit(false);
    }

    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  saveBoat(event: MouseEvent): void {
    if (event) {
      this._clear();
      const {name ='', description = '', priceDutyFree = null} = {...this.boatForm.value};
      const dto: Boat = {name, description, priceDutyFree};
      this.submitted = true;
      if (!Number.isNaN(this.boatId) && this.boatId > 0) {
        this.boatsService.update({...dto, id: this.boatId}).pipe(
          tap(value => console.log('Boat is updating with name ', value.id))
        ).subscribe({
          next: (value: Boat) => {
            console.log('Boat is updated with id ', value.id);
            this.submitted = false;
            this.displayBoatEdit.emit(false);
            this._getMessageUpdateOk();
          },
          error: err => {
            console.log('Error when creating boat ', err);
            this.submitted = false;
            this._getMessageError(err);
          }
        });
      } else {
        this.boatsService.create(dto).pipe(
          tap(value => console.log('Boat is creating with name ', value.name))
        ).subscribe({
          next: (value: Boat) => {
            console.log('Boat is created with id ', value.id);
            this.submitted = false;
            this.displayBoatAdd.emit(false);
            this._getMessageCreateOk();
          },
          error: err => {
            console.log('Error when creating boat ', err);
            this.submitted = false;
            this._getMessageError(err);
          }
        });
      }
    }

    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  private _resetForm(): void {
    this.boatForm.reset();
  }

  private _getMessageCreateOk(): void {
    const msg = {
      severity: 'success',
      summary: 'Creation new Boat',
      detail: 'Creation success'
    };

    this.msgService.add(msg);
  }

  private _getMessageUpdateOk(): void {
    const msg = {
      severity: 'success',
      summary: 'Updating new Boat',
      detail: 'Updated success'
    };

    this.msgService.add(msg);
  }

  private _getMessageError(err?: any): void {
    const detailMsg = err && err.error && err.error.message ? err.error.message : '';

    const msg = {
      severity: 'error',
      summary: 'Error',
      detail: detailMsg
    };

    this.msgService.add(msg);
  }

  private _clear(): void {
    this.msgService.clear();
  }
}
