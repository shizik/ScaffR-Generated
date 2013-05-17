{
    "id":1,
    "name": "Sales Welcome Team",
    "description": "The Sales Welcome Team initiates the on-boarding process for new sales people and associates. They respond to each employee case.",
    "activity": [
        { "name": "Created Assignment: Fill out Hire W-4 Task 1", "date":"2013-04-20T00:00:00+0100" },
        { "name": "Applied Template: Hiring", "date":"2013-04-15T00:00:00+0100" }
    ],
    "members":[
        {
            "id":1,
            "name":"Fred Johnson",
            "isActive": true
        },
        {
            "id":2,
            "name":"Chad Muska",
            "isActive": true
        },
        {
            "id":3,
            "name":"John Doe",
            "isActive": false
        }
    ],
    "tasks":[
        {
            "name":"Fill out Hire W-4 Task 1",
            "category": "Job",
            "assignee":"The Hulk",
            "due": "2013-04-27T00:00:00+0100",
            "status": "overdue",
            "isDone":false,
            "templateId": 1
        },
        {
            "name":"Fill out New WSDL Task 6",
            "category": "Job",
            "assignee":"Christine Alexander",
            "due": "2013-04-27T00:00:00+0100",
            "status": "closed",
            "isDone":true
        },
        {
            "name":"Change light bulb Task 10",
            "category": "Job",
            "assignee":"Christine Alexander",
            "due": "2013-06-01T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Drive the car Task 11",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-05-05T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Make 50 sit ups Task 12",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-05-22T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Task 7 FM",
            "category": "Company",
            "assignee":"Joe Satriani",
            "due": "2013-05-17T00:00:00+0100",
            "status": "closed",
            "isDone":true
        },
        {
            "name":"Fix the Task 8",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-04-03T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Play the Task 7",
            "category": "Company",
            "assignee":"Joe Satriani",
            "due": "2013-05-07T00:00:00+0100",
            "status": "closed",
            "isDone":true
        },
        {
            "name":"Fix the car 8",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-04-25T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Make 100 push ups 774",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-06-05T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Play the guitar Task 7",
            "category": "Company",
            "assignee":"Joe Satriani",
            "due": "2013-05-02T00:00:00+0100",
            "status": "closed",
            "isDone":true
        },
        {
            "name":"Fix the car Task 8",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-04-10T00:00:00+0100",
            "status": "open",
            "isDone":false
        },
        {
            "name":"Make push ups Task 429",
            "category": "Company",
            "assignee":"John Doe",
            "due": "2013-06-24T00:00:00+0100",
            "status": "open",
            "isDone":false
        }
    ],
    "departments":[{
            "name": "IT Department",
            "teams":[
                {
                    "id":1,
                    "name":"Yakuza",
                    "people":[
                        {
                            "id":11,
                            "name":"Chiristine Alexander"
                        },
                        {
                            "id":12,
                            "name":"Gene Hackman"
                        },
                        {
                            "id":13,
                            "name":"Andrea Andrews"
                        }
                    ]
                },
                {
                    "id":2,
                    "name":"IT Admins",
                    "people":[
                        {
                            "id":21,
                            "name":"John Doe"
                        },
                        {
                            "id":22,
                            "name":"Sally Doe"
                        },
                        {
                            "id":23,
                            "name":"Andrew Andreas"
                        }
                    ]
                }
            ],
            "people": [
                {
                    "id":11,
                    "name":"Chiristine Alexander"
                },
                {
                    "id":12,
                    "name":"Gene Hackman"
                },
                {
                    "id":13,
                    "name":"Andrea Andrews"
                },
                {
                    "id":21,
                    "name":"John Doe"
                },
                {
                    "id":22,
                    "name":"Sally Doe"
                },
                {
                    "id":23,
                    "name":"Andrew Andreas"
                }
            ]
        },
        {
            "name": "Sales Department",
            "teams":[
                {
                    "id":3,
                    "name":"Sales Rangers",
                    "people":[
                        {
                            "id":31,
                            "name":"Chuck Norris"
                        },
                        {
                            "id":32,
                            "name":"Larry Page"
                        }
                    ]
                },
                {
                    "id":4,
                    "name":"Sales Managers",
                    "people":[
                        {
                            "id":41,
                            "name":"Doey John"
                        },
                        {
                            "id":42,
                            "name":"San Andreas"
                        },
                        {
                            "id":43,
                            "name":"Thomas Jefferson"
                        }
                    ]
                }
            ],
            "people": [
                {
                    "id":1,
                    "name":"Thomas Jefferson"
                },
                {
                    "id":2,
                    "name":"Andrew Jackson"
                },
                {
                    "id":3,
                    "name":"Olivia Cleaver"
                },
                {
                    "id":4,
                    "name":"George Washington"
                }
            ]
        }
    ]
}