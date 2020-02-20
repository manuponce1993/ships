export interface New {
   id: number;
   read: boolean;
   date: Date;
   text: string;
   deleted: boolean;
   // CIF asociado a la notificación
   cif?: number;
}
