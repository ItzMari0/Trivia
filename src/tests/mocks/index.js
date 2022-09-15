export const questionsMock = {
  response_code: 0,
  results: [
    { category: "Entertainment: Music", type: "boolean",difficulty: "medium", question: "Soulja Boy&#039;s &#039;Crank That&#039; won a Grammy for Best Rap Song in 2007.", correct_answer: "False", incorrect_answers: ["True"] },
    { category: "Science & Nature", type: "multiple", difficulty: "hard", question:"What is the scientific name of the knee cap?", correct_answer:"Patella", incorrect_answers: ["Femur","Foramen Magnum","Scapula"] },
    { category: "Entertainment: Books", type: "multiple", difficulty: "easy", question: "What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?", correct_answer: "A Study in Scarlet", incorrect_answers: ["The Sign of the Four","A Case of Identity","The Doings of Raffles Haw"] },
    { category:"Entertainment: Video Games", type:"boolean", difficulty:"easy", question: "The names of Tom Nook&#039;s cousins in the Animal Crossing franchise are named &quot;Timmy&quot; and &quot;Jimmy&quot;.", correct_answer:"False", incorrect_answers: ["True"] },
    { category:"General Knowledge", type: "multiple", difficulty: "easy", question: "In aerodynamics, which force pushes an object upwards?", correct_answer: "Lift", incorrect_answers: ["Drag","Weight","Thrust"] },
  ]
};

export const initialState = {
  player: {
  name: 'group10',
  avatar: 'https://www.gravatar.com/avatar/812ba00112e6fb842d2a606ebeb70786',
  score: 0,
  assertions: 0,
  },
  questionsReducer: {
    questions: [],
    response_code: 0,
    isInvalid: false,
  }
};

export const fakeRank = [
  {
    avatar: 'https://www.gravatar.com/avatar/812ba00112e6fb842d2a606ebeb70786',
    name: 'group9',
    score: 300,
  }
]
