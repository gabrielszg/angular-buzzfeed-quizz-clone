import { Component, OnInit } from '@angular/core';
import quizzQuestions from '../../data/quizz_questions.json';

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
		this.nextStep();
	}

	async nextStep() {
		this.questionIndex += 1;

		if (this.questionMaxIndex > this.questionIndex) {
			this.questionSelected = this.questions[this.questionIndex];
		} else {
			const finalAnswer: string = await this.checkResult(this.answers);
			this.finished = true;
			this.answerSelected =
				quizzQuestions.results[
					finalAnswer as keyof typeof quizzQuestions.results
				];
		}
	}

	async checkResult(answers: string[]) {
		const result = answers.reduce((previous, current, i, arr) => {
			if (
				arr.filter((item) => item === previous).length >
				arr.filter((item) => item === current).length
			) {
				return previous;
			} else {
				return current;
			}
		});

		return result;
	}

	returnToQuestionnaire() {
		location.reload();
	}
}
