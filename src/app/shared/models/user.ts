export interface User {
   id?: number;
   name?: string;
   username?: string;
   idRole?: number;
   token?: string;
   logo?: string;
   contact?: {
      name: string;
      surname: string;
      phoneNumber: string;
   };
   email?: string;
   phoneNumber?: string;
}
