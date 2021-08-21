$(document).ready(() => {
	
	$('#initGame').click(event => {
		event.preventDefault();

		$('.homeScreem').hide();

		$('.gameScreem').show();

		getPokemonData();
			setTimeout(function(){
			
				pokeID = getRandomInt(min,max)-1;
				let nomePoke = pokeAbilitys[pokeID].name;

				let elist = document.querySelectorAll('button');
				let ind = getRandomInt(1, 4);
				$('#btn'+ ind).val(pokeID).html(nomePoke);
				
				$('#divChoiceBtn button').each(function(index,element) {
					if(element.value == ""){
						let provId = getRandomInt(min, max)-1;
						if(provId != pokeID){
							let nomePoke1 = pokeAbilitys[provId].name;
							$('#btn'+ (index+1)).val(provId).html(nomePoke1);
						}else{
							provId = provId+1;
							let nomePoke2 = pokeAbilitys[provId].name; 
							$('#btn'+ (index+1)).val(provId).html(nomePoke2);
						}
					}
				});				
			
				viewGame(pokeID);

				$('button').click(function(){
					let valor = $(this).val();
					let nome = $(this).attr('name');
					let textname = $(this).text();
					console.log('valor: '+ valor + ' e name: '+ nome + ' e Texto: ' + textname );

					if(nomePoke == textname){
						console.log('Voce acertou!');
						$('.viewImgGame').css('filter','brightness(1)');
						cardPokedex();
						$('.container-cards ul').each(function(index,element){
							$('.cardCount').text(`${index+1}`);
				
							ordem[index] = $('.cardSpanInfo'+[index]).val();
							console.log(index);
						});
						
					}else{
						console.log('Voce errouuuuu!');						
					}
					
				});
				count ++;
				console.log(count);
				
			},1000);
	});
});

let pokeID;
let pokeAbilitys = [];
let pokemonUndefined = [];
let pokedex = [];
let ordem = [];
let count = 0;
let imgConteiner = document.querySelector('.divShowpokemon');
let container = document.querySelector('.container-cards');

// limita pesquisa de Pokemons
const min = 1;
const max = 150;

//API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0';

// Busca numero aleatorio
function getRandomInt( min , max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;  
}

async function getPokemonData() {
    try {
        const response = await callService(baseUrl);
        const { results } = response;

        for (var i = 0; i < results.length ; i++) {
            pokeAbilitys[i] = await callService(results[i].url);
        }
    } catch(err) {
        console.log('Falha na consulta', err);
    }
}

async function callService(url) {
    var response = null; 

    try {
        response = await fetch(url).then(res => res.json());
    } catch (error) {
		console.log('Erro na busca fetch da API Pokemon: ' + error.message);
	}

    return response;
}

function cardPokedex(){

	$('.container-cards').show();
	/******************************* Criando Pokedex ******************************/
	
	const cardTagUl = document.createElement('ul');
	const cardTagLi = document.createElement('li');
	const cardTagFigurePoke = document.createElement('figure');
	const cardTagImgPoke = document.createElement('img');
	const cardTagDivInfo = document.createElement('div');
	const cardTagPInfo = document.createElement('p');
	const cardTagSpanInfo = document.createElement('span');
	const cardTagh5Info = document.createElement('h5');
	const cardTagDivAbilitys1 = document.createElement('div');			
	const cardTagSpanAbilitys1 = document.createElement('span');
	const cardTagDivAbilitys2 = document.createElement('div');			
	const cardTagSpanAbilitys2 = document.createElement('span');
	
	cardTagUl.setAttribute('class','cardUl');
	cardTagLi.setAttribute('class','cardLi');
	cardTagImgPoke.setAttribute('src',`${pokeAbilitys[pokeID].sprites.front_default}`);
	cardTagImgPoke.setAttribute('class','cardImgPoke');
	cardTagDivInfo.setAttribute('class','cardDivInfo');
	cardTagPInfo.setAttribute('class','cardPInfo');
	cardTagSpanInfo.setAttribute('class','cardSpanInfo');
	cardTagSpanInfo.setAttribute('value',`${pokeAbilitys[pokeID].id}`);
	cardTagSpanInfo.innerHTML = `${pokeAbilitys[pokeID].id}`;
	cardTagh5Info.setAttribute('class','cardH5Info');
	cardTagh5Info.setAttribute('value',`${pokeAbilitys[pokeID].name}`);
	cardTagh5Info.innerHTML = `${pokeAbilitys[pokeID].name}`;
	cardTagDivAbilitys1.setAttribute('class','cardDivAbilitys1');					
	cardTagDivAbilitys2.setAttribute('class','cardDivAbilitys2');

	cardTagUl.append(cardTagLi);
	cardTagLi.append(cardTagFigurePoke);
	cardTagFigurePoke.append(cardTagImgPoke);
	cardTagLi.append(cardTagDivInfo);
	cardTagDivInfo.append(cardTagPInfo);
	cardTagDivInfo.append(cardTagh5Info);
	cardTagPInfo.append(cardTagSpanInfo);
	cardTagDivInfo.append(cardTagDivAbilitys1);
	cardTagDivInfo.append(cardTagDivAbilitys2);
	cardTagDivAbilitys1.append(cardTagSpanAbilitys1);
	cardTagDivAbilitys2.append(cardTagSpanAbilitys2);

	container.appendChild(cardTagUl);
}

function viewGame(pokeID){

	/************************** Criando View do Game ***************************/
	const viewDivShowPokemon = document.createElement('div');
	const viewTagDivImg = document.createElement('div');
	const viewTagFigure = document.createElement('figure');
	const viewTagImg = document.createElement('img');
	const viewTagDivInfo = document.createElement('div');
	const viewTagh5Info = document.createElement('h5');
	const viewTagPInfo = document.createElement('p');
	const viewTagSpanInfo = document.createElement('span');

	
	
	viewDivShowPokemon.setAttribute('class','viewDivShowPokemon');
	viewTagDivImg.setAttribute('class','viewDivImg');
	viewTagFigure.setAttribute('class','viewFigure');
	viewTagImg.setAttribute('src',`${pokeAbilitys[pokeID].sprites.front_default}`);
	viewTagImg.setAttribute('class','viewImgGame');
	viewTagDivInfo.setAttribute('class','viewDivInfo');
	viewTagh5Info.setAttribute('class','viewH5Info');
	viewTagh5Info.setAttribute('value',`${pokeAbilitys[pokeID].id}`);
	viewTagh5Info.innerHTML = `${pokeAbilitys[pokeID].id}`;
	viewTagPInfo.setAttribute('class','viewPInfo');
	viewTagSpanInfo.setAttribute('class','viewSpanInfo');
	viewTagSpanInfo.setAttribute('value',`${pokeAbilitys[pokeID].name}`);
	viewTagSpanInfo.innerHTML = `${pokeAbilitys[pokeID].name}`;

	viewDivShowPokemon.append(viewTagDivImg);
	viewDivShowPokemon.append(viewTagDivInfo);
	viewTagDivImg.append(viewTagFigure);
	viewTagFigure.append(viewTagImg);
	viewTagDivInfo.append(viewTagh5Info);
	viewTagDivInfo.append(viewTagSpanInfo);

	imgConteiner.appendChild(viewDivShowPokemon);
}