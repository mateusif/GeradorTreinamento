import { Treinamento } from './../interfaces/treinamento';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {
private treinamentosCollection: AngularFirestoreCollection<Treinamento>;
  
  constructor(private afs: AngularFirestore) { 
    this.treinamentosCollection = this.afs.collection<Treinamento>('treinamento');
  }

getTreinamentos(){
  return this.treinamentosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });
    })
  );
}
addTreinamento(treinamento: Treinamento){
  return this.treinamentosCollection.add(treinamento);
}
getTreinamento(id: string) {
  return this.treinamentosCollection.doc<Treinamento>(id).valueChanges();  
}

getMovimentoById(id: string){

}
updateTreinamento(id: string, treinamento:Treinamento){
  return this.treinamentosCollection.doc<Treinamento>(id).update(treinamento);
}
deleteTreinamento(id: string){
  return this.treinamentosCollection.doc(id).delete();
}


}
