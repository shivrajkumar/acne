"use client";
import { useEffect, useState, useContext } from "react";
import groupBy from "lodash/groupBy";
import { QuestionsContext } from "../../context/questions-store";
// import { MiniQuestionsContext } from "@context/mini-questions-store";

const ProgressBar = () => {
  const [, setGridColCount] = useState(null);

  const { currentQuestion, questions } = useContext(QuestionsContext);
  const [questionsGroups, setQuestionsGroups] = useState({});

  useEffect(() => {
    if (questions) setQuestionsGroups(() => questionsByGroup(questions));
  }, [questions]);

  useEffect(() => {
    if (questionsGroups)
      setGridColCount(() => Object.keys(questionsGroups).length);
  }, [questionsGroups]);

  const getwidth = () => {
    let _index;
    let percentage;
    const mergedArray = [].concat(...Object.values(questionsGroups));
    if (questionsGroups[currentQuestion?.group] !== undefined) {
      // questionsGroups[currentQuestion.group].map((idx, index) => {
      //   if (idx.id === currentQuestion.id) {
      //     _index = index + 1;
      //   }
      // });
      mergedArray.map((idx, index) => {
        if (idx?.id === currentQuestion?.id) {
          _index = index;
        }
      });
      // percentage = _index / questionsGroups[currentQuestion.group].length;
      // if (currentQuestion.id !== "vitamin_def1") {
      if (_index !== undefined) {
        percentage = _index / mergedArray.length;
        window.localStorage.setItem("progress_bar_index", _index);
      } else {
        // if (currentQuestion.id === "vitamin_def1") {
        let index = window.localStorage.getItem("progress_bar_index");
        if (index) {
          percentage = (parseFloat(index) + 0.5) / mergedArray.length;
        }
      }
    }

    return percentage * 100;
  };

  // const showPills = (key) => {
  //   return key === currentQuestion.group || hasSomeQuestionsAnswered(key);
  // };

  // const hasAllQuestionsAnswered = (key) => {
  //   return questionsGroups[key].every((ques) => {
  //     if (ques.optional) return true;
  //     return !isEmpty(ques.reply);
  //   });
  // };

  return (
    <div>
      {!isNaN(getwidth()) && (
        <div className="">
          <div className=" bg-Neutral/100 w-full  h-[4px] xl:h-[4px]  ">
            <div
              className="w-full h-[4px] xl:h-[4px] bg-Primary/500 "
              style={{ width: `${getwidth()}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

const questionsByGroup = (questions) => {
  return groupBy(questions, (question) => question?.group);
};
