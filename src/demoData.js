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
        fullName: 'Demo Account',
    },
    classes: [
        {
            shortName: '1A_Mathematik',
            longName: 'Mathematik 1. Klasse (A Klasse)',
            homework: {
                count: 200,
                done: 180,
                percent: 90,
            },
            tests: [
                {
                    typeName: 'SMUEP',
                    items: [
                        {
                            name: '1. SMÜP',
                            reachedPoints: 4,
                            maxPoints: 5,
                            percent: 80,
                            grade: null,
                        },
                        {
                            name: '2. SMÜP',
                            reachedPoints: 6,
                            maxPoints: 10,
                            percent: 60,
                            grade: null,
                        },
                    ],
                },
                {
                    typeName: 'Schularbeit',
                    items: [
                        {
                            name: '1. Schularbeit',
                            reachedPoints: 40,
                            maxPoints: 50,
                            percent: 80,
                            grade: 2,
                        },
                        {
                            name: '2. Schularbeit',
                            reachedPoints: 50,
                            maxPoints: 50,
                            percent: 100,
                            grade: 1,
                        },
                    ],
                },
            ],
            summary: {
                items: [
                    {
                        name: 'Hausübungen',
                        grade: 1,
                        values: [1],
                        weight: 10,
                    },
                    {
                        name: 'SMUEP',
                        grade: 2.5,
                        values: [2, 3],
                        weight: 20,
                    },
                    {
                        name: 'Schularbeit',
                        grade: 1.5,
                        values: [2, 1],
                        weight: 70,
                    },
                ],
                fineGrade: 1.65,
                roundedGrade: 2,
            },
        },
        {
            shortName: '2A_Mathematik',
            longName: 'Mathematik 2. Klasse (A Klasse)',
            homework: {
                count: 10,
                done: 5,
                percent: 50,
            },
            tests: [],
            summary: {
                items: [
                    {
                        name: 'Hausübungen',
                        grade: 5,
                        values: [5],
                        weight: 100,
                    },
                ],
                fineGrade: 5,
                roundedGrade: 5,
            },
        },
    ],
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