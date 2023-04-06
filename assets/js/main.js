const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
             `<li class="pokemon ${pokemon.type}" id="pokemon-${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <div class="imgPokemon">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                
            </li> `
        ).join('')
        pokemonList.innerHTML += newHtml

        pokemons.map((pokemon) => {
            const li = document.getElementById(`pokemon-${pokemon.number}`)
            li.addEventListener('click', () => {

                const modal = document.querySelector('.modalContainer')
                const modalName = document.getElementById('pokemonName')
                const modalImage = document.getElementById('pokemonImage')
                const modalTypes = document.getElementById('pokemonTypes')
                const modalPokemonId = document.getElementById('pokemonId')
                const modalStatsPokemon = document.getElementById('statsPokemon')
                const pokemonDetail = document.getElementById('modalContent')
                pokemonDetail.classList.add(`${pokemon.type}`)

                modalName.textContent = pokemon.name
                modalImage.src = pokemon.photo
                modalImage.alt = pokemon.name
                modalTypes.innerHTML = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')
                modalPokemonId.textContent = `#${pokemon.number}`
                const obj = Object(pokemon.stats)
                let statsHtml = ""
                 
                for(key in obj){
                    const newStatsHtml = `<li class="stats">
                    <p class="statName">${key}</p>
                    <div class="statBar">
                    <div class="statBarBg" style="width: ${100*obj[key]/250}%">${obj[key]}</div>
                    </div>
                    </li>`
                    statsHtml += newStatsHtml
                }                         
                modalStatsPokemon.innerHTML += statsHtml                
                modal.style.display = 'block'

                const closeButton = document.querySelector('.closeModal')
                closeButton.addEventListener('click', () => {
                    modal.style.display = 'none'
                    modalStatsPokemon.innerHTML = ""
                })

                

            })
        })
        
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItems(offset, limit)
})



    