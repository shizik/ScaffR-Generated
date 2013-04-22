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
            "name": "Smith Jones",
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
        },
        {
            "id": 3,
            "name": "John Doe",
            "department": "Marketing",
            "tasks": [
                {
                    "id": 3,
                    "status": "overdue",
                    "assignedTo": "1"
                }, {
                    "id": 8,
                    "status": "overdue",
                    "assignedTo": "1"
                }, {
                    "id": 5,
                    "status": "open",
                    "assignedTo": "1"
                }
            ]
        },
        {
            "id": 3,
            "name": "George Washington",
            "department": "Marketing",
            "tasks": [
                {
                    "id": 3,
                    "status": "overdue",
                    "assignedTo": "1"
                }, {
                    "id": 5,
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
            "count": 5
        },
        {
            "status": "closed",
            "count": 1
        },
        {
            "status": "overdue",
            "count": 3
        }
    ]
}
