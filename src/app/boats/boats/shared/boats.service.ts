import { Injectable } from '@angular/core';
import { GenericService } from '../../../shared/api/generic.service';
import { Boat } from './boat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoatsService extends GenericService<Boat> {

  /**
   * Constructor of BoatsService.
   *
   * @param: http
   */
  constructor(http: HttpClient) {
    super(http, '/boats');
  }

}
