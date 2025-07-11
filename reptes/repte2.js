function filterArrayEvenNumbers(arrayNumbers) {
    return arrayNumbers.filter(number => number % 2 === 0)
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