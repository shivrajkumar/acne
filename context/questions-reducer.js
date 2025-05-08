import * as ACTIONS from "./questions-actions";
import getQuestions from "./getQuestions";
import { normalize, schema } from "normalizr";

const questionsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_STATE: {
      const _state = localStorage.getItem("state" + window.location.pathname);
      if (_state) {
        return JSON.parse(_state);
      }
      const { data, previewURL } = action.payload;

      // Initialize directly using the questions array
      // We know the data is the questions array from the API
      if (!Array.isArray(data) || data.length === 0) {
        console.error("Invalid questions data:", data);
        return {
          ...state,
          error: "Failed to load questions. Invalid data format received.",
        };
      }

      const question = new schema.Entity("questions");
      const mySchema = { questions: [question] };
      const { entities } = normalize({ questions: data }, mySchema);

      const byId = entities.questions || {};
      const currentQuestion = data[0];
      const firstQuestion = currentQuestion.id;
      const questionsList = getQuestions({ byId, firstQuestion });

      return {
        ...state,
        byId,
        currentQuestion,
        questions: questionsList,
        firstQuestion,
        previewURL,
        previousQuestions: [],
        error: null, // Clear any previous errors
      };
    }

    case ACTIONS.SAVE_QUESTION_REPLY: {
      const { reply, id } = action.payload;
      const question = state.byId[id];

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { ...question, reply },
        },
      };
    }

    case ACTIONS.SAVE_GENDER_REPLY: {
      const { genderReply, id } = action.payload;
      const question = state.byId[id];

      // Save gender to localStorage for conditional question display
      window.localStorage.setItem("gender", genderReply);

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { ...question, genderReply },
        },
      };
    }

    case ACTIONS.MAKE_QUESTIONS_LIST: {
      const questions = getQuestions(state);

      return {
        ...state,
        questions,
      };
    }

    case ACTIONS.ADD_PREVIOUS_QUESTIONS:
      return {
        ...state,
        previousQuestions: [...state.previousQuestions, action.payload],
      };

    case ACTIONS.SAVE_QUESTIONS_OTHER_ATTRIBUTES: {
      const { value, id, key } = action.payload;
      const question = state.byId[id];

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { ...question, [key]: value },
        },
      };
    }

    case ACTIONS.REMOVE_PREVIOUS_QUESTIONS: {
      const { byId, previousQuestions, firstQuestion } = state;

      const updatedPrevious = [...previousQuestions];

      if (updatedPrevious.length === 0) {
        return {
          ...state,
          previousQuestions: [],
          currentQuestion: byId[firstQuestion],
        };
      }

      const previousQuestion = updatedPrevious.pop();

      return {
        ...state,
        previousQuestions: updatedPrevious,
        currentQuestion: byId[previousQuestion],
      };
    }

    case ACTIONS.SAVE_API_RESPONSE:
      return {
        ...state,
        apiResponse: action.payload,
      };

    case ACTIONS.SAVE_SLOTS:
      return {
        ...state,
        selectedSlots: action.payload,
      };

    case ACTIONS.SAVE_SLOTS_LIST:
      return {
        ...state,
        slots: action.payload,
      };

    case ACTIONS.NEXT_QUESTION: {
      const { id } = action.payload;
      const question = state.byId[id];
      let nextId = question.next;

      const gender =
        state.userFormResponses?.gender ??
        window.localStorage.getItem("user_gender");
      const userAgeStr =
        state.userFormResponses?.user_age ||
        window.localStorage.getItem("user_age") ||
        "0";

      const userAge = parseInt(userAgeStr);

      // CONDITION 1: Dandruff question (only if forehead is selected in pimples_location)
      if (nextId === "has_dandruff") {
        const pimplesLocation =
          state?.userFormResponses?.acne_position ??
          state.byId["pimples_location"]?.reply;

        // Check if forehead is in the selected options
        const hasForehead = Array.isArray(pimplesLocation)
          ? pimplesLocation.includes("forehead")
          : pimplesLocation === "forehead";

        if (!hasForehead) {
          nextId = state.byId["has_dandruff"].next;
        }
      }
     
      // CONDITION 2: Hormonal changes question (only for females)
      if (nextId === "hormonal_changes") {
        const hormonal_changes = state.byId[nextId];

        // Only show to female users (case-insensitive check)
        if (gender?.toUpperCase() !== "F") {
          nextId = hormonal_changes.next;
        }
      }

      // CONDITION 3: Alcohol/smoking question (only for 18+)
      if (nextId === "alcohol_smoking") {
        if (isNaN(userAge) || userAge < 18) {
          nextId = state.byId["alcohol_smoking"].next;
        }
      }

      // Handle image-based questions display
      if (nextId && state.byId[nextId] && state.byId[nextId].isImageBased) {
        const imageBasedQuestion = {
          ...state.byId[nextId],
          showImages: true, // Ensure images are shown
        };

        return {
          ...state,
          currentQuestion: imageBasedQuestion,
        };
      }

      // handled the question with a specific condition above
      if (
        nextId &&
        state.byId[nextId] &&
        state.byId[nextId].conditionalDisplay &&
        nextId !== "hormonal_changes"
      ) {
        const conditionalQ = state.byId[nextId];
        const dependsOn = conditionalQ.conditionalDisplay.dependsOn;
        const showIf = conditionalQ.conditionalDisplay.showIf;
        const requiredGender = conditionalQ.conditionalDisplay.gender;

        // Check if the dependency value exists
        const dependsOnValue = state.byId[dependsOn]?.reply;

        // Handle array values for multiple selection questions
        const matchesCondition = Array.isArray(dependsOnValue)
          ? dependsOnValue.some((val) => showIf.includes(val))
          : showIf.includes(dependsOnValue);

        // Case-insensitive gender comparison
        const genderMatches =
          !requiredGender ||
          gender.toUpperCase() === requiredGender.toUpperCase();

        // Only show if all conditions are met
        const shouldShow = matchesCondition && genderMatches;

        if (!shouldShow) {
          const questionAfterConditional = state.byId[nextId]?.next;
          nextId = questionAfterConditional;
        }
      }

      return {
        ...state,
        currentQuestion: nextId ? state.byId[nextId] : null,
      };
    }

    case ACTIONS.SET_PREVIEW_URL: {
      let { url } = action.payload;

      return {
        ...state,
        previewURL: url,
      };
    }

    case ACTIONS.SET_FORM_ALL_QUESTIONS_FILLED: {
      return {
        ...state,
        allQuestionsFilled: action.payload.flag,
      };
    }

    case ACTIONS.CHANGE_QUESTION_LANGUAGE: {
      return {
        ...state,
        isHindi: action.payload.flag,
      };
    }

    case ACTIONS.SET_FORM_IS_MALE: {
      const flag = action.payload.flag;
      // Store gender in localStorage for conditional questions
      window.localStorage.setItem("gender", flag ? "M" : "F");

      return {
        ...state,
        isMale: flag,
      };
    }

    case ACTIONS.SET_USER_AGE: {
      const { age } = action.payload;
      window.localStorage.setItem("age", age.toString());

      return {
        ...state,
        userAge: age,
      };
    }
    case ACTIONS.SAVE_USER_FORM_RESPONSES: {
      return {
        ...state,
        userFormResponses: action.payload,
      };
    }

    default:
      return state;
  }
};

export default questionsReducer;
