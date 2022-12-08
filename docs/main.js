let response = (async () =>
    (await (await fetch("https://api.dzabalama.com/quiz")).json())
)();

let checkFormat = (quizQuestions, quizName) => {
    let wrongFormatImages = [];

    for (let i = 0; i < quizQuestions.length; i++) {
        let quizQuestion = quizQuestions[i].questionURL;
        if (!quizQuestion.includes('png')) {
            if (!quizQuestion.includes('jpeg')) {
                if(!quizQuestion.includes('webp')) {
                    if (!quizQuestion.includes('jpg')) {
                        wrongFormatImages.push({image: quizQuestion, name: quizName})
                    }
                }
            }
        }
    }

    return wrongFormatImages;
}

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
        const format = document.getElementById('formats');

        let wrongFormats = checkFormat(list_reversed[i].questions, questionName);

        if (wrongFormats.length > 0) {
            for (let i = 0; i < wrongFormats.length; i++) {
                const image = document.createElement('img');
                const quizName = document.createElement('p');
                const container = document.createElement('div');
                
                image.width = 200;
                image.src = wrongFormats[i].image;
                quizName.innerHTML = wrongFormats[i].name;

                container.appendChild(image);
                container.appendChild(quizName);

                container.id = 'quizContainer formatContainer';

                container.style.border = "2px solid black";
                container.style.padding = '5px';
                container.style.marginBottom = "10px";

                format.appendChild(container);
                format.style.display = "flex";
            }
        }
        
        main.appendChild(container);
    }
})