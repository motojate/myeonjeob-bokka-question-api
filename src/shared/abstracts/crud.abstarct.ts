import { Observable } from 'rxjs';

export abstract class CrudService<TModel, TCreateInput, TUpdateInput> {
  abstract create(dto: TCreateInput): Observable<TModel>;
  abstract findAll(): Observable<TModel[]>;
  abstract findOne(id: number): Observable<TModel | null>;
  abstract update(id: number, dto: TUpdateInput): Observable<TModel>;
  abstract delete(id: number): Observable<TModel>;
}
