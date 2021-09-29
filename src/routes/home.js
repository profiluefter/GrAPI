import { indexURL } from '../common'
import { demoHomeData, demoToken } from '../demoData'

const fullNameRegex = /<i class="ti-user"><\/i>\s*<p>(.*?)<\/p>/
const pageRegex = /<div style="font-size: 20px; padding-bottom: 20px;" >(?<classname>.*?)<\/div>.*?Hausübungen.*?Gesamt: <\/strong>(?<hwCount>\d+)<\/div>.*?Erledigt: <\/strong>(?<hwDone>\d+)<\/div>.*?Prozent: <\/strong>(?<hwPercent>[\d.]+)%<\/div>.*?<span style="font-weight: bold; font-size: 20px;">(?<tests>.*?)Gesamtnote(?<summary>.*?)<\/table>/g
const testRegex = /<div style="font-size: 15px; padding-bottom: 20px;" >(?<typeName>.*?)<\/div>.*?<tbody>(?<items>.*?)<\/tbody>/g
const testItemRegex = /<tr><td >(?<name>.*?)<\/td><td >(?<reached>\d+?)<\/td><td >(?<max>\d+?)<\/td><td >(?<percent>[\d.]+?)%<\/td>(?:<td >(?<grade>\d+?)<\/td>)?<\/tr>/g
const gradingHeadersRegex = /<th>(?<name>.*?)<\/th>/g
const gradingItemsRegex = /<td >(?<item>.*?)<\/td>/g
const gradingValueRegex = /(?<grade>[\d.]+) \((?<values>[\d, ]*?)\) \[(?<weight>[\d.]+)%]/

function parseGradingItem(name, item) {
    let values = item.match(gradingValueRegex).groups

    return {
        name,
        grade: Number(values.grade),
        values: values.values.split(', ').map(x => Number(x)),
        weight: Number(values.weight),
    }
}

function parseSummary(summary) {
    let headings = Array.from(summary.matchAll(gradingHeadersRegex)).map(match => match.groups.name)
    let items = Array.from(summary.matchAll(gradingItemsRegex)).map(match => match.groups.item)

    if(headings.pop() !== 'Endnote')
        throw new Error('Grading headers don\'t match')
    if(headings.pop() !== 'Note')
        throw new Error('Grading headers don\'t match')

    let roundedGrade = items.pop()
    let fineGrade = items.pop()

    return {
        items: items.map((item, i) => parseGradingItem(headings[i], item)),
        fineGrade: Number(fineGrade),
        roundedGrade: Number(roundedGrade),
    }
}

function parseTestType({ typeName, items }) {
    return {
        typeName,
        items: Array.from(items.matchAll(testItemRegex)).map(match => match.groups).map(item => ({
            name: item.name,
            reachedPoints: Number(item.reached),
            maxPoints: Number(item.max),
            percent: Number(item.percent),
            grade: Number(item.grade),
        })),
    }
}

function parseTests(tests) {
    return Array.from(tests.matchAll(testRegex)).map(match => match.groups).map(parseTestType)
}

function parseClassHome({ classname, hwCount, hwDone, hwPercent, tests, summary }) {
    return {
        name: classname,
        homework: {
            count: Number(hwCount),
            done: Number(hwDone),
            percent: Number(hwPercent),
        },
        tests: parseTests(tests),
        summary: parseSummary(summary),
    }
}

function parseHome(text) {
    let fullNameMatch = text.match(fullNameRegex)
    let pageMatch = text.matchAll(pageRegex)

    return {
        success: true,
        meta: {
            fullName: fullNameMatch[1],
        },
        classes: Array.from(pageMatch).map(match => match.groups).map(parseClassHome),
    }
}

export default router => {
    router.postJSON('/home', async req => {
        if(req.token === demoToken) {
            return demoHomeData
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

        return parseHome(text)
    })
}