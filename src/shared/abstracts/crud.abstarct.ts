import { Observable } from 'rxjs';

export abstract class CrudService<TModel, TCreateInput, TUpdateInput> {
  abstract create(dto: TCreateInput): Observable<TModel>;
  abstract findAll(): Observable<Partial<TModel>[]>;
  abstract findOne(id: number): Observable<Partial<TModel> | null>;
  abstract update(id: number, dto: TUpdateInput): Observable<TModel>;
  abstract delete(id: number): Observable<TModel>;
}
