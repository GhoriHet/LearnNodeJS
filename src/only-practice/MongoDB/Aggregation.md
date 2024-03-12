[
    {
      "_id": 1,
      "name": "John Doe",
      "age": 28,
      "city": "New York",
      "gender": "Male",
      "posts": [
        { "title": "Post 1", "likes": 15, "comments": ["Great post!", "Interesting"] },
        { "title": "Post 2", "likes": 20, "comments": ["Well done"] }
      ],
      "friends": [2, 3],
      "skills": ["JavaScript", "React", "Node.js"],
      "isActive": true
    },
    {
      "_id": 2,
      "name": "Alice Johnson",
      "age": 32,
      "city": "Los Angeles",
      "gender": "Female",
      "posts": [
        { "title": "Post 3", "likes": 10, "comments": ["Nice!", "Awesome"] },
        { "title": "Post 4", "likes": 25, "comments": ["Impressive"] }
      ],
      "friends": [1, 3],
      "skills": ["Python", "Django", "JavaScript"],
      "isActive": true
    },
    {
      "_id": 3,
      "name": "Bob Williams",
      "age": 24,
      "city": "New York",
      "gender": "Male",
      "posts": [
        { "title": "Post 5", "likes": 18, "comments": ["Keep it up"] },
        { "title": "Post 6", "likes": 22, "comments": ["Awesome"] }
      ],
      "friends": [1, 2],
      "skills": ["Java", "Spring Boot", "JavaScript"],
      "isActive": false
    },
    {
      "_id": 4,
      "name": "Diana Brown",
      "age": 30,
      "city": "San Francisco",
      "gender": "Female",
      "posts": [
        { "title": "Post 7", "likes": 12, "comments": ["Interesting"] },
        { "title": "Post 8", "likes": 30, "comments": ["Well done", "Great post!"] }
      ],
      "friends": [5, 6],
      "skills": ["React", "Node.js", "MongoDB"],
      "isActive": true
    },
    {
      "_id": 5,
      "name": "Elijah Wilson",
      "age": 26,
      "city": "Los Angeles",
      "gender": "Male",
      "posts": [
        { "title": "Post 9", "likes": 14, "comments": ["Nice!"] },
        { "title": "Post 10", "likes": 18, "comments": ["Impressive"] }
      ],
      "friends": [4, 6],
      "skills": ["JavaScript", "Vue.js", "Express.js"],
      "isActive": false
    },
    {
      "_id": 6,
      "name": "Fiona Miller",
      "age": 29,
      "city": "San Francisco",
      "gender": "Female",
      "posts": [
        { "title": "Post 11", "likes": 22, "comments": ["Awesome"] },
        { "title": "Post 12", "likes": 25, "comments": ["Great post!"] }
      ],
      "friends": [4, 5],
      "skills": ["React", "Angular", "Node.js"],
      "isActive": true
    },
    {
      "_id": 7,
      "name": "George Taylor",
      "age": 35,
      "city": "Los Angeles",
      "gender": "Male",
      "posts": [
        { "title": "Post 13", "likes": 18, "comments": ["Keep it up"] },
        { "title": "Post 14", "likes": 20, "comments": ["Awesome"] }
      ],
      "friends": [8, 9],
      "skills": ["Python", "Flask", "Django"],
      "isActive": false
    },
    {
      "_id": 8,
      "name": "Hannah Robinson",
      "age": 27,
      "city": "San Francisco",
      "gender": "Female",
      "posts": [
        { "title": "Post 15", "likes": 15, "comments": ["Nice!", "Interesting"] },
        { "title": "Post 16", "likes": 28, "comments": ["Well done"] }
      ],
      "friends": [7, 9],
      "skills": ["JavaScript", "React", "Vue.js"],
      "isActive": true
    },
    {
      "_id": 9,
      "name": "Isaac Moore",
      "age": 31,
      "city": "Portland",
      "gender": "Male",
      "posts": [
        { "title": "Post 17", "likes": 10, "comments": ["Nice!", "Impressive"] },
        { "title": "Post 18", "likes": 22, "comments": ["Great post!"] }
      ],
      "friends": [7, 8],
      "skills": ["Node.js", "Express.js", "MongoDB"],
      "isActive": false
    },
    {
      "_id": 10,
      "name": "Jasmine Hill",
      "age": 23,
      "city": "Portland",
      "gender": "Female",
      "posts": [
        { "title": "Post 19", "likes": 18, "comments": ["Keep it up", "Awesome"] },
        { "title": "Post 20", "likes": 25, "comments": ["Interesting"] }
      ],
      "friends": [9, 7],
      "skills": ["Java", "Spring Boot", "JavaScript"],
      "isActive": true
    }
]




