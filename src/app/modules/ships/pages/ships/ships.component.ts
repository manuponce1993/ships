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
   benches = [];
   routes = [];
   ships = [];
   shipsOverConsumption = [];
   shipsAvoidRunner = [];
   shipsLatitude = [];
   shipsCrossingBench:Set<any>;


   loadingResponse1 = false;
   loadingResponse4 = false;
   loadingResponse5 = false;
   loadingResponse6 = false;
   loadingResponse7 = false;
   form1: FormGroup;
   form2: FormGroup;
   form3: FormGroup;
   form4: FormGroup;
   form5: FormGroup;
   form6: FormGroup;
   public readonly HARBOUR_ID = 'puerto';
   public readonly LATITUDE = 'latitud';
   public readonly BENCH_ID = 'banco';
   response1;
   response5;
   response6;

   constructor(private formBuilder: FormBuilder, private service: ShipsService) {}

   get form1HarbourId() {
      return this.form1.get(this.HARBOUR_ID);
   }

   get form5Bench() {
    return this.form5.get(this.BENCH_ID);
   }

   get form6Latitude() {
    return this.form6.get(this.LATITUDE);
   }

   ngOnInit() {
      this.form1 = this.createForm1();
      this.form5 = this.createForm5();
      this.form6 = this.createForm6();
      this.getBarcos()
         .then((data) => data.map((shipDoc) => shipDoc.doc))
         .then((ships) => (this.ships = ships))
         .then((ships) => console.log(ships));

      this.getBenches()
      .then((data) => data.map((benchDoc) => benchDoc.doc))
      .then((benches) => {
        benches.forEach(element => {
          this.benches.push({id: element._id, name: element.properties.description})
        });
      })
      .then((benches) => console.log('BENCHES', this.benches));

      this.getRoutes()
      .then((routes) => {
        routes.forEach(element => {
          this.routes.push({key: element.key, route: element.value.itinerarium})
        });
      })
      .then((routes) => console.log('ROUTES', this.routes));
   }

   createForm1(): FormGroup {
      return this.formBuilder.group({
         [this.HARBOUR_ID]: ['', [CustomValidators.required('Puerto requerido')]],
      });
   }

   createForm5(): FormGroup {
    return this.formBuilder.group({
       [this.BENCH_ID]: ['', [CustomValidators.required('Banco de pesca requerido')]],
    });
   }

   createForm6(): FormGroup {
    return this.formBuilder.group({
       [this.LATITUDE]: ['', [CustomValidators.required('Latitud requerida')]],
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

   onForm5Submit() {
    this.shipsCrossingBench = new Set<any>();
    this.waitForIteration()
    .then(() => console.log('barcos que cruzan', this.shipsCrossingBench))

  }

   onForm6Submit() {
    this.barcos_latitud()
       .then((data) =>
          this.calculateShipsLatitude(data, this.form6Latitude.value))
       .then((ships) => {
        console.log('SHIPS', ships)
        this.response6 = ships
      })
       .then((_) => (this.loadingResponse6 = false));
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

   barcos_latitud(): Promise<any> {
    return new Promise((resolve, reject) => {
       this.service.barcosLatitud().subscribe(
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

 calculateShipsLatitude(data, latitud): Promise<any> {
  return new Promise((resolve, reject) => {
    let shipsCrossesLatitude = [];
    shipsCrossesLatitude = data.filter(element => latitud >= element.value.min && latitud <= element.value.max)
    resolve(shipsCrossesLatitude);
  });
 }

 getBenches(): Promise<any> {
  return new Promise((resolve, reject) => {
     this.service.getBenches().subscribe(
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

 getRoutes(): Promise<any> {
  return new Promise((resolve, reject) => {
     this.service.getRoutes().subscribe(
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

 routeCrosses(route): Promise<any> {
  return new Promise((resolve, reject) => {
     this.service.routeCrosses(route).subscribe(
        (data) => {
           resolve(data);
        },
        (err) => {
           console.log(err);
           reject(err);
        },
     );
  });
 }

 waitForIteration(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < this.routes.length; i++) {
      let data = await this.routeCrosses(this.routes[i].route)
      for (let j = 0; j < data.length; j++) {
        if(data[j].id == this.form5Bench.value){
          this.shipsCrossingBench.add(this.routes[i].key[1])
        }
      }
    }
    resolve()
  });

 }

}
