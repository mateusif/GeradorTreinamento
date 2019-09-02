import { Movimentos } from './../interfaces/movimentos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AerobicosService {
private aerobicosCollection: AngularFirestoreCollection<Movimentos>;
  
  constructor(private afs: AngularFirestore) { 
    this.aerobicosCollection = this.afs.collection<Movimentos>('aerobicos');
  }

  getAerobicos(){
    return this.aerobicosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
  
          return { id, ...data };
        });
      })
    );
  }
addAerobicos(movimento: Movimentos){
  return this.aerobicosCollection.add(movimento);
}
getAerobico(id: string) {
  return this.aerobicosCollection.doc<Movimentos>(id).valueChanges();  
}

updateAerobicos(id: string, aerobico:Movimentos){
  return this.aerobicosCollection.doc<Movimentos>(id).update(aerobico);
}
deleteAerobicos(id: string){
  return this.aerobicosCollection.doc(id).delete();
}


}
