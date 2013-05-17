﻿{
    "employees": [
         {
             "id": 1,
             "firstName": "John",
             "lastName": "Smith",
             "department": "Sales",
             "departmentId":1,
             "dateInitiated": "2013-05-10T00:00:00+0100",
             "tasks": [
                         {
                             "name":"Fill out Hire W-4 Task 1",
                             "category": "Job",
                             "assignee":"Christine Alexander",
                             "due": "2013-06-27T00:00:00+0100",
                             "status": "open",
                             "isDone":false
                         },
                        {
                            "name":"Fill out Hire L-10 Task 2",
                            "category": "Job",
                            "assignee":"Christine Alexander",
                            "due": "2013-06-11T00:00:00+0100",
                            "status": "open",
                            "isDone":false
                        },
                        {
                            "name":"Sing a welcoming song Task 3",
                            "category": "Company",
                            "assignee":"Jogn Doe",
                            "due": "2013-07-23T00:00:00+0100",
                            "status": "open",
                            "isDone":false
                        }
             ]
         },
        {
            "id": 2,
            "firstName": "Smith",
            "lastName": "Jones",
            "department": "Sales",
            "departmentId":1,
            "dateInitiated": "2013-04-01T00:00:00+0100",
            "tasks": [
                {
                    "name":"Fix the car  Task 4",
                    "category": "Company",
                    "assignee":"Jogn Doe",
                    "due": "2013-04-13T00:00:00+0100",
                    "status": "overdue",
                    "isDone":false
                },
                {
                    "name":"Make 100 push ups Task 5",
                    "category": "Company",
                    "assignee":"Jogn Doe",
                    "due": "2013-04-20T00:00:00+0100",
                    "status": "overdue",
                    "isDone":false
                }
            ]
        },
                {
                    "id": 3,
                    "firstName": "Chuck",
                    "lastName": "Norris",
                    "department": "Marketing",
                    "departmentId":2,
                    "dateInitiated": "2013-04-03T00:00:00+0100",
                    "tasks": [
                        {
                            "name":"Fill out New WSDL Task 6",
                            "category": "Job",
                            "assignee":"Christine Alexander",
                            "due": "2013-04-27T00:00:00+0100",
                            "status": "closed",
                            "isDone":true
                        },
                        {
                            "name":"Play the guitar Task 7",
                            "category": "Company",
                            "assignee":"Joe Satriani",
                            "due": "2013-05-17T00:00:00+0100",
                            "status": "closed",
                            "isDone":true
                        },
                        {
                            "name":"Fix the car Task 8",
                            "category": "Company",
                            "assignee":"Jogn Doe",
                            "due": "2013-04-05T00:00:00+0100",
                            "status": "overdue",
                            "isDone":false
                        },
                        {
                            "name":"Make 100 push ups Task 9",
                            "category": "Company",
                            "assignee":"Jogn Doe",
                            "due": "2013-06-06T00:00:00+0100",
                            "status": "open",
                            "isDone":false
                        }
                    ]
                },
        {
            "id": 4,
            "firstName": "George",
            "lastName": "Washington",
            "department": "Marketing",
            "departmentId":2,
             "dateInitiated": "2013-05-01T00:00:00+0100",
            "tasks": [
                {
                    "name":"Change light bulb Task 10",
                    "category": "Job",
                    "assignee":"Christine Alexander",
                    "due": "2013-06-01T00:00:00+0100",
                    "status": "closed",
                    "isDone":true
                },
                {
                    "name":"Drive the car Task 11",
                    "category": "Company",
                    "assignee":"Jogn Doe",
                    "due": "2013-05-05T00:00:00+0100",
                    "status": "open",
                    "isDone":false
                },
                {
                    "name":"Make 50 sit ups Task 12",
                    "category": "Company",
                    "assignee":"Jogn Doe",
                    "due": "2013-05-22T00:00:00+0100",
                    "status": "open",
                    "isDone":false
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
            "id":3,
            "name":"Marketing",
            "count": 24
        },
        {
            "id":4,
            "name":"Human Resources",
            "count": 24
        },
        {
            "id":2,
            "name":"IT Department",
            "count": 24
        }
    ]
}
