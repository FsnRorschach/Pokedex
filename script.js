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
let card;
let power1;
let power2;
let container = document.querySelector('.container-cards');
let imgContainer = document.querySelector('.divShowpokemon');

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
	}	
}

function escolherBtnClick(element){
	console.log(element);
	let textname = element.innerHTML;
	if(nomePoke == textname){
		console.log('Voce acertou!');
		$('.viewImgGame').css('filter','brightness(1)');
		$('.viewH5Info').text(`${pokeAbilitys[pokeID].id}`);
		$('.viewH5Info').val(`${pokeAbilitys[pokeID].id}`);
		$('.viewSpanInfo').text(`${pokeAbilitys[pokeID].name}`);
		$('.viewSpanInfo').val(`${pokeAbilitys[pokeID].name}`);
		count++;
		if(count == 1){
			$('.container-cards').show();
			setTimeout(()=>{
				cardPokedex();
			}, 2000);
		}else{
			setTimeout(()=>{
				cardPokedex();
			}, 2000);
		}
	}else{
		console.log('Voce errouuuuu!');
		countError++;
		preencheBtn1();					
	}	
}

function contCaract(value){
	// milhar: 1000
	// centena: 100
	// dezena:   10
	// unidade:   1
	let c = value.toString();

	if(c.length > 2){
		return c;
	}
	if(c.length > 1){
		c = "0" + c;
		return c;
	}if(c.length > 0 ){
		c = "00" + c;
		return c;
	}
}

function ordenaNum(a,b){
	return a-b;
}

function contaCard(){
	
	$('.cardCount').text(`${pokedexCard.length}`);
	
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
		$('.cardSpanInfo___' + i).text(`${contCaract(pokeAbilitys[pokedexCard[i]].id)}`);
		$('.cardH5Info' + i).text(`${pokeAbilitys[pokedexCard[i]].name}`);
		$('.cardSpanInfo' + i).val(`${pokeAbilitys[pokedexCard[i]].id}`);
		$('.cardH5Info' + i).val(`${pokeAbilitys[pokedexCard[i]].name}`);

		let power3;
		let power4;
 		try {
			power3 = pokeAbilitys[pokeID].abilities[0].ability.name;
		} catch (error) {
			power3 = "";
			console.log(error);
		}
		try {
			power4 = pokeAbilitys[pokeID].abilities[1].ability.name;
		} catch (error) {
			power4 = "";
			console.log(error);
		}

		abilityCor(power3, power4);
	}

	contaCard();
}

