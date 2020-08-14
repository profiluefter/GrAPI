export const demoUsername = 'demo'
export const demoPassword = 'demo'
export const demoToken = 'demo0000demo0000demo0000demo0000'
export const demoHomeworkID = 99999999

export const demoAuthResponse = {
    success: true,
    token: demoToken,
}

// noinspection SpellCheckingInspection
export const demoHomeData = {
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

// noinspection SpellCheckingInspection
export const demoHomeworkList = {
    success: true,
    items: [
        {
            name: '2. Hausübung',
            deadline: 187,
            taskCount: 4,
            doneCount: 4,
            tickable: false,
        },
        {
            name: '3. Hausübung',
            deadline: 187,
            taskCount: 18,
            doneCount: 17,
            tickable: false,
        },
        {
            name: '1. Hausübung',
            deadline: 187,
            taskCount: 1,
            doneCount: 1,
            tickable: false,
        },
        {
            name: '4. Hausübung',
            deadline: 187,
            taskCount: 8,
            doneCount: 4,
            tickable: false,
        },
        {
            name: '5. Hausübung',
            deadline: 187,
            taskCount: 11,
            doneCount: 7,
            tickable: false,
        },
        {
            name: '33. Hausübung',
            deadline: 187,
            taskCount: 2,
            doneCount: 2,
            tickable: true,
            id: demoHomeworkID,
        },
    ],
}

// noinspection SpellCheckingInspection
export const demoHomeworkDetails = {
    success: true,
    tasks: [
        'Übungszettel Vermessungsaufgaben 11.5.03',
        'Übungszettel Vermessungsaufgaben 11.5.04',
    ],
}