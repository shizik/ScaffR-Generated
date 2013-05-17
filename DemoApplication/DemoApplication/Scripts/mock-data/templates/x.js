{
    "id":1,
    "name": "IT Manager Template",
    "description": "Welcome to Seire. We are excited you are joining our team, and can't wait for you to complete the process so you can get started.",
    "activity": [
        { "name": "Created Assignment: Fill out Hire W-4 Task 1", "date":"2013-04-20T00:00:00+0100" },
        { "name": "Saved Template", "date":"2013-04-15T00:00:00+0100" }
    ],
    "tasks":[
        {
            "name":"Fill out Hire W-4 Task 1",
            "categoryId": 2,
            "assignee":"The Hulk",
            "interval": "Weeks",
            "value": "3",
            "isBefore": false,
            "milestone": "Hire Date",
            "templateId": 1
        },
        {
            "name":"Fill out New WSDL Task 6",
            "categoryId": 2,
            "assignee":"Christine Alexander",
            "interval": "Days",
            "value": "10",
            "isBefore": true,
            "milestone": "Hire Date",
            "templateId":1
        },
        {
            "name":"Change light bulb Task 10",
            "categoryId": 2,
            "assignee":"Christine Alexander",
            "interval": "Months",
            "value": "3",
            "isBefore": false,
            "milestone": "Hire Date",
            "templateId":1
        },
        {
            "name":"Drive the car Task 11",
            "categoryId": 1,
            "assignee":"John Doe",
            "interval": "Days",
            "value": "3",
            "isBefore": false,
            "milestone": "Hire Date",
            "templateId":1
        },
        {
            "name":"Make 50 sit ups Task 12",
            "categoryId": 2,
            "assignee":"John Doe",
            "interval": "Days",
            "value": "45",
            "isBefore": false,
            "milestone": "Hire Date",
            "templateId":1
        },
        {
            "name":"Task 7 FM",
            "categoryId": 4,
            "assignee":"Joe Satriani",
            "interval": "Weeks",
            "value": "3",
            "isBefore": true,
            "milestone": "Anniversary",
            "templateId":1
        },
        {
            "name":"Fix the Task 8",
            "categoryId": 1,
            "assignee":"John Doe",
            "interval": "Days",
            "value": "30",
            "isBefore": true,
            "milestone": "Anniversary",
            "templateId":1
        },
        {
            "name":"Play the Task 7",
            "categoryId": 1,
            "assignee":"Joe Satriani",
            "interval": "Days",
            "value": "30",
            "isBefore": false,
            "milestone": "Hire Date",
            "templateId":1
        },
        {
            "name":"Fix the car Task 8",
            "categoryId": 2,
            "assignee":"John Doe",
            "interval": "Weeks",
            "value": "2",
            "isBefore": true,
            "milestone": "Anniversary",
            "templateId":1
        },
        {
            "name":"Make push ups Task 429",
            "categoryId": 2,
            "assignee":"John Doe",
            "interval": "Weeks",
            "value": "7",
            "isBefore": true,
            "milestone": "Anniversary",
            "templateId":1
        }
    ],
    "availableTasks":[
        {
            "name": "Task 12",
            "categoryId": 1,
            "assignee": null,
            "due": "2013-06-06T00:00:00+0100",
            "status": "open",
            "isDone": true,
            "prebuilt": true
        },
        {
            "name": "Task 45",
            "categoryId": 2,
            "assignee": null,
            "due": "2013-06-01T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": false
        },
        {
            "name": "Task 23",
            "categoryId": 3,
            "assignee": null,
            "due": "2013-05-05T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": false
        },
        {
            "name": "Task 65",
            "categoryId": 1,
            "assignee": null,
            "due": "2013-05-22T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": true
        },
        {
            "name": "Task 8",
            "categoryId": 3,
            "assignee": null,
            "due": "2013-06-06T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": false
        },
        {
            "name": "Task 7",
            "categoryId": 2,
            "assignee": null,
            "due": "2013-06-30T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": true
        },
        {
            "name": "Task 6",
            "categoryId": 2,
            "assignee": null,
            "due": "2013-05-18T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": false
        },
        {
            "name": "Task 4",
            "categoryId": 4,
            "assignee": null,
            "due": "2013-05-28T00:00:00+0100",
            "status": "open",
            "isDone": false,
            "prebuilt": false
        }
    ],
    "assignables":[
        {
            "id": 1,
            "name": "Fred Johnson",
            "department": "Sales",
            "type": "person"
        },
        {
            "id": 2,
            "name": "Rangers",
            "department": "Sales",
            "type": "team"
        },
        {
            "id": 3,
            "name": "John Doe",
            "department": "Sales",
            "type": "person"
        },
        {
            "id": 4,
            "name": "Yakuza",
            "department": "IT",
            "type": "team"
        },
        {
            "id": 5,
            "name": "The Hulk",
            "department": "IT",
            "type": "person"
        },
        {
            "id": 6,
            "name": "Chuck Norris",
            "department": "Security",
            "type": "person"
        },
        {
            "id": 7,
            "name": "Bruce Lee",
            "department": "Security",
            "type": "person"
        }
    ],
    "templateAssignables": [
        {
            "id": 1,
            "name": "Sales Rangers",
            "department": "Sales Department"
        },
        {
            "id": 2,
            "name": "Sales Employees",
            "department": "Sales Department"
        },
        {
            "id": 3,
            "name": "Sales Managers",
            "department": "Sales Department"
        },
        {
            "id": 5,
            "name": "IT Managers",
            "department": "IT Department"
        },
        {
            "id": 7,
            "name": "Hackers",
            "department": "IT Department"
        },
        {
            "id": 8,
            "name": "Administrators",
            "department": "IT Department"
        }
    ],
    "milestones":[
        "Hire Date",
        "Anniversary",
        "Fired Date"
    ]
}