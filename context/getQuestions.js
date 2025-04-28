import jsonLogic from "json-logic-js";
// import subgroup from "@helpers/questionSubgroup.json";

// const getNextId = (currQuestion, questionSet, questions) => {
// 	const _goals = questions.hair_goals.reply;
// 	if (!Array.isArray(_goals)) return currQuestion.next;

// 	let _nextId = null;

// 	for (let i = 0; i < subgroup.length; i++) {
// 		const { id: questionId, has, only, not, max_length, all } = subgroup[i];
// 		if (questionId in questionSet) continue;

// 		if (not) {
// 			const _hide = not.some(item => _goals.includes(item));
// 			if (_hide) continue;
// 		}

// 		if (only && _goals.length === 1) {
// 			let _show = only.some(item => _goals.includes(item));

// 			if (_show) {
// 				const _nextQuestion = questions[questionId];
// 				if (_nextQuestion) {
// 					_nextId = _nextQuestion.id;
// 					break;
// 				}
// 			}
// 		}

// 		if (has) {
// 			if (max_length) {
// 				if (_goals.length > max_length) continue;
// 			}

// 			const _show = has.some(item => _goals.includes(item));
// 			if (_show) {
// 				const _nextQuestion = questions[questionId];
// 				if (_nextQuestion) {
// 					_nextId = _nextQuestion.id;
// 					break;
// 				}
// 			}
// 		}

// 		if (all) {
// 			const _nextQuestion = questions[questionId];
// 			if (_nextQuestion) {
// 				_nextId = _nextQuestion.id;
// 				break;
// 			}
// 		}
// 	}

// 	return _nextId;
// };

const getQuestions = ({ byId, firstQuestion }) => {
	let i = firstQuestion;
	const _questions = { [i]: byId[i] };
	const componentsInUse= {};

	while (byId[i]?.next) {
		let nextId = null;
		const currQuestion = byId[i];
		// const nextQuestion = byId[currQuestion.next];

		// if (nextQuestion?.checkSubgroup) {
		// 	// nextId = getNextId(currQuestion, _questions, byId);
		
		// } else {
			nextId = currQuestion.next;
		// }

		if (currQuestion.fn) {
			nextId = jsonLogic.apply(currQuestion.fn, { reply: currQuestion.reply });
		}

		if (nextId) {
			_questions[nextId] = byId[nextId];
			componentsInUse[byId[i]?.component] =byId[i]?.component ;
		}
		
		i = nextId;

	}

	return _questions;
};

export default getQuestions;
