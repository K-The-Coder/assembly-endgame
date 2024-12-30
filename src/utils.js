import { words } from "./words"

export function getRandomWord(){
    const randomWord = Math.floor(Math.random() * words.length)

    return words[randomWord]
}

export function getFarewellText(language){
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `Arrividerci, ${language}`,
        `R.I.P., ${language}🕊️`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}`,
        `${language} bites the dust`,
        `${language} just got unalived💀`,
        `Gone but not forgotten, ${language}`,
        `End of the road for ${language}💔`,
        `Ride off into the sunset, ${language}`,
        `Nice knowing you, ${language}`,
        `${language} has left the building`,
        `${language}, it's been real`,
        `Goodbye, ${language}😔`,
    ]

    const randomIndex = Math.floor(Math.random() * options.length)

    return options[randomIndex]
}