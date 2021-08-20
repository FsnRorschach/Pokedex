$(document).ready(() => {
	
	let imgConteiner = document.querySelector('.divShowpokemon');
	let container = document.querySelector('.container-cards');

	$('#initGame').click(event => {
		event.preventDefault();

		$('.homeScreem').hide();

		$('.gameScreem').show();
		buscaPokemon();
		
		setTimeout(function(){
			pokeID =  getRandomInt(min, max);
			let nomePoke = pokemon.results[pokeID-1].name;

			let elist = document.querySelectorAll('button');


			let viewDivShowPokemon = document.createElement('div');
			let viewTagDivImg = document.createElement('div');
			let viewTagFigure = document.createElement('figure');
			let viewTagImg = document.createElement('img');
			let viewTagDivInfo = document.createElement('div');
			let viewTagh5Info = document.createElement('h5');
			let viewTagPInfo = document.createElement('p');
			let viewTagSpanInfo = document.createElement('span');

			let tagUl = document.createElement('ul');
			let tagLi = document.createElement('li');
			let tagFigurePoke = document.createElement('figure');
			let tagImgPoke = document.createElement('img');
			let tagDivInfo = document.createElement('div');
			let tagPInfo = document.createElement('p');
			let tagSpanInfo = document.createElement('span');
			let tagh5Info = document.createElement('h5');
			let tagDivAbilitys1 = document.createElement('div');			
			let tagSpanAbilitys1 = document.createElement('span');
			let tagDivAbilitys2 = document.createElement('div');			
			let tagSpanAbilitys2 = document.createElement('span');

		
						
			for(let i = 2; i>0;i--){
				if(i == 2){
					let ind = getRandomInt(1, 4);
					$('#btn'+ ind).val(pokeID).html(nomePoke);
					let pokeFields = "https://pokeapi.co/api/v2/pokemon/";
					
					setTimeout(()=> {
						requestPokeInfo(String(pokeFields + pokeID));
					},2000);
					
				}else{
					$('#divChoiceBtn button').each(function(index, element) {
						if(element.value == ""){
							let provId = getRandomInt(min, max);
							if(provId != pokeID){
								let nomePoke1 = pokemon.results[provId-1].name;
								$('#btn'+ (index+1)).val(provId).html(nomePoke1);
							}else{
								provId = provId+1;
								let nomePoke2 = pokemon.results[provId-1].name; 
								$('#btn'+ (index+1)).val(provId).html(nomePoke2);
							}
						}
					});				
				}
			}
			
			

			$('button').click(function(){
				let valor = $(this).val();
				let nome = $(this).attr('name');
				let textname = $(this).text();
				console.log('valor: '+ valor + ' e name: '+ nome + ' e Texto: ' + textname );

				if(nomePoke == textname){
					console.log('Voce acertou!');

					let imgPoke = pokeAbilitys.sprites.front_default;	
                /************************** Criando View do Game ***************************/
					viewDivShowPokemon.setAttribute('class','viewDivShowPokemon');
					viewTagDivImg.setAttribute('class','viewDivImg');
					viewTagFigure.setAttribute('class','viewFigure');
					viewTagImg.setAttribute('src',imgPoke);
					viewTagImg.setAttribute('class','viewImgGame');
					viewTagDivInfo.setAttribute('class','viewDivInfo');
					viewTagh5Info.setAttribute('class','viewH5Info');
					viewTagPInfo.setAttribute('class','viewPInfo');
					viewTagSpanInfo.setAttribute('class','viewTagSpanInfo');

					viewDivShowPokemon.append(viewTagDivImg);
					viewDivShowPokemon.append(viewTagDivInfo);
					viewTagDivImg.append(viewTagFigure);
					viewTagFigure.append(viewTagImg);
					viewTagDivInfo.append(viewTagh5Info);
					viewTagDivInfo.append(viewTagSpanInfo);

					imgConteiner.appendChild(viewDivShowPokemon);
					
				/******************************* Criando Pokedex ******************************/
					tagUl.setAttribute('class','pokedexResults');
					tagLi.setAttribute('class','figures');
					tagImgPoke.setAttribute('src',imgPoke);
					tagImgPoke.setAttribute('class','imgPokedex');
					tagDivInfo.setAttribute('class','div-poke-info');
					tagPInfo.setAttribute('class','id-poke-info');
					tagSpanInfo.setAttribute('class','id-number');
					tagDivAbilitys1.setAttribute('class','abilitys1');					
					tagDivAbilitys2.setAttribute('class','abilitys2');

					tagUl.append(tagLi);
					tagLi.append(tagFigurePoke);
					tagFigurePoke.append(tagImgPoke);
					tagLi.append(tagDivInfo);
					tagDivInfo.append(tagPInfo);
					tagDivInfo.append(tagh5Info);
					tagPInfo.append(tagSpanInfo);
					tagDivInfo.append(tagDivAbilitys1);
					tagDivInfo.append(tagDivAbilitys2);
					tagDivAbilitys1.append(tagSpanAbilitys1);
					tagDivAbilitys2.append(tagSpanAbilitys2);

					container.appendChild(tagUl);

				}else{
					console.log('Voce errouuuuu!');
				}
			});

			

			
		},1000);
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
	try {
		await fetch(url)
		.then(response => {
			// valida se a requisição falhou
			if (!response.ok) {
				return new Error('falhou a requisição') // cairá no catch da promise
			}	
			// verificando pelo status
			if (response.status === 404) {
				return new Error('não encontrou qualquer resultado');
			}
			return response.json();})
		.then(data => {
			if(url == baseUrl){
				pokemon = data;
			}
			else{
				pokeAbilitys = data;	
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

// async function func1() {
// 	await func1();
// 	console.log(`Executando func1`);
  
// 	await func2();
// 	console.log(`Executando func2`);
  
// 	await func3();
// 	console.log('Executando func3');
//   }