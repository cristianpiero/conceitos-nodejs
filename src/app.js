const express = require("express");
const cors = require("cors");

const { uuid:v4 } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  // Lista os repositorios
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  // Cria o repositorio
  const { title, url, techs } = request.body;

  const repository = {
    id : v4(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  // Atualiza o repositorio
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id===id)

  if (repoIndex < 0){
      return response.status(400).json({ error: 'Repository not found!'});
  }

  const likes = repositories[repoIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  // Deleta o repositorio
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id===id)

  if (repoIndex < 0){
      return response.status(400).json({ error: 'Repository not found!'});
  }

  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  // Adicionando do Like

  const { id } = request.params;
  

  const repoIndex = repositories.findIndex(repo => repo.id===id)

  if (repoIndex < 0){
      return response.status(400).json({ error: 'Repository not found!'});
  }

  const repository = repositories[repoIndex];
  
  repository.likes = repository.likes + 1;

  repositories[repoIndex] = repository;

  return response.json(repository);

});

module.exports = app;
