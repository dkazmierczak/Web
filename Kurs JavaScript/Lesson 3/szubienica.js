var sentence = "Bez pracy nie ma kołaczy";
sentence = sentence.toUpperCase();

var size = sentence.length;
var howManyMiss = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var sentence1 = "";

for(i=0;i<size;i++){
	if(sentence.charAt(i) == " ")
		sentence1 = sentence1 + " ";
	else
		sentence1 = sentence1 + "-";
}

function write_sentence() {
	document.getElementById("board").innerHTML = sentence1;
}

window.onload = start;

var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start(){
	
	var div_content = "";
	
	for(i=0;i<35;i++){
		
		var element = "let"+i;		
		div_content = div_content + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
		if((i+1)%7==0)
			div_content = div_content + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alphabet").innerHTML = div_content;
	
	write_sentence();
}

String.prototype.setChar = function(place, charToSet){
	if(place>this.length-1)
		return this.toString();
	else 
		return this.substr(0, place) + charToSet + this.substr(place+1);
}

function check(number){
	
	var hitted = false;
	
	for(i=0;i<size;i++){
		if(sentence.charAt(i)==letters[number]){
			sentence1 = sentence1.setChar(i,letters[number]);
			hitted = true;
		}
	}
	
	if(hitted == true){
		yes.play();
		var element = "let"+number;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		write_sentence();
	}
	else{
		no.play();
		var element = "let"+number;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");
		
		//missed hit
		howManyMiss++;
		var picture = "img/s" + howManyMiss + ".jpg";
		document.getElementById("gallows").innerHTML = '<img src="'+picture+'"alt="" />';
	}
	
	//win
	if(sentence == sentence1)
		document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: "+sentence+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	
	//loss
	if(howManyMiss>=9)
		document.getElementById("alphabet").innerHTML = "Przegrana! Prawidłowe hasło: "+sentence+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}







