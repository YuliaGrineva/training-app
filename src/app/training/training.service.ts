import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises(){
        this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc =>{
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories'],

        } as Exercise;
      });
    }))
    .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
    })
    }

    startExercise(selectedId: string){
        //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise})
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise, 
            date: new Date(),
            state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null)
    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    fetchCompletedOrCancelledExercises(){
        this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}