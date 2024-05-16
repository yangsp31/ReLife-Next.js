const express = require("express"); //API 엔드포인트(quiz-test, quiz/start, quiz/answer 등)를 설정
const quizRoutes = express.Router(); // Express 라우터 인스턴스를 생성
const dbo = require("../db/quiz-test"); // 데이터베이스 작업을 위한 모듈을 불러옴

const sessions = {}; // 세션 정보 저장 객체 (세션 :웹 어플리케이션에서 사용자의 상태를 유지하고 데이터를 저장하는 방법)
let questionsData = ""; // 모든 퀴즈 질문을 저장할 변수

//getQuizQuestion: 데이터베이스에서 퀴즈 질문을 가져와 전역 변수에 저장(빠르게 데이터에 접근 가능->서버효율성 업,응답시간 감소)
async function getQuizQuestion() { //비동기 함수 정의(비동기:함수가 완료될때까지 기다림)
  const cursor = dbo.getQuizTestDb();//dbo 객체: "../db/quiz-test" 모듈에서,데이터베이스 연결 관련 기능
  questionsData = await cursor; //퀴즈데이터 questionsData에 저장
}
getQuizQuestion(); // 함수를 호출하여 질문 데이터를 초기화(서버성능 업)

// GET 요청 처리(클라이언트가 "/quiz-test"경로로 요청): 모든 퀴즈 질문을 가져옴(최신데이터 적용)
quizRoutes.route("/quiz-test").get(async function (req, res) {
  const cursor = dbo.getQuizTestDb(); //DB에 퀴즈질문 요청
  var results = await cursor; //DB쿼리가 완료될때까지 기다림
  res.json(results).status(200); // 결과를 JSON 형태로 클라이언트에 응답(보냄)
});

// POST 요청 처리: 요청받고 응답으로 새로운 퀴즈 세션 ID와 첫 번째 퀴즈 질문을 JSON 형식으로 클라이언트에 보냄
quizRoutes.route("/quiz/start").post((req, res) => {
  const sessionId = generateSessionId(); // 세션 ID(사용자 고유ID)를 생성(사용자 진행상태 독입적으로 관리)
  const firstQuestion = getNextQuestion(sessionId); // 첫 번째 질문을 가져옴
  res.json({ sessionId, question: firstQuestion }); // 세션 ID와 첫 번째 질문을 반환
});

// POST 요청 처리: 사용자의 답변을 저장하고 다음 질문을 반환하거나 퀴즈 결과 계산
quizRoutes.route("/quiz/answer").post((req, res) => {
  const { sessionId, answer } = req.body; //HTTP 요청의 본문에서 세션ID와 답변의 두 필드를 추출
  storeUserAnswer(sessionId, answer); // 사용자의 답변 저장


  //사용자와의 인터랙션의 핵심적인 부분(퀴즈 애플리케이션의 동적인 흐름을 관리)
  const nextQuestion = getNextQuestion(sessionId); // 다음 질문을 가져옴(아래에 함수 정의)
  if (nextQuestion) { //질문 존재 시
    res.json({ question: nextQuestion }); //nextQuestion반환(현재 함수)
  } else {
    const result = calculateResult(sessionId); //전체 퀴즈 세션에 대한 결과를 계산
    res.json({ result }); //결과 반환(사용자의 답변 평가, 점수를 매기거나, 피드백 제공 등)
  }
});

// POST 요청 처리: 특정 세션의 퀴즈 결과를 반환
quizRoutes.route("/quiz/result/:sessionId").post((req, res) => {
  const sessionId = req.params.sessionId;
  const result = calculateResult(sessionId); // 결과 계산(카테고리 별 점수, 올바른/잘못된 답변의 개수)
  res.json({ result });
});

// POST 요청 처리: 사용자가 선택한 스타일 이름의 빈도수를 계산하고 스타일 반환
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

// 세션 ID를 생성
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
