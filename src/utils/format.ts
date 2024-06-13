export function findLongestWord(i_String: string): string | boolean {
    if (!i_String) {
        return false;
    }

    const words: string[] = i_String.split(/\s+/); // Split the input string into words
    let longestWord: string = "";

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }
    return longestWord;
}
