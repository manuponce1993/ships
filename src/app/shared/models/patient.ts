import { Address } from './address';

export interface Patient {
   id: number;
   name: string;
   surname: string;
   typeDocument: string;
   documentNumber: number;
   address: Address;
   phoneNumber: string;
}
