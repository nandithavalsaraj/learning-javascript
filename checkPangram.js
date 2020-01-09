/*
WAP to check if an input string is pangram
*/
function isPangram(sentence){
 for (let c of 'abcdefghijklmnopqrstuvwxyz'){
 	if(sentence.indexOf(c) == -1){
 		return false;
 	}
 }
}