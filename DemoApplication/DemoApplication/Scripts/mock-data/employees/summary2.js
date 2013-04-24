{
    "employees": [
         {
             "id": 1,
             "name": "John Smith",
             "department": "Sales",
             "departmentId":"1",
             "tasks": [
                 {
                     "name":"Fill out New Hire W-4",
                     "category": "Forms",
                     "asignee":"Christine Alexander",
                     "due": "05/13/13",
                     "assignedTo": "1",
                     "status": "overdue"
                 }, {
                     "name":"Fill out New Hire W-4",
                     "category": "Forms",
                     "asignee":"Christine Alexander",
                     "assignedTo": "1",
                     "due": "05/13/13",
                     "status": "overdue"
                 }
             ]
         },
        {
            "id": 2,
            "name": "Smith Jones",
            "department": "Sales",
            "departmentId":"1",
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
            "departmentId":"2",
            "tasks": [
                {
                    "id": 3,
                    "status": "overdue",
                    "assignedTo": "1"
                }, {
                    "id": 8,
                    "status": "overdue",
                    "assignedTo": "2"
                }, {
                    "id": 5,
                    "status": "open",
                    "assignedTo": "2"
                }
            ]
        },
        {
            "id": 3,
            "name": "George Washington",
            "department": "Marketing",
            "departmentId":"2",
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
            "type": "person",
            "count": 6
        },
        {
            "id": 2,
            "name": "Portland Trailblazers",
            "type": "team",
            "count": 10
        }
    ],
    "departments":[
        {
            "id":1,
            "name":"Sales",
            "count": 8            
        },
        {
            "id":2,
            "name":"Marketing",
            "count": 24
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
