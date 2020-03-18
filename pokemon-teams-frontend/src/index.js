const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', (event) => {
let mainNode = document.getElementById("all-trainers")

renderHomepage()

function renderHomepage() {
  mainNode.innerHTML = ""

  fetch('http://localhost:3000/trainers')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    Array.from(data).forEach(element => {
      let trainerNode = document.createElement("DIV")
      trainerNode.className = "card"
      trainerNode.dataset.id = element.id

      let trainerNameNode = document.createElement("P")
      trainerNameNode.innerText = element.name
      trainerNode.appendChild(trainerNameNode)

      let addPokemonBTN = document.createElement("BUTTON")
      addPokemonBTN.innerHTML = "Add Pokemon"
      addPokemonBTN.dataset.trainerid = element.id
      addPokemonBTN.addEventListener("click", addpokemon)
      trainerNode.appendChild(addPokemonBTN)

      let pokemonList = document.createElement("UL")
      let numPokemon = 0
      element.pokemons.forEach(pokemon => {

        let pokemonElement = document.createElement("LI")
        pokemonElement.innerText = `${pokemon.nickname} (${pokemon.species})`

        let deleteBTN = document.createElement("BUTTON")
        deleteBTN.innerHTML = "remove"
        deleteBTN.dataset.pokemonid = pokemon.id
        deleteBTN.addEventListener("click", deletepokemon)

        pokemonElement.appendChild(deleteBTN)
        pokemonList.appendChild(pokemonElement)
        numPokemon++
      });
      trainerNode.appendChild(pokemonList)
      trainerNode.dataset.numpokemon = numPokemon
      mainNode.appendChild(trainerNode)
    });;
  });
}

function deletepokemon(event) {
  fetch(POKEMONS_URL + '/' + event.target.dataset.pokemonid, {
    method: 'delete'
  }).then((response) => {
    return response.json();
  })
  .then((data) => {
    console.dir(data)
    event.target.parentNode.parentNode.parentNode.dataset.numPokemon--
    renderHomepage()
  })
}

function addpokemon(event) {
if (event.target.parentNode.dataset.numpokemon < 6) {
  fetch(POKEMONS_URL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"trainer_id": event.target.parentNode.dataset.id})
  }).then((response) => {
    return response.json();
  })
  .then((data) => {
    console.dir(data)
    event.target.parentNode.dataset.numPokemon++
    renderHomepage()
  })
}
}

})


{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}