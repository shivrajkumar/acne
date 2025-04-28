"use client"

import { createContext, useReducer } from "react";
import { normalize, schema } from "normalizr";
import miniData from "@helpers/mini-data.json";
import getQuestions from "./getQuestions";
import questionsReducer from "./questions-reducer";
import * as ACTIONS from "./questions-actions";
import getQueryStrings from "./getQueryStrings";

const question = new schema.Entity("questions");
const mySchema = { questions: [question] };
const { entities } = normalize(miniData, mySchema);

const byId = entities.questions;
const currentQuestion = miniData.questions[0];
const firstQuestion = currentQuestion.id;
const questionsList = getQuestions({ byId, firstQuestion });
const queryStrings = getQueryStrings();

const initialState = {
	byId,
	currentQuestion,
	questions: questionsList,
	firstQuestion,
	previousQuestions: [],
	apiResponse: {},
	selectedSlots: {},
	queryStrings,
};

export const MiniQuestionsContext = createContext();

const MiniQuestionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(questionsReducer, initialState);

	const saveReply = (id, reply) =>
		dispatch({ type: ACTIONS.SAVE_QUESTION_REPLY, payload: { id, reply } });

	const makeQuestionsList = () =>
		dispatch({ type: ACTIONS.MAKE_QUESTIONS_LIST });

	const addToPreviousQuestion = id =>
		dispatch({ type: ACTIONS.ADD_PREVIOUS_QUESTIONS, payload: id });

	const removeFromPreviousQuestion = () => {
		dispatch({ type: ACTIONS.REMOVE_PREVIOUS_QUESTIONS });
	};

	const saveApiResponse = data =>
		dispatch({ type: ACTIONS.SAVE_API_RESPONSE, payload: data });

	const saveSlots = data =>
		dispatch({ type: ACTIONS.SAVE_SLOTS, payload: data });

	const nextQuestion = (id, reply) => {
		dispatch({ type: ACTIONS.NEXT_QUESTION, payload: { id, reply } });
	};
	return (
		<MiniQuestionsContext.Provider
			value={{
				apiResponse: state.apiResponse,
				currentQuestion: state.currentQuestion,
				firstQuestion: state.firstQuestion,
				questions: state.questions,
				selectedSlots: state.selectedSlots,
				byId: state.byId,
				previousQuestions: state.previousQuestions,
				queryStrings: state.queryStrings,
				addToPreviousQuestion,
				makeQuestionsList,
				nextQuestion,
				removeFromPreviousQuestion,
				saveApiResponse,
				saveReply,
				saveSlots,
			}}>
			{children}
		</MiniQuestionsContext.Provider>
	);
};

export default MiniQuestionsContextProvider;
