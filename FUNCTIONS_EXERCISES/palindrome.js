let permuteChars = (message) => {

    let newWord= "";

    for (let i=message.length-1; i>=0; i--) {
        
        newWord=newWord+message[i];
    }

    if (newWord === message) {

        return true;

    } else {

        return false;
    }
}
