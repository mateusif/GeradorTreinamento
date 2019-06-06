import { Exercicios } from './../interfaces/exercicios';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ExerciciosService {
private exerciciosCollection: AngularFirestoreCollection<Exercicios>;
  
  constructor(private afs: AngularFirestore) { 
    this.exerciciosCollection = this.afs.collection<Exercicios>('exercicios');
  }

getExercicios(){
  return this.exerciciosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });
    })
  );
}
addExercicios(exercicios: Exercicios){
  return this.exerciciosCollection.add(exercicios);
}
getExercicio(id: string) {
  return this.exerciciosCollection.doc<Exercicios>(id).valueChanges();  
}

getExerciciosById(id: string){

}
updateExercicio(id: string, exercicio:Exercicios){
  return this.exerciciosCollection.doc<Exercicios>(id).update(exercicio);
}
deleteExercicios(id: string){
  return this.exerciciosCollection.doc(id).delete();
}


}
