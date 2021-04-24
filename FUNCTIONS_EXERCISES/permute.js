let permuteChars = (message) => {

    if(typeof message !== "string" || !message) {
        
        return "This is not a string!";

    } else if (message.length < 2) {

        return message;
    }

    let permutations = [];

    for (let i=0; i<message.length; i++) {

        let actualChar = message[i];
        let remainingWord = replace(i, message);
     
        for (let result of permuteChars(remainingWord)) {

            permutations.push(actualChar + result);
        }

    }

    return removeDuplicates(permutations);

}



let replace = (index, string) => {

    return string.substring(0, index) + string.substring(index+1, string.length);
}

let removeDuplicates = (array) => {

    return array.filter((position, duplicate) => array.indexOf(position) === duplicate);

}







