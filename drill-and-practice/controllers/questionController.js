import * as questionsService from '../services/questionsService.js';

const listQuestions = async ({ params, response }) => {
  const topicId = params.id;
  const questions = await questionsService.getQuestionsByTopic(topicId);
  response.body = { questions };
};

const addQuestion = async ({ params, request, response, user }) => {
  const topicId = params.id;
  const body = await request.body().value;
  const questionText = body.question_text?.trim();

  if (!questionText) {
    response.body = { error: 'Question text must not be empty' };
    return;
  }

  await questionsService.createQuestion(topicId, user.id, questionText);
  response.redirect(`/topics/${topicId}`);
};

const deleteQuestion = async ({ params, response }) => {
  const { id: topicId, qId: questionId } = params;
  await questionsService.removeQuestion(questionId);
  response.redirect(`/topics/${topicId}`);
};

export { listQuestions, addQuestion, deleteQuestion };