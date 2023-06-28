import { IndexDescription } from "mongodb";

export enum CurrentBlockType {
    current_block_box = `current_block_box`,
    current_block_box2 = `current_block_box2`,
    current_block_market = `current_block_market`,
    current_block_rune_pack = `current_block_rune_pack`,
    current_block_para_art = `current_block_para_art`,
    current_block_paragon_factory = `current_block_paragon_factory`,
    current_block_paragon = `current_block_paragon`,
    current_block_copyright = `current_block_copyright`,
}
export interface CurrentBlock {
    type: CurrentBlockType
    block: number
}
export const CurrentBlockIndexes: IndexDescription[] = [
    { key: { type: 1 }, background: true },
]