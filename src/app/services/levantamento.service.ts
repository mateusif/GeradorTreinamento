import { Movimentos } from './../interfaces/movimentos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class LevantamentoService {
private levantamentosCollection: AngularFirestoreCollection<Movimentos>;
  
  constructor(private afs: AngularFirestore) { 
    this.levantamentosCollection = this.afs.collection<Movimentos>('levantamento');
  }

getLevantamentos(){
  return this.levantamentosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });
    })
  );
}
addLevantamentos(movimento: Movimentos){
  return this.levantamentosCollection.add(movimento);
}
getLevantamento(id: string) {
  return this.levantamentosCollection.doc<Movimentos>(id).valueChanges();  
}

updateLevantamentos(id: string, levantamento:Movimentos){
  return this.levantamentosCollection.doc<Movimentos>(id).update(levantamento);
}
deleteLevantamentos(id: string){
  return this.levantamentosCollection.doc(id).delete();
}


}
