import fs from "fs"
const csv = require("csv-parser")
export const readCSV = async (path: string) => {
    try {
        const results: any[] = []
        const result: any[] = await new Promise((resolve) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => {
                    resolve(results)
                })
        })
        return result
    } catch (e) {
        throw e
    }
}