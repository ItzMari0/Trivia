const fetchTriviaQuestion = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return json;
};

export default fetchTriviaQuestion;
