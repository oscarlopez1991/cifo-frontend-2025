//Què heu de programar? Una funció que rebi dos paràmetres: un array i un número. I que retorni un resultat booleà
// informant si l'element de l'array situat a la posició indicada pel número (entesa en llenguatge natural) és o no un
// número enter

function isIntegerAtPosition(arr, position) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("First argument must be a non-empty array");
    }

    if (!Number.isInteger(position) || position <= 0) {
        throw new Error("Second argument must be a positive integer")
    }

    return Number.isInteger(arr[position - 1]);
}