import { Patient } from './patient';
import { Provision } from './provision';

export interface Case {
   id: number;
   financierInternalCode: number; // Codigo Interno Financiador
   from?: Date;
   validity: Date; // Minima fecha de vto del conjunto de autorizaciones actuales (ese conjunto se consigue con la última autorización de c/prestación)
   diagnosis?: {
      primary: string;
      secondary: string;
   }; //Ver como representarlo (hay 4 columnas en la db de marilina)
   alert?: boolean; // Alerta que indica si el caso tiene notificaciones pendientes (ej: paciente ausente)
   agreements?: Provision[]; // Esquema prestacional asociado
   patient: Patient;
   evolutions?: any[];
   operator?: {
      id: number;
      name: string;
   };
}
