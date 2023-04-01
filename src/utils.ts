import { exec } from 'child_process'

export async function getDate(file: string): Promise<string> {
    return await new Promise((resolve, reject) => {
        const cmd = `date -r ${file} +%Y-%m-%d`
        exec(cmd, (err, stdout, _stderr) => {
            if (err) reject(err)
            else resolve(stdout.trim())
        })
    })
}
