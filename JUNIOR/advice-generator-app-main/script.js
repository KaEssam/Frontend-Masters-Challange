window.onload = () => {
  const getAdvice = async () => {
    const id = Math.floor(Math.random() * 223) + 1;
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    const advice = await response.json();
    return advice;
  };

  const setAdvice = () => {
    getAdvice()
      .then(response => {
        const {
          slip: { id, advice },
        } = response;
        document.getElementById("AdviceTitle").innerHTML = `Advice #${id}`;
        document.getElementById("AdviceText").innerHTML = `"${advice}"`;
      })
      .catch(err => {
        console.log(err);
      });
  };

  document.getElementById("Dice").addEventListener("click", setAdvice);
};
