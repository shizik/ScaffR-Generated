{
    "employees": [
         {
             "id": 1,
             "name": "John Smith",
             "department": "Sales",
             "tasks": [
                 {
                     "id": 1,
                     "status": "open",
                     "assignedTo": "1"
                 }, {
                     "id": 2,
                     "status": "open",
                     "assignedTo": "1"
                 }
             ]
         },
        {
            "id": 2,
            "name": "John Smith",
            "department": "Sales",
            "tasks": [
                {
                    "id": 1,
                    "status": "closed",
                    "assignedTo": "1"
                }, {
                    "id": 2,
                    "status": "open",
                    "assignedTo": "1"
                }
            ]
        }
    ],
    "assignables": [
        {
            "id": 1,
            "name": "George Washington",
            "type": "person"
        },
        {
            "id": 2,
            "name": "Portland Trailblazers",
            "type": "team"
        }
    ],
    "departments":[
        {
            "id":1,
            "name":"Sales"            
        },
        {
            "id":2,
            "name":"Marketing"
        }
    ],
    "summary":[
        {
            "status": "open",
            "count": 2
        },
        {
            "status": "closed",
            "count": 0
        },
        {
            "status": "overdue",
            "count": 0
        }
    ]
}
