import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Déclaré une prop de notre service qui représente un flux de données 
  public collection$!: Observable<Order[]>;
  private url = environment.urlApi;

  constructor(private http: HttpClient) { 
    // Définition de la provenance des données grâce au call API
    console.log('service order instanced');
    this.collection$ = this.http.get<Order[]>(`${this.url}/orders`).pipe(
      map((tabJson) => {
        return tabJson.map(objetOrder => new Order(objetOrder))
      })
    );
  }

  public update(order: Order): Observable<Order> {
    // Méthode PUT : url/idObject + object
    return this.http.put<Order>(`${this.url}/orders/${order.id}`, order)
  }

  public add(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}/orders`, order)
  }

  public getById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/orders/${orderId}`)
  }
}
