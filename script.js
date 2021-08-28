let ind;
let nomePoke;
let pokeID;
let pokeAbilitys = [];
let pokedex =  [ ];
let pokedex1 = [];
let pokedexCard = [];
let ordem = [];
let pushImg = [];
let count = 0;
let countError = 0;
let cardNumber = 0;

// limita pesquisa de Pokemons
let min = 1;

//API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0';

$(document).ready(() => {
	getPokemonData();
	$('.c-loader').show();

	setTimeout(()=>{
		$('.c-loader').hide();
		$('#iniGame').show();
		$('#divLogo').show();
	},8000);

	$('#divLogo').click(event => {
		event.preventDefault();
		$('.homeScreem').hide();
		$('.c-loader1').show();
		
		setTimeout(()=>{
			$('.c-loader1').hide();
			$('.divShowpokemon').show();
			$('#divChoiceBtn').show();
		},2000);

		$('.gameScreem').show();
		preencheBtn1();
	});
});

async function getPokemonData() {
    try {
        const response = await callService(baseUrl);
        const { results } = response;

        for (var i = 0; i < results.length ; i++) {
			pokeAbilitys[i] = await callService(results[i].url);
			console.log(pokeAbilitys);
		}
		for(let o = 0; o < pokeAbilitys.length; o++){
			pokedex1[o] = pokeAbilitys[o].id;
			console.log(pokedex1);
		}
    } catch(error) {
        console.log('Falha na consulta', error);
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

function preencheBtn1(){
	limparBtnView();
	try{
		if(count == 0){
			pokeID = getRandomInt(min,pokeAbilitys.length);
			$('.pokeID').val(pokeID);
			nomePoke = pokeAbilitys[pokeID].name;
			ind = getRandomInt(1,4);
			$('#btn' + ind).val(pokeID).html(nomePoke);
			preencheBtn2();
		}else{
			let provIdBtn1 = getRandomInt(min,pokedex1.length)-1;
			pokeID = pokedex1[provIdBtn1];
			$('.pokeID').val(pokeID);
			nomePoke = pokeAbilitys[pokeID].name;
			ind = getRandomInt(1, 4);
			$('#btn'+ ind).val(pokeID).html(nomePoke);
			preencheBtn2();
		}	
	}catch (error){
		console.log(error);
		if(count == 0){
			pokeID = getRandomInt(min,pokeAbilitys.length);
			$('.pokeID').val(pokeID);
			nomePoke = pokeAbilitys[pokeID].name;
			ind = getRandomInt(1,4);
			$('#btn' + ind).val(pokeID).html(nomePoke);
			preencheBtn2();
		}else{
			let provIdBtn1 = getRandomInt(min,pokedex1.length)-1;
			pokeID = pokedex1[provIdBtn1];
			$('.pokeID').val(pokeID);
			nomePoke = pokeAbilitys[pokeID].name;
			ind = getRandomInt(1, 4);
			$('#btn'+ ind).val(pokeID).html(nomePoke);
			preencheBtn2();
		}
	}	
}

function limparBtnView(){
	$('#divChoiceBtn button').each(function(index) {
		$('#btn'+ (index+1)).val('');
		$('#btn'+ (index+1)).text('');
	});	
	$('.viewH5Info').text('');
	$('.viewH5Info').val('');
	$('.viewSpanInfo').text('');
	$('.viewSpanInfo').val('');
	$('.viewImgGame').css('filter','brightness(0)');
}

function preencheBtn2(){
	$('#divChoiceBtn button').each(function(index,element) {
		if(element.value == ""){
			let provId = getRandomInt(min, pokeAbilitys.length)-1;
			let btnP1 = $('#btn1').val();
			let btnP2 = $('#btn2').val();
			let btnP3 = $('#btn3').val();
			let btnP4 = $('#btn4').val();
			
			if( btnP1 != provId && btnP2 != provId && btnP3 != provId && btnP4 != provId){
				try{
					let nomePoke1 = pokeAbilitys[provId].name;
					if(nomePoke1 != '' || nomePoke1 != null || nomePoke1 != undefined){
						$('#btn'+ (index+1)).val(provId).html(nomePoke1);
					}				
				}catch(error){
					nomePoke1 = pokeAbilitys[provId].name;
					$('#btn'+ (index+1)).val(provId).html(nomePoke1);
				}				
			}else{
				for(let b = 0; b < pokeAbilitys.length; b++){
					provId = getRandomInt(min, pokeAbilitys.length)-1;
					if( btnP1 != provId && btnP2 != provId && btnP3 != provId && btnP4 != provId){
						let nomePoke1 = pokeAbilitys[provId].name;
						$('#btn'+ (index+1)).val(provId).html(nomePoke1);
						break;
					}
				}
			}
		}
	});	
	if(count == 0 && countError == 0){
		viewGame();	
	}else{
		$('.viewImgGame').attr("src", `${pokeAbilitys[pokeID].sprites.front_default}`);		
		escolherBtnClick();
	}	
}

function escolherBtnClick(element){
	let textname = element.innerHTML;
	if(nomePoke == textname){
		console.log('Voce acertou!');
		$('.viewImgGame').css('filter','brightness(1)');
		$('.viewH5Info').text(`${pokeAbilitys[pokeID].id}`);
		$('.viewH5Info').val(`${pokeAbilitys[pokeID].id}`);
		$('.viewSpanInfo').text(`${pokeAbilitys[pokeID].name}`);
		$('.viewSpanInfo').val(`${pokeAbilitys[pokeID].name}`);
		setTimeout(()=>{
			cardPokedex();
		}, 3000);
	}else{
		console.log('Voce errouuuuu!');
		countError++;
		preencheBtn1();					
	}	
}

function contCaract(count){
	// milhar: 1000
	// centena: 100
	// dezena:   10
	// unidade:   1

	let c = count.toString();
	c += c.length;

	if(c > 2){
		cardNumber = c;
	}if(c > 1){
		c = "0" + count;
		cardNumber = c;
	}if(c > 0 ){
		c = "00" + count;
		cardNumber = c;
	}
}

function ordenaNum(a,b){
	return a-b;
}

function contaCard(){
	
	$('.cardCount').text(`${pokedexCard.length}`);
	count ++;
	preencheBtn1();
}

// Busca numero aleatorio
function getRandomInt( min , max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;  
}

function ordenador(){
	console.log('entrou no ordenador');
	$('ul[name^="cardUl"]').each(function(index, element){
		ordem[index] = element.children[0].children[1].children[0].children[0].children[0].attributes[3].value;
		console.log(element);
		console.log(ordem);
		pokedex =  parseInt(ordem[index])-1;
		console.log(pokedex);
		for(let m = 0; m < ordem.length; m++){
			if(pokedex1.indexOf(pokedex) > -1){
				pokedexCard.push(pokedex);
				pokedex1.splice(pokedex1.indexOf(pokedex), 1 );
			}
		}
		pokedexCard.sort(ordenaNum);
	});
	for(let i = 0; i < pokedexCard.length; i++){
		$('.cardImgPoke___' + i).attr('src',`${pokeAbilitys[pokedexCard[i]].sprites.front_default}`);
		$('.cardSpanInfo___' + i).val(`${pokeAbilitys[pokedexCard[i]].id}`);
		$('.cardH5Info' + i).val('src',`${pokeAbilitys[pokedexCard[i]].name}`);
		$('.cardSpanInfo' + i).val('src',`${pokeAbilitys[pokedexCard[i]].id}`);
		$('.cardH5Info' + i).val('src',`${pokeAbilitys[pokedexCard[i]].name}`);
	}
	contaCard();
}

function viewGame(){

	/************************** Criando View do Game ***************************/

	let imgContainer = document.querySelector('.divShowpokemon');

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
	viewTagImg.setAttribute('class','viewImgGame');
	viewTagImg.setAttribute('src',`${pokeAbilitys[pokeID].sprites.front_default}`);
	viewTagDivInfo.setAttribute('class','viewDivInfo');
	viewTagDivInfo.setAttribute('style','display: none');
	viewTagh5Info.setAttribute('class','viewH5Info');
	viewTagh5Info.setAttribute('value','');
	viewTagPInfo.setAttribute('class','viewPInfo');
	viewTagSpanInfo.setAttribute('class','viewSpanInfo');
	viewTagSpanInfo.setAttribute('value','');
	
	viewDivShowPokemon.append(viewTagDivImg);
	viewDivShowPokemon.append(viewTagDivInfo);
	viewTagDivImg.append(viewTagFigure);
	viewTagFigure.append(viewTagImg);
	viewTagDivInfo.append(viewTagh5Info);
	viewTagDivInfo.append(viewTagSpanInfo);
	
	imgContainer.appendChild(viewDivShowPokemon);
}

function cardPokedex(){
	
	/******************************* Criando Pokedex ******************************/

	let container = document.querySelector('.container-cards');

	const cardTagUl = document.createElement('ul');
	const cardTagLi = document.createElement('li');
	const cardTagDivFigure = document.createElement('div');
	const cardTagFigurePoke = document.createElement('figure');
	const cardTagImgPoke = document.createElement('img');
	const cardTagDivInfo = document.createElement('div');
	const cardTagDivPInfo = document.createElement('div');
	const cardTagPInfo = document.createElement('p');
	const cardTagSpanInfo = document.createElement('span');
	const cardTagDivH5Info = document.createElement('div');
	const cardTagh5Info = document.createElement('h5');
	const cardTagDivAbilitys1 = document.createElement('div');			
	const cardTagSpanAbilitys1 = document.createElement('span');
	const cardTagDivAbilitys2 = document.createElement('div');			
	const cardTagSpanAbilitys2 = document.createElement('span');

	cardLineUl = 		'cardUl___'+count;
	cardLineLi = 		'cardLi___'+count;
	cardLineDFigure = 	'cardDivFigure___'+count;
	cardLineFigure = 	'cardFigure___'+count;
	cardLineImg = 		'cardImgPoke___'+count;
	cardLineDInfo = 	'cardDivInfo___'+count;
	cardLineDPInfo =	'cardDivPInfo___'+count;
	cardLineDH5Info = 	'cardDivH5Info___'+count;
	cardLineDAbil1 =	'cardDivAbilitys1___'+count;
	cardLineDAbil2 = 	'cardDivAbilitys2___'+count;
	cardLinePInfo =		'cardPInfo___'+count;
	cardLineSInfo =		'cardSpanInfo___'+count;
	cardLineH5Info =	'cardH5Info___'+count;

	cardTagUl.setAttribute('class',`${cardLineUl}`);
	cardTagUl.setAttribute('name',`${cardLineUl}`);
	cardTagUl.setAttribute('id',`${cardLineUl}`);
	cardTagLi.setAttribute('class',`${cardLineLi}`);
	cardTagLi.setAttribute('name',`${cardLineLi}`);
	cardTagLi.setAttribute('id',`${cardLineLi}`);
	cardTagDivFigure.setAttribute('class',`${cardLineDFigure}`);
	cardTagDivFigure.setAttribute('name',`${cardLineDFigure}`);
	cardTagDivFigure.setAttribute('id',`${cardLineDFigure}`);
	cardTagFigurePoke.setAttribute('class',`${cardLineFigure}`);
	cardTagFigurePoke.setAttribute('name',`${cardLineFigure}`);
	cardTagFigurePoke.setAttribute('id',`${cardLineFigure}`);
	cardTagImgPoke.setAttribute('src',`${pokeAbilitys[pokeID].sprites.front_default}`);
	cardTagImgPoke.setAttribute('class',`${cardLineImg}`);
	cardTagImgPoke.setAttribute('name',`${cardLineImg}`);
	cardTagImgPoke.setAttribute('id',`${cardLineImg}`);
	cardTagDivInfo.setAttribute('class',`${cardLineDInfo}`);
	cardTagDivInfo.setAttribute('name',`${cardLineDInfo}`);
	cardTagDivInfo.setAttribute('id',`${cardLineDInfo}`);
	cardTagDivPInfo.setAttribute('class',`${cardLineDPInfo}`);
	cardTagDivPInfo.setAttribute('name',`${cardLineDPInfo}`);
	cardTagDivPInfo.setAttribute('id',`${cardLineDPInfo}`);
	cardTagDivH5Info.setAttribute('class',`${cardLineDH5Info}`);
	cardTagDivH5Info.setAttribute('name',`${cardLineDH5Info}`);
	cardTagDivH5Info.setAttribute('id',`${cardLineDH5Info}`);
	cardTagDivAbilitys1.setAttribute('class',`${cardLineDAbil1}`);
	cardTagDivAbilitys1.setAttribute('name',`${cardLineDAbil1}`);
	cardTagDivAbilitys1.setAttribute('id',`${cardLineDAbil1}`);
	cardTagDivAbilitys1.setAttribute('value',`${pokeAbilitys[pokeID].abilities[0].ability.name}`);
	cardTagDivAbilitys1.innerHTML = `${pokeAbilitys[pokeID].abilities[0].ability.name}`;					
	cardTagDivAbilitys2.setAttribute('class',`${cardLineDAbil2}`);
	cardTagDivAbilitys2.setAttribute('name',`${cardLineDAbil2}`);
	cardTagDivAbilitys2.setAttribute('id',`${cardLineDAbil2}`);
	cardTagDivAbilitys2.setAttribute('value',`${pokeAbilitys[pokeID].abilities[1].ability.name}`);
	cardTagDivAbilitys2.innerHTML = `${pokeAbilitys[pokeID].abilities[1].ability.name}`;
	cardTagPInfo.setAttribute('class',`${cardLinePInfo}`);
	cardTagPInfo.setAttribute('name',`${cardLinePInfo}`);
	cardTagPInfo.setAttribute('id',`${cardLinePInfo}`);
	cardTagSpanInfo.setAttribute('class',`${cardLineSInfo}`);
	cardTagSpanInfo.setAttribute('name',`${cardLineSInfo}`);
	cardTagSpanInfo.setAttribute('id',`${cardLineSInfo}`);
	cardTagSpanInfo.setAttribute('value',`${pokeAbilitys[pokeID].id}`);
	cardTagSpanInfo.innerHTML = `${pokeAbilitys[pokeID].id}`;
	cardTagh5Info.setAttribute('class',`${cardLineH5Info}`);
	cardTagh5Info.setAttribute('name',`${cardLineH5Info}`);
	cardTagh5Info.setAttribute('id',`${cardLineH5Info}`);
	cardTagh5Info.setAttribute('value',`${pokeAbilitys[pokeID].name}`);
	cardTagh5Info.innerHTML = `${pokeAbilitys[pokeID].name}`;
	
	cardTagUl.append(cardTagLi);
	cardTagLi.append(cardTagDivFigure);
	cardTagLi.append(cardTagDivInfo);	
	cardTagDivFigure.append(cardTagFigurePoke);
	cardTagFigurePoke.append(cardTagImgPoke);
	
	cardTagDivInfo.append(cardTagDivPInfo);
	cardTagDivPInfo.append(cardTagPInfo);
	cardTagPInfo.append(cardTagSpanInfo);

	cardTagDivInfo.append(cardTagDivH5Info);
	cardTagDivH5Info.append(cardTagh5Info);
		
	cardTagDivInfo.append(cardTagDivAbilitys1);
	cardTagDivAbilitys1.append(cardTagSpanAbilitys1);

	cardTagDivInfo.append(cardTagDivAbilitys2);	
	cardTagDivAbilitys2.append(cardTagSpanAbilitys2);

	container.appendChild(cardTagUl);

	$('.container-cards').show();

	ordenador();
}

//pokeAbilitys[0].types[0].type.name pegar nome 1º tipo
//
//pokeAbilitys[0].types[1].type.name pegar nome 2º tipo