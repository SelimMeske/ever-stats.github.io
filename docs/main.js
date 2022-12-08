let response = (async () =>
    (await (await fetch("https://api.dzabalama.com/quiz")).json())
)();

response.then((response) => {
    console.log(response);
    console.log(response.name)

    const list_reversed = response.reverse();

    for (let i = 0; i < response.length; i++) {
        let questionCount = list_reversed[i].questions.length;
        let questionName = list_reversed[i].name + " ";
        let questionImageLink = list_reversed[i].logo;

        const para = document.createElement('p');
        const count = document.createElement('p');
        const image = document.createElement('img');

        para.className = "quizName";
        count.className = "count";
        image.className = "logo";
        
        const container = document.createElement('div');
        container.id = "quizContainer";
        container.appendChild(para);
        para.innerHTML = questionName;
        count.innerHTML = questionCount;

        image.src = questionImageLink;
        image.width = 20;

        if (questionCount >= 50) {
            container.classList.add("countGood");
        }else {
            container.classList.add("countNotGood");
        }

        container.appendChild(image);
        container.appendChild(para);
        container.appendChild(count);

        
        const main = document.getElementById('main');
        main.appendChild(container)
    }
})