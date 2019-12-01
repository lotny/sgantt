var chartData = new Object();
chartData =
[ 
    {
        name: "Resource 1",
        activities : [
            {
            id: "1",
            name: "first activity",
            actualStart: new Date("December 1, 2019 12:00:00"),
            actualEnd: Date.UTC(2019,12,3)
        },{
            id: "2",
            name: "second activity",
            actualStart: new Date("December 1, 2019 16:00:00"),
            actualEnd: Date.UTC(2019,12,3)
        }
        ]
    },
    {
        name: "Resource 2",
        activities : [
            {
            id: "activity2a",
            name: "first activity",
            actualStart: Date.UTC(2019,12,1,12),
            actualEnd: Date.UTC(2019,12,1,16)
        },{
            id: "activity2b",
            name: "second activity",
            actualStart: Date.UTC(2019,12,16,30),
            actualEnd: Date.UTC(2019,12,21)
        }
        ]
    },
];