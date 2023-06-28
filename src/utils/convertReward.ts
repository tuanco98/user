const items: string[] = ["Soil", "Stone", "Wood", "Rubber", "Plastic", "Crystal", "Metal", "Gem", "Onixius", "Crypton", "Pythium", "Paranium"]

export const convertReward = (unbox_result: any) => {

    let runeAmount: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    let totalRune = 0

    for (let i = 1; i <= 3; i++) {
        const index = items.indexOf(unbox_result[`n${i}_rune`]);
        
        runeAmount[index] += unbox_result[`n${i}`]

        totalRune += unbox_result[`n${i}`]
    }

    return { totalRune, runeAmount }
}