1. Count the total number of active users.
[
  {
    $match: {
      isActive: true
    }
  },
  {
    $count: 'Total Active User'
  }
]



2. Find the average age of male and female.
[
  {
    $group: {
      _id: "$gender",
      "avgAge": {
        $avg: "$age"
      }
    }
  }
]



3. Give the total number of posts by active users.
[
  {
    $match: {
      isActive: true
    }
  },
  {
    $unwind: {
      path: "$posts"
    }
  },
  {
    $group: {
      _id: "$_id",
      "posts": {
        $sum: 1
      }
    }
  }
]



4. Count the total number of comments.
[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $unwind: {
      path: "$posts.comments",
    }
  },
  {
    $group: {
      _id: "null",
      "comments": {
        $sum: 1
      }
    }
  }
]



5. List users and their total likes.
[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $group: {
      _id: "$_id",
      "likes": {
        $sum: "$posts.likes"
      }
    }
  }
]



6. Find the user name with the maximum likes of posts.
[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $group: {
      _id: "$_id",
      "name": {
        $first: "$name"
      },
      "likes": {
        $sum: "$posts.likes"
      }
    }
  },
  {
    $sort: {
      "likes": -1
    }
  },
  {
    $limit: 1
  }
]



7. Count the number of active and inactive users.
[
  {
    $group: {
      _id: "$isActive",
      "Total": {
        $sum: 1
      }
    }
  }
]



8. List the cities with the highest average age.
[
  {
    $group: {
      _id: "$city",
      "avgAge": {
        $avg: "$age"
      }
    }
  }
]



9. Count the number of users in each city.
[
  {
    $group: {
      _id: "$city",
      "Total Users": {
        $sum: 1
      }
    }
  }
]



10. Count the number of users with JavaScript skills.
[
  {
    $unwind: {
      path: "$skills",
    }
  },
  {
    $match: {
      "skills": "JavaScript"
    }
  },
  {
    $count: 'Total JavaScript Student'
  }
]



11. Count the number of users with each skill.
[
  {
    $unwind: {
      path: "$skills",
    }
  },
  {
    $group: {
      _id: "$skills",
      "Total Students": {
        $sum: 1
      }
    }
  }
]



12. Find users who have posts with more than 15 likes and a specific skill.
[
  {
    $unwind: {
      path: '$posts'
    }
  },
  {
    $match: {
      'posts.likes': {$gt: 15},
      'skills': {$eq: 'JavaScript'}
    }
  }
]



13. Find users with the highest total number of likes across all posts.



14. Find users who have friends and count the number of friends.
[
  {
    $unwind: {
      path: "$friends",
    }
  },
  {
    $group: {
      _id: "$_id",
      "Total Friends": {
        $sum: "$friends"
      }
    }
  }
]



15. Find users who have at least one post with a specific comment and a specific skill.
[
  {
    $addFields: {
        "total_post": { $size: "$posts" }
    }
  },
  {
    $match: {
      'total_post': {$gt: 0}
    }
  },
  {
    $match: {
      'posts.likes': {$gt: 15},
      'skills': {$eq: 'JavaScript'},
      'posts.comments': {$eq: 'Awesome'}
    }
  }
]



16. Count users who have skills javascript and react.
[
  {
    $match: {
     skills: {$all: ["JavaScript", "React"]}
    }
  },
  {
    $count: "Total JavaScript & React skilled Students"
  }
]



17. count user who have second skills as React
[
  {
    "$match": {
      'skills.1': "React"
    }
  },
  {
    $count: "total_users_with_react_as_second_skill"
  }
]



18. Categorise users by their city and gives their id and name.
[
  {
    $group: {
      _id: "$city",
      users: {
        $push: {
          _id: "$_id",
          name: "$name"
        }
      }
    }
  }
]



19. Give user data whose city name starts with "New".



20. Add a "postCount" field representing the total number of posts for each user.
[
  {
    $addFields: {
        "total_post": { $size: "$posts" }
    }
  }
]



21. Add a "friendNames" field with the names of friends for each user.



22. Display posts data that have more than 1 comments.
[
  {
    $unwind: {
      path: '$posts'
    }
  },
  {
    $addFields: {
        total_comments: { $size: "$posts.comments" }
    }
  },
  {
    $match: {
      total_comments: {$gt: 1}
    }
  },
  {
    $project: {
      _id: 0,
      age: 0,
      city: 0,
      gender: 0,
      friends: 0,
      skills: 0,
      isActive: 0,
      full_name: 0,
    }
  }
]