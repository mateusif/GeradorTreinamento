import { Movimentos } from '../interfaces/movimentos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
private movimentosCollection: AngularFirestoreCollection<Movimentos>;
  
  constructor(private afs: AngularFirestore) { 
    this.movimentosCollection = this.afs.collection<Movimentos>('movimentos');
  }

getMovimentos(){
  return this.movimentosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });
    })
  );
}
addMovimento(movimentos: Movimentos){
  return this.movimentosCollection.add(movimentos);
}
getMovimento(id: string) {
  return this.movimentosCollection.doc<Movimentos>(id).valueChanges();  
}

getMovimentoById(id: string){

}
updateMovimento(id: string, movimento:Movimentos){
  return this.movimentosCollection.doc<Movimentos>(id).update(movimento);
}
deleteMovimento(id: string){
  return this.movimentosCollection.doc(id).delete();
}


}
