export interface ServiceResponse<T> {
  status: string;
  cantidad?: number;
  message?: string;
  resultado: T;
}
