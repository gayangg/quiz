import * as topicsService from '../../services/topicsService.js';

const listTopics = async ({ response }) => {
  //const topics = await topicsService.getAllTopics();
  const topics = await topicsService.getTopics();
  //console.log("topics", topics);
  response.body = { topics };
};

const listTopicsbyId = async ({ params, response }) => {
  const topicId = params.id;
  //const topics = await topicsService.getAllTopics();
  const topics = await topicsService.getTopicbyId(topicId);
  response.body = { topics };
};

const addTopic = async ({ request, response, user }) => {
  if (!user || !user.isAdmin) {
    response.status = 403;
    return;
  }

  const body = await request.body().value;
  const name = body.name?.trim();

  if (!name) {
    response.body = { error: 'Topic name must not be empty' };
    return;
  }

  //await topicsService.createTopic(name);
  await topicsService.addTopic(name);
  response.redirect('/topics');
};

const deleteTopic = async ({ params, response, user }) => {
  if (!user || !user.isAdmin) {
    response.status = 403;
    return;
  }

  const id = params.id;
  //await topicsService.removeTopic(id);
  await topicsService.deleteTopic(id);
  response.redirect('/topics');
};

export { listTopics, listTopicsbyId, addTopic, deleteTopic }