import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../data/quizQuestions.json";
import {
  SuccessDoodle,
  FailureDoodle,
  MuscleDoodle,
  VibeDoodle,
  ThinkingDoodle,
} from "../components/animations/DoodleAnimations";

function VerifySkill() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("select-skill");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const userSkills = [
    { name: "REACT", color: "bg-white", emoji: "⚛️", status: "unverified" },
    {
      name: "JAVASCRIPT",
      color: "bg-white",
      emoji: "🟨",
      status: "unverified",
    },
    { name: "PYTHON", color: "bg-[#96E7E5]", emoji: "🐍", status: "beginner" },
    { name: "FIGMA", color: "bg-white", emoji: "🎨", status: "unverified" },
    { name: "FLUTTER", color: "bg-white", emoji: "💙", status: "unverified" },
  ];

  const levels = [
    {
      id: "beginner",
      name: "Beginner",
      color: "#96E7E5",
      emoji: "🌱",
      description: "just getting started",
      tagline: "baby steps count fr fr",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      color: "#40FFB9",
      emoji: "🔥",
      description: "you know your stuff",
      tagline: "not your first rodeo",
    },
    {
      id: "advance",
      name: "Advanced",
      color: "#FFD54F",
      emoji: "⭐",
      description: "absolute legend status",
      tagline: "built different ngl",
    },
  ];

  const getQuestions = () => {
    if (!selectedSkill || !selectedLevel) return [];
    const skillData = quizData[selectedSkill];
    if (!skillData) return [];
    return skillData[selectedLevel] || [];
  };

  const questions = getQuestions();

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setCurrentStep("select-level");
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentStep("quiz");
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      setScore(finalScore);
      setCurrentStep("result");
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setIsAnswered(false);
    setCurrentStep("select-skill");
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  const finalPercentage = (score / questions.length) * 100;
  const passed = finalPercentage >= 70;

  return (
    <div className="w-full h-full flex items-center justify-center  pt-6 md:pt-12">
      <div className="w-[95%] md:w-[90%] h-[80%] md:h-[89%] bg-[#efebe0] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-auto custom-scroll p-4 md:p-6">
        {/* Select Skill Step */}
        {currentStep === "select-skill" && (
          <div className="h-full flex flex-col">
            <div className="mb-4 md:mb-6 relative w-fit">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-[inter-extra] text-black uppercase mb-2">
                time to flex 💪
              </h1>
              <MuscleDoodle />
              <p className="text-sm md:text-base lg:text-lg font-[Jost-Medium] text-gray-700">
                pick a skill and show us what you got
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
              {userSkills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillSelect(skill.name)}
                  className={`${skill.color} group p-3 md:p-4 rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer text-center`}
                >
                  <h3 className="text-base md:text-lg lg:text-xl font-[Jost-Bold] text-black">
                    {skill.name}
                  </h3>
                </button>
              ))}
            </div>

            <button
              onClick={handleBackToProfile}
              className="mt-auto w-full md:w-auto bg-[#FFB3B3] px-4 md:px-6 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            >
              <span className="text-sm md:text-base lg:text-lg font-[Jost-Bold] text-black">
                ← back to profile
              </span>
            </button>
          </div>
        )}

        {/* Select Level Step */}
        {currentStep === "select-level" && (
          <div className="h-full flex flex-col">
            <div className="mb-4 md:mb-6 relative w-fit">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-[inter-extra] text-black uppercase mb-2">
                choose your vibe
              </h1>
              <VibeDoodle />
              <p className="text-sm md:text-base lg:text-lg font-[Jost-Medium] text-gray-700 mb-1">
                testing:{" "}
                <span className="font-[Jost-Bold] text-black">
                  {selectedSkill}
                </span>
              </p>
              <p className="text-xs md:text-sm lg:text-base font-[Jost-Regular] text-gray-600">
                how confident are you feeling rn?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              {levels.map((level, index) => (
                <button
                  key={index}
                  onClick={() => handleLevelSelect(level.id)}
                  className="group bg-[#FFFAE9] p-4 md:p-6 lg:p-8 rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer text-center"
                >
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-center text-3xl md:text-4xl lg:text-5xl"
                    style={{ backgroundColor: level.color }}
                  >
                    {level.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-[Jost-Bold] text-black mb-1 md:mb-2 uppercase">
                    {level.name}
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base font-[Jost-Medium] text-gray-700 mb-1">
                    {level.description}
                  </p>
                  <p className="text-xs md:text-sm font-[Jost-Regular] text-gray-500 italic">
                    {level.tagline}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep("select-skill")}
              className="mt-auto w-full md:w-auto bg-[#FFB3B3] px-4 md:px-6 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            >
              <span className="text-sm md:text-base lg:text-lg font-[Jost-Bold] text-black">
                ← back
              </span>
            </button>
          </div>
        )}

        {/* Quiz Step */}
        {currentStep === "quiz" && questions.length > 0 && (
          <div className="h-full flex flex-col">
            <div className="mb-2 md:mb-3">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <div className="relative">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-[inter-extra] text-black uppercase">
                    {selectedSkill} quiz
                  </h2>
                  <ThinkingDoodle />
                  <p className="text-xs md:text-sm lg:text-base font-[Jost-Medium] text-gray-600">
                    {selectedLevel} level • no going back!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl lg:text-4xl mb-1">
                    {progressPercentage < 30
                      ? "🤔"
                      : progressPercentage < 70
                      ? "🔥"
                      : "💪"}
                  </div>
                  <span className="text-xs md:text-sm font-[Jost-Bold] text-black">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-2 md:h-3 lg:h-4 bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#96E7E5] via-[#40FFB9] to-[#FFD54F] transition-all duration-500 ease-out relative"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs md:text-sm font-[Jost-Bold] text-black">
                    Q {currentQuestion + 1}/{questions.length}
                  </span>
                  <span className="text-xs md:text-sm font-[Jost-Medium] text-gray-600">
                    {questions.length - currentQuestion - 1} left
                  </span>
                </div>
              </div>
            </div>

            <div key={currentQuestion} className="flex-1 flex flex-col min-h-0">
              <div className="bg-gradient-to-br from-[#FFFAE9] to-[#FFF9E3] rounded-[12px] md:rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] p-3 md:p-5 mb-3 relative overflow-hidden flex flex-col justify-center flex-1">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-[#FFD54F] opacity-20 rounded-bl-full"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="bg-black text-white w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-[inter-extra] text-xs md:text-sm lg:text-base flex-shrink-0">
                      {currentQuestion + 1}
                    </div>
                    <h2 className="text-base md:text-lg lg:text-xl font-[Jost-Bold] text-black leading-tight flex-1">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mt-auto">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const optionLabels = ["A", "B", "C", "D"];

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`group w-full p-2 md:p-3 rounded-[10px] md:rounded-[12px] border-2 border-black text-left transition-all duration-200 relative overflow-hidden ${
                            isSelected
                              ? "bg-[#A8C5FF] translate-x-[2px] translate-y-[2px] shadow-none scale-[0.99]"
                              : "bg-white hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] hover:scale-[1.01]"
                          } cursor-pointer flex items-center h-full`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                          )}

                          <div className="flex items-center gap-2 md:gap-3 w-full relative z-10">
                            <div
                              className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-black flex items-center justify-center font-[Jost-Bold] text-xs md:text-sm flex-shrink-0 transition-all ${
                                isSelected
                                  ? "bg-black text-white scale-110"
                                  : "bg-white text-black group-hover:scale-105"
                              }`}
                            >
                              {optionLabels[index]}
                            </div>
                            <span
                              className={`text-xs md:text-sm font-[Jost-Medium] leading-tight transition-all ${
                                isSelected
                                  ? "text-black font-[Jost-Bold]"
                                  : "text-black"
                              }`}
                            >
                              {option}
                            </span>
                            {isSelected && (
                              <div className="ml-auto">
                                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center animate-bounce">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`w-full py-2 md:py-3 rounded-[10px] md:rounded-[12px] border-2 border-black font-[Jost-Bold] text-base md:text-lg transition-all duration-200 relative overflow-hidden ${
                  selectedAnswer === null
                    ? "bg-gray-300 cursor-not-allowed opacity-50 shadow-none"
                    : "bg-[#A8FFB3] hover:translate-x-[2px] hover:translate-y-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] cursor-pointer"
                }`}
              >
                {selectedAnswer !== null && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {currentQuestion === questions.length - 1 ? (
                    <>finish quiz 🎯</>
                  ) : (
                    <>
                      next question{" "}
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Result Step */}
        {currentStep === "result" && (
          <div className="h-full flex flex-col items-center justify-center py-2">
            <div className="max-w-2xl w-full text-center flex flex-col h-full justify-center">
              <div className="mb-2 md:mb-4 transform scale-75 md:scale-90">
                {passed ? <SuccessDoodle /> : <FailureDoodle />}
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-[inter-extra] text-black uppercase mb-1 md:mb-2">
                {passed ? "you ate! 🎉" : "not quite 😢"}
              </h1>

              <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
                <p className="text-sm md:text-base font-[Jost-Bold] text-black">
                  scored {score}/{questions.length}
                </p>
                <span className="text-black">•</span>
                <p className="text-xl md:text-2xl font-[inter-extra] text-black">
                  {Math.round(finalPercentage)}%
                </p>
              </div>

              {passed ? (
                <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-3 md:p-4 mb-3 md:mb-5 mx-auto w-full max-w-md">
                  <p className="text-sm md:text-base font-[Jost-Bold] text-black mb-2 md:mb-3">
                    congrats! you're officially verified in {selectedSkill} at{" "}
                    {selectedLevel} level 🔥
                  </p>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <span className="text-xs md:text-sm font-[Jost-Medium] text-black">
                      your new badge:
                    </span>
                    <div
                      className="px-3 md:px-4 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                      style={{
                        backgroundColor:
                          selectedLevel === "beginner"
                            ? "#96E7E5"
                            : selectedLevel === "intermediate"
                            ? "#40FFB9"
                            : "#FFD54F",
                      }}
                    >
                      <span className="text-xs md:text-sm font-[Jost-Bold] text-[#00BCD4]">
                        {selectedSkill}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFFAE9] rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] p-3 md:p-4 mb-3 md:mb-5 mx-auto w-full max-w-md">
                  <p className="text-sm md:text-base font-[Jost-Bold] text-black">
                    need 70% to pass. you got this next time! 💪
                  </p>
                </div>
              )}

              <div className="flex flex-row gap-2 md:gap-3 w-full max-w-md mx-auto">
                {!passed && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 bg-[#FFD54F] px-4 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-[Jost-Bold] text-black">
                      run it back 🔄
                    </span>
                  </button>
                )}
                <button
                  onClick={handleBackToProfile}
                  className="flex-1 bg-[#A8C5FF] px-4 py-2 md:py-3 rounded-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
                >
                  <span className="text-sm md:text-base font-[Jost-Bold] text-black">
                    back to profile
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifySkill;
