import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { ShipsService } from '../../ships.service';

@Component({
   selector: 'app-login',
   templateUrl: './ships.component.html',
   styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
   harbours = [
      { id: 'puerto-mdp', name: 'Puerto de Mar del Plata' },
      { id: 'puerto-caba', name: 'Puerto de Ciudad Autónoma de Buenos Aires' },
   ];
   ships = [];
   shipsOverConsumption = [];
   shipsAvoidRunner = [];

   loadingResponse1 = false;
   loadingResponse4 = false;
   loadingResponse7 = false;
   form1: FormGroup;
   form2: FormGroup;
   form3: FormGroup;
   form4: FormGroup;
   form5: FormGroup;
   public readonly HARBOUR_ID = 'puerto';
   response1;

   constructor(private formBuilder: FormBuilder, private service: ShipsService) {}

   get form1HarbourId() {
      return this.form1.get(this.HARBOUR_ID);
   }

   ngOnInit() {
      this.form1 = this.createForm1();
      this.getBarcos()
         .then((data) => data.map((shipDoc) => shipDoc.doc))
         .then((ships) => (this.ships = ships))
         .then((ships) => console.log(ships));
   }

   createForm1(): FormGroup {
      return this.formBuilder.group({
         [this.HARBOUR_ID]: ['', [CustomValidators.required('Puerto requerido')]],
      });
   }

   onForm1Submit() {
      this.barcos_por_puerto(this.form1HarbourId.value)
         .then((data) => {
            console.log(data);
            this.response1 = data;
         })
         .then((_) => (this.loadingResponse1 = false));
   }

   onComprobarConsumo() {
      this.loadingResponse7 = true;
      this.ultimo_consumo()
         .then((data) => {
            var ship;
            let shipsOverConsumption = [];
            data.forEach((shipConsumption) => {
               if (shipConsumption.key !== 'ships') {
                  ship = this.ships.find((ship) => ship._id == shipConsumption.key);
                  if (ship && shipConsumption.value > ship.properties.averageConsumption) {
                     shipsOverConsumption.push({
                        id: ship._id,
                        averageConsumption: ship.properties.averageConsumption,
                        actualConsumption: shipConsumption.value,
                     });
                  }
               }
            });
            return shipsOverConsumption;
         })
         .then((shipsOverConsumption) => (this.shipsOverConsumption = shipsOverConsumption))
         .then((_) => (this.loadingResponse7 = false));
   }

   onSalteoDerrotero() {
      this.loadingResponse4 = true;
      this.salteo_derrotero()
         .then((req) => req.map((element) => element.value[0]))
         .then((data) => (this.shipsAvoidRunner = data))
         .then((_) => console.log(this.shipsAvoidRunner))
         .then((_) => (this.loadingResponse4 = false));
   }

   calculateId(element) {
      return element ? element.id : null;
   }

   calculateName(element) {
      return element ? element.name : null;
   }

   getBarcos(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.getBarcos().subscribe(
            (data) => {
               console.log(data);
               resolve(data);
            },
            (err) => {
               console.log(err);
               reject(err);
            },
         );
      });
   }

   barcos_por_puerto(puertoId): Promise<any> {
      this.loadingResponse1 = true;
      return new Promise((resolve, reject) => {
         this.service.barcos_por_puerto(puertoId).subscribe(
            (data) => {
               console.log(data);
               resolve(data);
            },
            (err) => {
               console.log(err);
               reject(err);
            },
         );
      });
   }

   ultimo_consumo(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.ultimo_consumo().subscribe(
            (data) => {
               console.log(data);
               resolve(data);
            },
            (err) => {
               console.log(err);
               reject(err);
            },
         );
      });
   }

   salteo_derrotero(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.salteo_derrotero().subscribe(
            (data) => {
               console.log(data);
               resolve(data);
            },
            (err) => {
               console.log(err);
               reject(err);
            },
         );
      });
   }
}
