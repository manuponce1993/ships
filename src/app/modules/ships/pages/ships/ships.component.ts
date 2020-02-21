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
   harbours;
   fishs;
   ships = [];
   harboursRequest = [];
   shipsOverConsumption = [];
   shipsAvoidRunner = [];

   loadingResponse1 = false;
   loadingResponse2 = false;
   loadingResponse3 = false;
   loadingResponse4 = false;
   loadingResponse7 = false;
   loadingResponse8 = false;
   form1: FormGroup;
   form2: FormGroup;
   form3: FormGroup;
   form4: FormGroup;
   form5: FormGroup;
   form8: FormGroup;
   public readonly HARBOUR_ID = 'puerto';
   public readonly MIN_DEVIATION = 'min_deviation';
   public readonly MAX_DEVIATION = 'max_deviation';
   public readonly FISH = 'fish';
   response1;
   response3 = [];
   response2: any = [];
   response8;

   constructor(private formBuilder: FormBuilder, private service: ShipsService) {}

   get form1HarbourId() {
      return this.form1.get(this.HARBOUR_ID);
   }

   get form3MinDeviation() {
      return this.form3.get(this.MIN_DEVIATION);
   }

   get form3MaxDeviation() {
      return this.form3.get(this.MAX_DEVIATION);
   }

   get form8FishId() {
      return this.form8.get(this.FISH);
   }

   ngOnInit() {
      this.form1 = this.createForm1();
      this.form3 = this.createForm3();
      this.form8 = this.createForm8();
      this.getPuertos()
         .then((data) => data.map((harbourDoc) => ({ id: harbourDoc.id, name: harbourDoc.id })))
         .then((harbours) => (this.harbours = harbours));
      this.getBarcos()
         .then((data) => data.map((shipDoc) => shipDoc.doc))
         .then((ships) => (this.ships = ships))
         .then((ships) => console.log(ships));
      this.getPescados()
         .then((data) => data.map((fishDoc) => ({ id: fishDoc.id, name: fishDoc.id })))
         .then((fishs) => (this.fishs = fishs))
         .then((fishs) => console.log(fishs));
   }

   createForm1(): FormGroup {
      return this.formBuilder.group({
         [this.HARBOUR_ID]: ['', [CustomValidators.required('Puerto requerido')]],
      });
   }

   createForm3(): FormGroup {
      return this.formBuilder.group({
         [this.MIN_DEVIATION]: [''],
         [this.MAX_DEVIATION]: [''],
      });
   }

   createForm8(): FormGroup {
      return this.formBuilder.group({
         [this.FISH]: ['', [CustomValidators.required('Pescado requerido')]],
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

   onForm3Submit() {
      this.desviacion_derrotero(this.form3MinDeviation.value, this.form3MaxDeviation.value)
         .then((data) => {
            console.log(data);
            this.response3 = data;
         })
         .then((_) => (this.loadingResponse3 = false));
   }

   onForm8Submit() {
      this.mayor_pesca(this.form8FishId.value)
         .then((data) => {
            console.log(data);
            this.response8 = data;
         })
         .then((_) => (this.loadingResponse8 = false));
   }

   onForm2Submit() {
      this.loadingResponse2 = true;
      this.getPuertos()
         .then((data) => {
            this.harboursRequest = data.map((harbourDoc) => harbourDoc.id);
         })
         .then((_) => this.ultima_posicion_barcos())
         .then((data) => this.shipsOutOfPort(data))
         .then((barcos) => (this.response2 = barcos))
         .then((_) => (this.loadingResponse2 = false));
   }

   async shipsOutOfPort(shipsLastPosition) {
      const allHarboursPresent = async (elements): Promise<boolean> => {
         return new Promise((res, rej) => {
            const response = this.harboursRequest.every((harbour) => elements.includes(harbour));
            console.log('resp', response);

            res(response);
         });
      };
      let arrayResponse = [];

      return new Promise(async (res, rej) => {
         for (let index = 0; index < shipsLastPosition.length; index++) {
            const elementosSinColision = await this.elementos_sin_colision(
               shipsLastPosition[index].value.coordinates[0],
               shipsLastPosition[index].value.coordinates[1],
            );
            console.log('paso');
            const elementosSinColisionIds = await elementosSinColision.map((element) => element.id);

            const stay = await allHarboursPresent(elementosSinColisionIds);
            stay ? arrayResponse.push(shipsLastPosition[index]) : null;
         }
         console.log('salio');
         res(arrayResponse);
      });
   }

   // Por cada barco llamar a la request para saber con que no colisiona
   // Cuando llegue esa respuesta mapear a solo id, luego comprobar si todos los puertos están presentes
   // Si se cumple -> agregar barco como fuera de puerto

   // Llamado a la request para saber con que no colisiona
   //.then mapear solo id dataNoColision
   // Retorno true si todos los puertos se encuentran entre los elementos que
   // no colisionan con el barco
   // * (Args: lon y lat)

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

   getPescados(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.getPescados().subscribe(
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

   getPuertos(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.getPuertos().subscribe(
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

   mayor_pesca(pescadoId): Promise<any> {
      this.loadingResponse8 = true;
      return new Promise((resolve, reject) => {
         this.service.mayor_pesca(pescadoId).subscribe(
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

   desviacion_derrotero(min, max): Promise<any> {
      this.loadingResponse3 = true;
      return new Promise((resolve, reject) => {
         this.service.desviacion_derrotero(min, max).subscribe(
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

   ultima_posicion_barcos(): Promise<any> {
      this.loadingResponse3 = true;
      return new Promise((resolve, reject) => {
         this.service.ultima_posicion_barcos().subscribe(
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

   elementos_sin_colision(lon, lat): Promise<any> {
      return new Promise((resolve, reject) => {
         this.service.elementos_sin_colision(lon, lat).subscribe(
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
