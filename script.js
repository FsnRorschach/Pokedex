$(document).ready(() => {
	
	let imgConteiner = document.querySelector('#divShowImg');
	let container = document.querySelector('.containerPokedex');

	$('#initGame').click(event => {
		event.preventDefault();

		$('.homeScreem').hide();

		$('.gameScreem').show();
		buscaPokemon();
		
		setTimeout(function(){
			pokeID =  getRandomInt(min, max);
			let nomePoke = pokemon.results[pokeID-1].name;

			// let elist = document.querySelectorAll('button');

			// let pokeTag = document.createElement('img');

			// let tagUl = document.createElement('ul');
			// let tagLi = document.createElement('li');
			// let tagFigurePoke = document.createElement('figure');
			// let tagImgPoke = document.createElement('img');
			// let tagDivInfo = document.createElement('div');
			// let tagPInfo = document.createElement('p');
			// let tagSpanInfo = document.createElement('span');
			// let tagh5Info = document.createElement('h5');
			// let tagDivAbilitys1 = document.createElement('div');			
			// let tagSpanAbilitys1 = document.createElement('span');
			// let tagDivAbilitys2 = document.createElement('div');			
			// let tagSpanAbilitys2 = document.createElement('span');

		
						
			for(let i = 2; i>0;i--){
				if(i == 2){
					let ind = getRandomInt(1, 4);
					$('#btn'+ ind).val(pokeID).html(nomePoke);
					let pokeFields = "https://pokeapi.co/api/v2/pokemon/";
					setInterval( function(){
						requestPokeInfo(String(pokeFields + pokeID)
						)},200);
				}else{
					$('#divChoiceBtn button').each(function(index, element) {
						if(element.value == ""){
							let provId = getRandomInt(min, max);
							if(provId != pokeID){
								nomePoke = pokemon.results[provId-1].name;
								$('#btn'+ (index+1)).val(provId).html(nomePoke);
							}else{
								provId = provId+1;
								nomePoke = pokemon.results[provId-1].name; 
								$('#btn'+ (index+1)).val(provId).html(nomePoke);
							}
						}
					});				
				}
			}
			
			let imgPoke = pokeAbilitys.sprites.front_default;	
			pokeTag.setAttribute('src',imgPoke);
			pokeTag.append(imgPoke);
			console.log(pokeTag);

			imgConteiner.appendChild(pokeTag);
			container.appendChild(pokeTag);

			
			console.log(' teste saber quando carrega: dentro do settimeout '+ pokeAbilitys);
			tagUl.setAttribute('class','pokedexResults');
			tagLi.setAttribute('class','figures');
			//tagImgPoke.setAttribute('src',imgPoke);
			tagDivInfo.setAttribute('class','div-poke-info');
			tagPInfo.setAttribute('class','id-poke-info');
			tagSpanInfo.setAttribute('class','id-number');
			tagDivAbilitys1.setAttribute('class','abilitys1');					
			tagDivAbilitys2.setAttribute('class','abilitys2');
		},4000);
	});
});

let pokeID;
let pokemon;
let pokeAbilitys;
let pokemonUndefined = [];
let Pokedex = [];

// limita pesquisa de Pokemons
const min = 1;
const max = 150;

//API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0';


// Busca Pokemon
async function buscaPokemon(){
	try{
		await requestPokeInfo(baseUrl);	
	}
	catch(err){
		console.log('Falha na consulta', err);
	}
	
}

// Busca numero aleatorio
function getRandomInt( min , max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;  
}

async function requestPokeInfo(url) {
	console.log('entrou na requestpoke');
	try {
		await fetch(url)
		.then(response => {
			// valida se a requisição falhou
			console.log(response);
			if (!response.ok) {
				return new Error('falhou a requisição') // cairá no catch da promise
			}	
			// verificando pelo status
			if (response.status === 404) {
				return new Error('não encontrou qualquer resultado')
			}
			return response.json();})
		.then(data => {
			if(url != baseUrl){
				pokeAbilitys = data;
				console.log('dentro da request , recebe data '+ pokeAbilitys);
			}
			else{
				pokemon = data;
				
				console.log(pokemon);		
			}	
    	});
	} catch (error) {
		console.log('Erro na busca fetch da API Pokemon: ' + error.message);
	}
}

// async function callService(url) {
//     var response = null; 

//     try {
//         response = await fetch(url).then(res => res.json());
//     } catch(err) {
//         response = err;
//     }

//     return response;
// }

// async function getPokemonData() {
//     try {
//         const response = await callService('https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0');
//         const { results } = response;

//         for (var i = 0; i < 10; i++) {
//             var pokemonData = await callService(results[i].url);
//             console.log('Exibindo data do pokemon ' + results[i].name);
//             console.log(pokemonData);
//         }
//     } catch(err) {
//         console.log('Falha na consulta', err);
//     }
// }