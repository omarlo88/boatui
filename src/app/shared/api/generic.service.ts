import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export const defaultLocale = 'fr';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T extends { id?: number }> {

  /**
   *  Default root url
   */
  protected url: string;

  /**
   * Headers request
   * @type {HttpHeaders}
   */
  protected header = new HttpHeaders();

  protected constructor(protected http: HttpClient,
                        @Inject(String) partialUrl: string) {
    this.url = environment.backUrl.concat(partialUrl);
    this.header = this.header.set('Accept-Language', defaultLocale);
  }

  /**
   * REST type: Get
   * Find all Objects of T
   * @param  url
   * @param {HttpHeaders} headers
   * @returns: {Observable<T[]>}
   */
  findAll(url?: string, headers ?: HttpHeaders): Observable<T[]> {
    const endpoint = url ? url : this.url;
    const options = { headers: this.getHeaders(headers) };
    return this.http.get<T[]>(endpoint, options);
  }

  /**
   * REST type: Get
   * Find one by ID
   *
   * @param: {number} id
   * @param: {HttpHeaders} headers
   * @returns: {Observable<T>}
   */
  findById(id: number, headers ?: HttpHeaders): Observable<T> {
    const endpoint = `${this.url}/${id}`;
    const options = { headers: this.getHeaders(headers) };
    return this.http.get<T>(endpoint, options);
  }

  /**
   * Http post
   * @param body
   * @param url
   * @param {HttpHeaders} headers
   * @returns: {Observable<T>}
   */
  post(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    const endpoint = url ? url : this.url;
    const options = { headers: this.getHeaders(headers) };
    return this.http.post<T>(endpoint, body, options);
  }

  /**
   * REST type: Post
   * Create an element
   *
   * @param: dto
   * @returns: {Observable<T>}
   */
  create(dto: T): Observable<T> {
    return this.post(this.url, dto);
  }

  /**
   * Http put
   * @param {string} url
   * @param body
   * @param {HttpHeaders} headers
   * @returns: {Observable<T>}
   */
  put(url: string, body: any, headers ?: HttpHeaders): Observable<T> {
    const endpoint = url ? url : this.url;
    const options = { headers: this.getHeaders(headers) };
    return this.http.put<T>(endpoint, body, options);
  }

  /**
   * REST type: Put
   * Update an element
   *
   * @param: dto
   */
  update(dto: T): Observable<T> {
    return this.put(`${this.url}/${dto.id}`, dto);
  }

  /**
   * Http delete
   * @param {any} id direct url
   * @param {any} headers direct url
   * @returns: {Observable<any>}
   * @memberof GenericService
   */
  delete(id: number, headers?: HttpHeaders): Observable<T> {
    const endpoint = `${this.url}/${id}`;
    const options = { headers: this.getHeaders(headers) };
    return this.http.delete<T>(endpoint, options);
  }

  protected getHeaders(headers ?: HttpHeaders): HttpHeaders {
    let header: HttpHeaders = new HttpHeaders();
    if (headers) {
      for (const headerName of headers.keys()) {
        header = header.set(headerName, headers.get(headerName));
      }
    }

    if (this.header) {
      for (const headerName of this.header.keys()) {
        header = header.set(headerName, this.header.get(headerName));
      }
    }
    return header;
  }
}
