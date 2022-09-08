const fetchTriviaToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    localStorage.setItem('token', json.token);
  } catch (error) {
    console.log(error);
  }
};

export default fetchTriviaToken;
