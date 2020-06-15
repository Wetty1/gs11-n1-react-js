import React, { useEffect, useState } from "react";

import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('/repositories').then(res => {
      console.log("res: " + res);
      setRepositories(res.data)
    })

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "repo1",
      url: "/repositorios/repo1",
      techs: ["js", "React"]
    })

    console.log("add: " + response.data);

    setRepositories([...repositories, response.data])

    console.log(repositories);

  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`)

    const index_repo = repositories.findIndex(item => item.id === id)

    console.log(index_repo);
    console.log(repositories.splice(index_repo, 1));

    setRepositories(repositories.splice(item => item.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>{ 
          console.log("id: " + repo.id);

          if(repo.id == null)
            return

          return (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
