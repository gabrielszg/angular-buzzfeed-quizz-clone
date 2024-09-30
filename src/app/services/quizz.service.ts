import { Injectable } from '@angular/core';
import quizzQuestions from '../data/quizz_questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  getTitle() {
    return quizzQuestions.title;
  }

  getQuestions() {
    return quizzQuestions.questions;
  }

  getResults(finalAnswer: string) {
    return quizzQuestions.results[
      finalAnswer as keyof typeof quizzQuestions.results
    ];
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
}
