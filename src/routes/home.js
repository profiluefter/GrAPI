import { indexURL } from '../common'

export default router => {
    router.postJSON('/home', async req => {
        if(req.token === 'demo0000demo0000demo0000demo0000') {
            // noinspection SpellCheckingInspection
            return {
                success: true,
                meta: {
                    fullName: 'Demo Nutzer',
                    className: '1a Mathematik',
                },
                homework: {
                    all: 187,
                    done: 180,
                    percent: 96.26,
                },
                smueps: [
                    {
                        name: '1. SMÜP',
                        reached: 5,
                        max: 10,
                        percent: 50,
                    },
                    {
                        name: '2. SMÜP',
                        reached: 10,
                        max: 10,
                        percent: 100,
                    },
                    {
                        name: '3. SMÜP',
                        reached: 9,
                        max: 10,
                        percent: 90,
                    },
                    {
                        name: '4. SMÜP',
                        reached: 17,
                        max: 30,
                        percent: 56.67,
                    },
                ],
                tests: [
                    {
                        name: '1. Schularbeit',
                        reached: 50,
                        max: 75,
                        percent: 66.67,
                        grade: 4,
                    },
                    {
                        name: '2. Schularbeit',
                        reached: 90,
                        max: 90,
                        percent: 100,
                        grade: 1,
                    },
                    {
                        name: '3. Schularbeit',
                        reached: 69,
                        max: 75,
                        percent: 80,
                        grade: 2,
                    },
                    {
                        name: '4. Schularbeit',
                        reached: 50,
                        max: 70,
                        percent: 71.43,
                        grade: 3,
                    },
                    {
                        name: '5. Schularbeit',
                        reached: 3,
                        max: 100,
                        percent: 3,
                        grade: 5,
                    },
                ],
                summary: {
                    homework: '1 (1) [10%]',
                    smuep: '2.75 (5, 1, 1, 4) [20%]',
                    tests: '3 (4, 1, 2, 3, 5) [70%]',
                    grade: 2.75,
                    finalGrade: 3,
                },
            }
        }

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