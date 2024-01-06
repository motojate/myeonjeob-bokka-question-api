import { Observable } from 'rxjs';

export abstract class CrudService<T> {
  abstract getAll(): Promise<T[]>;
  abstract getUnique(seq: string): Promise<T>;
  abstract create(dto: Partial<T>): Observable<T>;
}
