
export const  getDigitBanglaFromEnglish = (engNumber) => {
    let EnglishToBanglaMapping={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
    let engNumCopy = engNumber;

    for (var x in EnglishToBanglaMapping) {
        engNumCopy = engNumCopy.replace(new RegExp(x, 'g'), EnglishToBanglaMapping[x]);
    }
    
    return engNumCopy;
}
