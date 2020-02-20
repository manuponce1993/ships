export interface Provision {
   id?: string;
   authorizationNumber: string;
   validity: Date; //Vto de la última autorización
   practice: {
      id: number;
      name: string;
      active: boolean;
   };
   frequency: {
      amount: number;
      unit: string;
   };
   alert?: boolean; // True si la prestacion tiene un alerta (ej: atención pendiente por paciente ausente)
}
