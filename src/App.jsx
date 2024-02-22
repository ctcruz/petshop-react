import { useState } from "react";
import "./index.css";

function App() {
  const [pets, setPets] = useState([]);

  async function getPets() {
    const { pets } = await fetch("http://localhost:3000/pets").then(
      async (res) => await res.json()
    );
    setPets(pets);
  }

  async function createPet(e) {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      age: e.target.age.value,
      breed: e.target.breed.value,
    };

    try {
      await fetch("http://localhost:3000/pets", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Registro criado com sucesso!");
    } catch (e) {
      alert("Ocorreu algum erro na hora de cadastrar!");
      console.log("error: ", e);
    }
  }

  async function deletePet(petId) {
    try {
      await fetch(`http://localhost:3000/pets/${petId}`, { method: "DELETE" });
      alert("Registro excluído com sucesso!");
    } catch (e) {
      alert("Ocorreu algum erro na hora de excluir!");
      console.log("error: ", e);
    }
  }

  async function updatePet(e) {
    e.preventDefault();
    const petId = e.target.id.value;
    const data = {
      name: e.target.name.value,
      age: e.target.age.value,
      breed: e.target.breed.value,
    };

    try {
      await fetch(`http://localhost:3000/pets/${petId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Registro atualizado com sucesso!");
    } catch (e) {
      alert("Ocorreu algum erro na hora de atualizar!");
      console.log("error: ", e);
    }
  }

  return (
    <div className="container mx-auto my-10 flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold">Formulário de Cadastro</h1>
      <form onSubmit={createPet} className="flex flex-col gap-5">
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            required
            className="border-black border ml-1"
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            name="age"
            required
            className="border-black border ml-1"
          />
        </div>
        <div>
          <label>Raça:</label>
          <input
            type="text"
            name="breed"
            required
            className="border-black border ml-1"
          />
        </div>
        <button className="px-5 py-2 bg-green-300 rounded" type="submit">
          Cadastrar
        </button>
      </form>
      <hr className="w-full" />
      <button className="px-5 py-2 bg-blue-300 rounded" onClick={getPets}>
        Atualizar lista
      </button>
      <hr className="w-full" />
      <h1 className="font-bold">Lista de Registros</h1>
      <ul className="divide-y divide-gray-200 w-full">
        {pets.map((pet) => (
          <li key={`pet-${pet.id}`} className="py-4 flex justify-center">
            <div className="ml-3 flex flex-row justify-between items-center gap-10">
              <div>
                <p className="text-sm font-medium text-gray-900">#{pet.id}</p>
                <form
                  onSubmit={updatePet}
                  className="flex flex-col gap-3 justify-between items-center"
                >
                  <p className="text-sm text-gray-500">
                    <input type="hidden" value={pet.id} name="id" />
                    <div>
                      <label>Nome:</label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={pet.name}
                        className="border-black border ml-1"
                      />
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    <div>
                      <label>Idade:</label>
                      <input
                        type="number"
                        name="age"
                        required
                        defaultValue={pet.age}
                        className="border-black border ml-1"
                      />
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    <div>
                      <label>Raça:</label>
                      <input
                        type="text"
                        name="breed"
                        required
                        defaultValue={pet.breed}
                        className="border-black border ml-1"
                      />
                    </div>
                  </p>
                  <p>
                    <button
                      className="px-3 py-1 bg-yellow-300 rounded"
                      type="submit"
                    >
                      Atualizar
                    </button>
                  </p>
                </form>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 bg-red-300 rounded"
                  onClick={() => deletePet(pet.id)}
                  type="button"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
