import { Component } from '@angular/core';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
}
