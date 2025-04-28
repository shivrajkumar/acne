export const isGroupComplete = (currentQuestion, nextQuestion) => {
	if (!currentQuestion) return false;
	if (currentQuestion.next === null) return true;
	if (!nextQuestion) return false;
	return currentQuestion.group !== nextQuestion.group && !nextQuestion.reply;
};