"use client"
import { createContext, useReducer } from "react";
import questionsReducer from "./questions-reducer";
import * as ACTIONS from "./questions-actions";
import getQueryStrings from "./getQueryStrings";

const queryStrings = getQueryStrings();

const initialState = {
	byId: {},
	currentQuestion: {},
	questions: {},
	firstQuestion: "",
	previousQuestions: [],
	apiResponse: {},
	selectedSlots: {},
	queryStrings,
	previewURL: "",
};

export const InternationalFormContext = createContext();

const InternationalFormContextProvider = ({ children }) => {
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

	const init = (data, previewURL) => {
		dispatch({ type: ACTIONS.INITIALIZE_STATE, payload: { data, previewURL } });
	};

	const nextQuestion = (id, reply) => {
		dispatch({ type: ACTIONS.NEXT_QUESTION, payload: { id, reply } });
	};

	return (
		<InternationalFormContext.Provider
			value={{
				apiResponse: state.apiResponse,
				currentQuestion: state.currentQuestion,
				firstQuestion: state.firstQuestion,
				questions: state.questions,
				selectedSlots: state.selectedSlots,
				byId: state.byId,
				previewURL: state.previewURL,
				previousQuestions: state.previousQuestions,
				queryStrings: state.queryStrings,
				addToPreviousQuestion,
				makeQuestionsList,
				nextQuestion,
				removeFromPreviousQuestion,
				init,
				saveApiResponse,
				saveReply,
				saveSlots,
			}}>
			{children}
		</InternationalFormContext.Provider>
	);
};

export default InternationalFormContextProvider;
