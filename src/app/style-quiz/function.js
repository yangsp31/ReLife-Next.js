const express = require("express");
const quizRoutes = express.Router(); // Express 라우터 인스턴스를 생성
const dbo = require("../db/quiz-test"); // 데이터베이스 작업을 위한 모듈을 불러옴

const sessions = {}; // 세션 정보를 저장할 객체입니다.
let questionsData = ""; // 모든 퀴즈 질문을 저장할 변수입니다.

// 비동기 함수를 정의하여 데이터베이스에서 퀴즈 질문을 가져옵니다.
async function getQuizQuestion() {
  const cursor = dbo.getQuizTestDb();
  questionsData = await cursor;
}
getQuizQuestion(); // 함수를 호출하여 질문 데이터를 초기화합니다.

// GET 요청 처리: 모든 퀴즈 질문을 반환합니다.
quizRoutes.route("/quiz-test").get(async function (req, res) {
  const cursor = dbo.getQuizTestDb();
  var results = await cursor;
  res.json(results).status(200); // 결과를 JSON 형태로 클라이언트에 응답합니다.
});

// POST 요청 처리: 새로운 퀴즈 세션을 시작하고 첫 번째 질문을 반환합니다.
quizRoutes.route("/quiz/start").post((req, res) => {
  const sessionId = generateSessionId(); // 세션 ID를 생성합니다.
  const firstQuestion = getNextQuestion(sessionId); // 첫 번째 질문을 가져옵니다.
  res.json({ sessionId, question: firstQuestion }); // 세션 ID와 첫 번째 질문을 반환합니다.
});

// POST 요청 처리: 사용자의 답변을 저장하고 다음 질문을 반환하거나 퀴즈 결과를 계산합니다.
quizRoutes.route("/quiz/answer").post((req, res) => {
  const { sessionId, answer } = req.body;
  storeUserAnswer(sessionId, answer); // 사용자의 답변을 저장합니다.

  const nextQuestion = getNextQuestion(sessionId); // 다음 질문을 가져옵니다.
  if (nextQuestion) {
    res.json({ question: nextQuestion });
  } else {
    const result = calculateResult(sessionId); // 결과를 계산합니다.
    res.json({ result });
  }
});

// POST 요청 처리: 특정 세션의 퀴즈 결과를 반환
quizRoutes.route("/quiz/result/:sessionId").post((req, res) => {
  const sessionId = req.params.sessionId;
  const result = calculateResult(sessionId); // 결과를 계산합니다.
  res.json({ result });
});

// POST 요청 처리: 사용자가 선택한 스타일 이름의 빈도수를 계산하고 결과를 반환합니다.
quizRoutes.route("/gallery/result").post((req, res) => {
  const result = req.body;
  console.log("result: ", result); // 결과 로깅
  const selectedNames = result.selectedNames;
  const frequencyMap = {};
  selectedNames.forEach((name) => {
    frequencyMap[name] = (frequencyMap[name] || 0) + 1; // 빈도수 계산
  });

  let maxFrequency = 0;
  for (const name in frequencyMap) {
    if (frequencyMap[name] > maxFrequency) {
      maxFrequency = frequencyMap[name]; // 최빈값 계산
    }
  }

  const mostPreferredStyles = [];
  for (const name in frequencyMap) {
    if (frequencyMap[name] === maxFrequency) {
      mostPreferredStyles.push(name); // 최빈 스타일 추출
    }
  }

  const styleDescriptions = dbo.getStyleDescription(); // 스타일 설명을 가져옵니다.
  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  const resultFinal = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index], // 최종 결과 매핑
  }));
  res.json({ resultFinal }).status(200); // 최종 결과를 반환합니다.
});

// 세션 ID를 생성하는 함수입니다.
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

// 다음 질문을 가져오는 함수입니다.
function getNextQuestion(sessionId) {
  const session = sessions[sessionId] || initializeSession(sessionId);
  const { currentQuestionIndex } = session;

  if (currentQuestionIndex < questionsData.length) {
    const nextQuestion = questionsData[currentQuestionIndex];
    return {
      id: nextQuestion.id,
      question: nextQuestion.question,
      options: nextQuestion.options.map((option) => ({
        text: option.text,
        image: option.image,
        type: option.type,
      })),
    };
  }

  return null;
}

// 사용자의 답변을 저장하는 함수입니다.
function storeUserAnswer(sessionId, answer) {
  const session = sessions[sessionId] || initializeSession(sessionId);
  const { currentQuestionIndex, userAnswers } = session;
  const currentQuestion = questionsData[currentQuestionIndex];

  userAnswers[currentQuestion._id] = answer;

  session.currentQuestionIndex += 1;
}

// 퀴즈 결과를 계산하는 함수입니다.
function calculateResult(sessionId) {
  const session = sessions[sessionId];
  const { userAnswers } = session;
  const styleCount = {};

  for (const questionId in userAnswers) {
    const answerType = userAnswers[questionId];
    if (answerType in styleCount) {
      styleCount[answerType] += 1;
    } else {
      styleCount[answerType] = 1;
    }
  }

  const maxCount = Math.max(...Object.values(styleCount));

  const mostPreferredStyles = Object.keys(styleCount).filter(
    (style) => styleCount[style] === maxCount
  );

  const styleDescriptions = dbo.getStyleDescription();
  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  const result = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index],
  }));

  return result;
}

// 세션을 초기화하는 함수입니다.
function initializeSession(sessionId) {
  const session = {
    currentQuestionIndex: 0,
    userAnswers: {},
  };
  sessions[sessionId] = session;
  return session;
}

module.exports = quizRoutes; // 모듈 내보내기
