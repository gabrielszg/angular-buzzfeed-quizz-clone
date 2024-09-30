import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';

@Component({
	selector: 'app-quizz',
	standalone: true,
	imports: [],
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.css', './quizz.responsive.component.css'],
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

	constructor(private quizzService: QuizzService) {}

	ngOnInit(): void {
		this.loadQuestions();
	}

	loadQuestions() {
		this.finished = false;
		this.title = this.quizzService.getTitle();
		
		this.questionIndex = 0;
		
		this.questions = this.quizzService.getQuestions();
		this.questionSelected = this.questions[this.questionIndex];
		
		this.questionMaxIndex = this.questions.length;
	}

	playerChoose(value: string) {
		this.answers.push(value);
		this.nextStep();
	}

	async nextStep() {
		this.questionIndex += 1;

		if (this.questionMaxIndex > this.questionIndex) {
			this.questionSelected = this.questions[this.questionIndex];
		} else {
			const finalAnswer: string = await this.quizzService.checkResult(this.answers);
			this.finished = true;
			this.answerSelected = this.quizzService.getResults(finalAnswer);
		}
	}

	repeatQuiz() {
		this.loadQuestions();
	}
}
