$(document).ready(() => {
	let randomID = 0;
	let imgConteiner = document.querySelector('#divShowImg');
	let container = document.querySelector('#divShowPokemon');
	let btnConteiner = document.querySelector('#divChoiceBtn');

	let initGame = document.getElementById('initGame');

	$('#initGame').click(event => {
		event.preventDefault();

		$('#divInitGame').hide();
		$('#divLogo').hide();

		$('#divShowImg').show();
		$('#divShowPokemon').show();
		$('#divChoiceBtn').show();
		buscaPokemon();

		setTimeout(function () {
			pokeID =  getRandomInt(min, max);
			console.log(pokeID);
			let nomePoke = pokemon.results[pokeID-1].name;
			console.log(nomePoke);
			if (nomePoke == null || nomePoke == undefined){
				pokemonUndefined = pokeID;
				pokeID = getRandomInt(min, max);
			}
			

			//let iDPoke = pokeID;
			//let imgPoke = pokemon.sprites.front_default;
			let elist = document.querySelectorAll('button');
			let pokeTag = document.createElement('img');
			
			for(let i = 4; i>0;i--){
				console.log(elist);
				if(i == 4){
					let ind = getRandomInt(1, i);
					console.log(ind);
					$('#btn'+ ind).val(pokeID).html(nomePoke);
					
					//pokeTag.setAttribute('src',imgPoke);
					//pokeTag.setAttribute('id','imgPokeTag');
					//pokeTag.setAttribute('alt',nomePoke);
					//pokeTag.append(imgPoke);

					//imgConteiner.appendChild(pokeTag);
				}else{
					$('#divChoiceBtn button').each(function(index, element) {
						if(element.value == ""){
							let provId = getRandomInt(min, max);
							if(provId != pokeID){
								nomePoke = pokemon.results[provId-1].name;
								console.log(provId +" id prov. e nome pokemon "+ nomePoke);
								$('#btn'+ index).val(provId).html(nomePoke);
							}else{
								provId = provId+1;
								nomePoke = pokemon.results[provId-1].name;
								console.log(provId +" id prov. e nome pokemon "+ nomePoke);
								$('#btn'+ index).val(provId).html(nomePoke);
							}
						}
					});				
				}
			}
		}, 2000);
	});
});

let pokeID;
let pokemon;
let pokemonUndefined = [];
let Pokedex = [];

// limita pesquisa de Pokemons
const min = 1;
const max = 150;

//API
const baseUrl =  'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0';


// Busca Pokemon
function buscaPokemon(){
	requestPokeInfo(baseUrl);	
}

// Busca numero aleatorio
function getRandomInt( min , max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;  
}

function requestPokeInfo(url) {
	fetch(url)
	.then(response => response.json())
	.then(data => {
	pokemon = data;

	console.log(data);
    })
	.catch(function(error) {
		console.log('Erro na busca da API Pokemon: ' + error.message);
	  });
}