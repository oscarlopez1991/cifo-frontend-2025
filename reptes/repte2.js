// heu de crear una funció que rebi un únic paràmetre consistent en un array de números enters i retorni un altre array
// de números enters que inclogui únicament els que són parells en el primer array.

function filterArrayEvenNumbers(arrayNumbers) {
    return arrayNumbers.filter((number) => number % 2 === 0)
}

function filterArrayEvenNumbersManually(arrayNumbers) {
    const evenNumbers = []

    for (let i = 0; i < arrayNumbers.length; i++) {
        if (arrayNumbers[i] % 2 === 0) {
            evenNumbers.push(arrayNumbers[i])
        }
    }

    return evenNumbers
}