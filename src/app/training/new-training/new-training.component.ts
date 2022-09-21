import { Component, OnDestroy, OnInit} from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {


  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private trainingService: TrainingService,  private uiService: UIService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => 
      {this.exercises = exercises
      this.isLoading = false;});
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscription){
    this.exerciseSubscription.unsubscribe();
   } 
  }
}
