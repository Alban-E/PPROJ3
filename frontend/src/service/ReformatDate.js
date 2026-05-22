// date format => YYYY-MM-DD
// Reformat to => DD-MM-YYY
export function reformatDate(date){
    if (!date || typeof(date) !== "string"){ return "Date de sortie du jeu inconnue";}
    return date.split("-").reverse().join("/") ;
}