function viewGame(){

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

/******************************* Criando Pokedex ******************************/
function cardPokedex(){
	
	try {
		power1 = pokeAbilitys[pokeID].abilities[0].ability.name;
	} catch (error) {
		power1 = "";
		console.log(error);
	}
	try {
		power2 = pokeAbilitys[pokeID].abilities[1].ability.name;
	} catch (error) {
		power2 = "";
		console.log(error);
	}

	card = createCard();
	container.innerHTML += card;
	ordenador();
}

function abilityCor(ability1, ability2){
	if(ability1 == "overgrow"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability1 == "chlorophyll"){
		$('#cardDivAbilitys1_'+count).css('background-color','pink');
	}
	if(ability2 == "chlorophyll"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "blaze"){
		$('#cardDivAbilitys1_'+count).css('background-color','orange');
	}
	if(ability2 == "solar-power"){
		$('#cardDivAbilitys2_'+count).css('background-color','yellow');
	}
	if(ability1 == "torrent"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "rain-dish"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "shield-dust"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability1 == "run-away"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "run-away"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability1 == "shed-skin"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability2 == "shed-skin"){
		$('#cardDivAbilitys2_'+count).css('background-color','green');
	}
	if(ability1 == "compound-eyes"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability2 == "tinted-lens"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "swarm"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability2 == "sniper"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "keen-eye"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "tangled-feet"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "guts"){
		$('#cardDivAbilitys1_'+count).css('background-color','cream');
	}
	if(ability2 == "guts"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}
	if(ability1 == "intimidate"){
		$('#cardDivAbilitys1_'+count).css('background-color','pink');
	}
	if(ability1 == "static"){
		$('#cardDivAbilitys1_'+count).css('background-color','yellow');
	}
	if(ability2 == "static"){
		$('#cardDivAbilitys2_'+count).css('background-color','yellow');
	}
	if(ability1 == "lightning-rod"){
		$('#cardDivAbilitys1_'+count).css('background-color','mustard');
	}
	if(ability2 == "lightning-rod"){
		$('#cardDivAbilitys2_'+count).css('background-color','mustard');
	}
	if(ability1 == "sand-veil"){
		$('#cardDivAbilitys1_'+count).css('background-color','brown');
	}
	if(ability2 == "sand-rush"){
		$('#cardDivAbilitys2_'+count).css('background-color','khaki');
	}
	if(ability1 == "poison-point"){
		$('#cardDivAbilitys1_'+count).css('background-color','lilac');
	}
	if(ability2 == "rivalry"){
		$('#cardDivAbilitys2_'+count).css('background-color','baby pink');
	}
	if(ability1 == "cute-charm"){
		$('#cardDivAbilitys1_'+count).css('background-color','violet');
	}
	if(ability2 == "magic-guard"){
		$('#cardDivAbilitys2_'+count).css('background-color','violet');
	}
	if(ability1 == "flash-fire"){
		$('#cardDivAbilitys1_'+count).css('background-color','orange');
	}
	if(ability2 == "flash-fire"){
		$('#cardDivAbilitys2_'+count).css('background-color','orange');
	}
	if(ability2 == "drought"){
		$('#cardDivAbilitys2_'+count).css('background-color','caramel');
	}
	if(ability2 == "competitive"){
		$('#cardDivAbilitys2_'+count).css('background-color','purple');
	}
	if(ability1 == "inner-focus"){
		$('#cardDivAbilitys1_'+count).css('background-color','pink');
	}
	if(ability2 == "inner-focus"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability2 == "infiltrator"){
		$('#cardDivAbilitys2_'+count).css('background-color','turquoise');
	}
	if(ability1 == "stench"){
		$('#cardDivAbilitys1_'+count).css('background-color','pink');
	}
	if(ability2 == "stench"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "effect-spore"){
		$('#cardDivAbilitys1_'+count).css('background-color','lilac');
	}
	if(ability2 == "effect-spore"){
		$('#cardDivAbilitys2_'+count).css('background-color','lilac');
	}
	if(ability2 == "dry-skin"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "compound-eyes"){
		$('#cardDivAbilitys1_'+count).css('background-color','green');
	}
	if(ability2 == "arena-trap"){
		$('#cardDivAbilitys2_'+count).css('background-color','mustard');
	}
	if(ability1 == "pickup"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "technician"){
		$('#cardDivAbilitys2_'+count).css('background-color','baby aquamarine');
	}
	if(ability1 == "limber"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability1 == "damp"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "damp"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "cloud-nine"){
		$('#cardDivAbilitys2_'+count).css('background-color','baby aquamarine');
	}
	if(ability1 == "vital-spirit"){
		$('#cardDivAbilitys1_'+count).css('background-color','orange');
	}
	if(ability2 == "vital-spirit"){
		$('#cardDivAbilitys2_'+count).css('background-color','orange');
	}
	if(ability2 == "anger-point"){
		$('#cardDivAbilitys2_'+count).css('background-color','mustard');
	}
	if(ability1 == "water-absorb"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "synchronize"){
		$('#cardDivAbilitys1_'+count).css('background-color','bright pink');
	}
	if(ability2 == "inner-focus"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability2 == "no-guard"){
		$('#cardDivAbilitys2_'+count).css('background-color','mustard');
	}
	if(ability2 == "gluttony"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "clear-body"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "liquid-ooze"){
		$('#cardDivAbilitys1_'+count).css('background-color','pink');
	}
	if(ability1 == "rock-head"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "rock-head"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability2 == "sturdy"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}
	if(ability1 == "oblivious"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "oblivious"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "own-tempo"){
		$('#cardDivAbilitys2_'+count).css('background-color','bright pink');
	}
	if(ability1 == "magnet-pull"){
		$('#cardDivAbilitys1_'+count).css('background-color','yellow');
	}
	if(ability1 == "early-bird"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "early-bird"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "thick-fat"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "hydration"){
		$('#cardDivAbilitys1_'+count).css('background-color','light aquamarine');
	}
	if(ability2 == "sticky-hold"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "shell-armor"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "shell-armor"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "skill-link"){
		$('#cardDivAbilitys2_'+count).css('background-color','light aquamarine');
	}
	if(ability1 == "levitate"){
		$('#cardDivAbilitys1_'+count).css('background-color','violet');
	}
	if(ability1 == "cursed-body"){
		$('#cardDivAbilitys1_'+count).css('background-color','violet');
	}
	if(ability1 == "insomnia"){
		$('#cardDivAbilitys1_'+count).css('background-color','bright pink');
	}
	if(ability2 == "forewarn"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability1 == "hyper-cutter"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "soundproof"){
		$('#cardDivAbilitys1_'+count).css('background-color','yellow');
	}
	if(ability2 == "harvest"){
		$('#cardDivAbilitys2_'+count).css('background-color','pink');
	}
	if(ability2 == "reckless"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}	
	if(ability2 == "iron-fist"){
		$('#cardDivAbilitys2_'+count).css('background-color','mustard');
	}
	if(ability1 == "own-tempo"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability1 == "natural-cure"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "natural-cure"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability2 == "serene-grace"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}
	if(ability2 == "leaf-guard"){
		$('#cardDivAbilitys2_'+count).css('background-color','green');
	}
	if(ability2 == "scrappy"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability1 == "swift-swim"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "water-veil"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "illuminate"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "filter"){
		$('#cardDivAbilitys2_'+count).css('background-color','bright pink');
	}
	if(ability1 == "flame-body"){
		$('#cardDivAbilitys1_'+count).css('background-color','orange');
	}
	if(ability2 == "flame-body"){
		$('#cardDivAbilitys2_'+count).css('background-color','orange');
	}
	if(ability2 == "mold-breaker"){
		$('#cardDivAbilitys2_'+count).css('background-color','green');
	}
	if(ability2 == "rattled"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "moxie"){
		$('#cardDivAbilitys2_'+count).css('background-color','light aquamarine');
	}
	if(ability2 == "imposter"){
		$('#cardDivAbilitys2_'+count).css('background-color','orange');
	}
	if(ability2 == "adaptability"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability2 == "hydration"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "volt-absorb"){
		$('#cardDivAbilitys1_'+count).css('background-color','yellow');
	}
	if(ability2 == "quick-feet"){
		$('#cardDivAbilitys2_'+count).css('background-color','yellow');
	}
	if(ability1 == "trace"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "download"){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
	if(ability2 == "battle-armor"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "pressure"){
		$('#cardDivAbilitys1_'+count).css('background-color','cream');
	}
	if(ability2 == "pressure"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}
	if(ability1 == "immunity"){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == "thick-fat"){
		$('#cardDivAbilitys2_'+count).css('background-color','cream');
	}
	if(ability2 == "snow-cloak"){
		$('#cardDivAbilitys2_'+count).css('background-color','light aquamarine');
	}
	if(ability2 == "marvel-scale"){
		$('#cardDivAbilitys2_'+count).css('background-color','aquamarine');
	}
	if(ability1 == "inner-focus"){
		$('#cardDivAbilitys1_'+count).css('background-color','aquamarine');
	}
	if(ability2 == "multiscale"){
		$('#cardDivAbilitys2_'+count).css('background-color','orange');
	}
	if(ability2 == "unnerve"){
		$('#cardDivAbilitys2_'+count).css('background-color','bright pink');
	}
	if(ability1 == ""){
		$('#cardDivAbilitys1_'+count).css('background-color','grey');
	}
	if(ability2 == ""){
		$('#cardDivAbilitys2_'+count).css('background-color','grey');
	}
}

function createCard() {
	card = `
			<ul class="cardUl" name="cardUl_${count}" id="cardUl_${count}">
				<li class="cardLi" name="cardLi_${count}" id="cardLi_${count}">
					<div class="cardDivFigure" name="cardDivFigure_${count}" id="cardDivFigure_${count}">
						<figure class="cardFigure" name="cardFigure_${count}" id="cardFigure_${count}">
							<img src="${pokeAbilitys[pokeID].sprites.front_default}" alt="${pokeAbilitys[pokeID].name}" class="cardImgPoke" name="cardImgPoke_${count}" id="cardImgPoke_${count}">
						</figure>
					</div>
					<div class="cardDivInfo" name="cardDivInfo_${count}" id="cardDivInfo_${count}"><div class="cardDivPInfo" name="cardDivPInfo_${count}" id="cardDivPInfo_${count}">
						<p class="cardPInfo" name="cardPInfo_${count}" id="cardPInfo_${count}"><span class="cardSpanInfo" name="cardSpanInfo_${count}" id="cardSpanInfo_${count}" value="${pokeAbilitys[pokeID].id}">${contCaract(pokeAbilitys[pokeID].id)}</span></p>
					</div>
					<div class="cardDivH5Info" name="cardDivH5Info_${count}" id="cardDivH5Info_${count}">
						<h5 class="cardH5Info" name="cardH5Info_${count}" id="cardH5Info_${count}" value="${pokeAbilitys[pokeID].name}">
							${pokeAbilitys[pokeID].name}
						</h5>
					</div>
					<div class="cardDivAbilitys1" name="cardDivAbilitys1_${count}" id="cardDivAbilitys1_${count}" value="${power1}">
						<span>
							${power1}
						</span>
					</div>
					<div class="cardDivAbilitys2" name="cardDivAbilitys2_${count}" id="cardDivAbilitys2_${count}" value="${power2}">
						<span>
							${power2}
						</span>
					</div>
					</div>
				</li>
			</ul>
			`;
	return card;
  }

