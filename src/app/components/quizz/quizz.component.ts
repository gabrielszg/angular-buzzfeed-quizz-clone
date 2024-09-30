import { Component, OnInit } from '@angular/core';
import quizzQuestions from '../../data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
  
  ngOnInit(): void {
    if (quizzQuestions) {
      this.finished = false;
      this.title = quizzQuestions.title;

      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
    }
  }
}
