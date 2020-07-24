import { indexURL } from '../common'

export default router => {
    router.postJSON('/home', async req => {
        let response = await fetch(indexURL, {
            headers: {
                'Cookie': 'PHPSESSID=' + req.token,
            },
        })

        let text = await response.text()
        let success = text.includes('<title>GraM</title>')

        if(!success)
            return { success: false }

        //TODO: Optimize REGEX-es
        let fullName = text.match(/<i class="ti-user"><\/i>.*<p>([\w\s]*)<\/p>.*<b class="caret"><\/b>/s)[1]
        let className = text.match(/<div style="font-size: 20px; padding-bottom: 20px;" >([\w- ().]*)<\/div><div class="card">/)[1]

        let homeworkCount = text.match(/<div style="padding-bottom: 5px;"><strong>Aufgaben Gesamt: <\/strong>(\d*)<\/div>/)[1]
        let doneCount = text.match(/<div style="padding-bottom: 5px;"><strong>Aufgaben Erledigt: <\/strong>(\d*)<\/div>/)[1]
        let percent = text.match(/<div style="padding-bottom: 5px;"><strong>Prozent: <\/strong>([\d.]*)%<\/div>/)[1]

        homeworkCount = Number(homeworkCount)
        doneCount = Number(doneCount)
        percent = Number(percent)

        let smuepSource = text.match(/<div style="font-size: 15px; padding-bottom: 20px;" >SMUEP<\/div>.*?<tbody>(.*?)<\/tbody>/)[1]
        let testSource = text.match(/<div style="font-size: 15px; padding-bottom: 20px;" >Schularbeit<\/div>.*?<tbody>(.*?)<\/tbody>/)[1]

        let smueps = []
        let tests = []

        let regex = /(?<=<td\s*>)(.*?)(?=<\/td>)/g
        let smuepMatches = smuepSource.match(regex)
        let testMatches = testSource.match(regex)

        while(smuepMatches.length > 0) {
            smueps.push({
                name: smuepMatches.splice(0, 1)[0],
                reached: Number(smuepMatches.splice(0, 1)[0]),
                max: Number(smuepMatches.splice(0, 1)[0]),
                percent: Number(smuepMatches.splice(0, 1)[0].slice(0, -1)),
            })
        }
        while(testMatches.length > 0) {
            tests.push({
                name: testMatches.splice(0, 1)[0],
                reached: Number(testMatches.splice(0, 1)[0]),
                max: Number(testMatches.splice(0, 1)[0]),
                percent: Number(testMatches.splice(0, 1)[0].slice(0, -1)),
                grade: Number(testMatches.splice(0, 1)[0]),
            })
        }

        let summary = text.match(/<tbody><tr><td\s?>([\w\s()[\]%,.]*?)<\/td><td\s?>([\w\s()[\]%,.]*?)<\/td><td\s?>([\w\s()[\]%,.]*?)<\/td><td\s?>([\w\s()[\]%,.]*?)<\/td><td\s?>([\w\s()[\]%,.]*?)<\/td><\/tr><\/tbody>/)

        summary = { //TODO: Split up 1, 2 and 3
            homework: summary[1],
            smuep: summary[2],
            tests: summary[3],
            grade: Number(summary[4]),
            finalGrade: Number(summary[5]),
        }

        return {
            success: true,
            meta: {
                fullName,
                className,
            },
            homework: {
                all: homeworkCount,
                done: doneCount,
                percent: percent,
            },
            smueps,
            tests,
            summary,
        }
    })
}