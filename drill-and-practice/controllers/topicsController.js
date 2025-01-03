// import * as topicService from "../services/topicService.js";

// const listTopics = async ({ render }) => {
//   const topics = await topicService.getAllTopics();
//   render("topics.eta", { topics });
// };

// const addTopic = async ({ request, response, user }) => {
//   const body = request.body();
//   const params = await body.value;

//   if (!params.name || params.name.trim().length === 0) {
//     response.status = 400;
//     return;
//   }

//   await topicService.addTopic(params.name, user.id);
//   response.redirect("/topics");
// };

// const deleteTopic = async ({ params, response }) => {
//   await topicService.removeTopic(params.id);
//   response.redirect("/topics");
// };

// export { listTopics, addTopic, deleteTopic }

import * as topicsService from '../services/topicsService.js';

const listTopics = async ({ response }) => {
  const topics = await topicsService.getAllTopics();
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

  await topicsService.createTopic(name);
  response.redirect('/topics');
};

const deleteTopic = async ({ params, response, user }) => {
  if (!user || !user.isAdmin) {
    response.status = 403;
    return;
  }

  const id = params.id;
  await topicsService.removeTopic(id);
  response.redirect('/topics');
};

export { listTopics, addTopic, deleteTopic }