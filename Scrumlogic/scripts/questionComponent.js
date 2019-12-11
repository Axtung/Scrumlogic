Vue.component('test', {
    props: ['id','link', 'word', 'total', 'text'],
    data() {
        return {
            urlQuestion: 'json/question.json',
            urlAnswers: 'json/answers.json',
            urlCorrectAnswers: 'json/correctAnswer.json',
            contentQuestion: [],
            contentAnswers: [],
            correctAnswers: [],
            allAnswers: 0,
        }
    },

    methods: {
        getRightAnswer() {
            let choice = document.querySelector(`input[name]:checked`).value;
            for (let i = 0; i < this.correctAnswers.length; i++) {
                if (choice === this.correctAnswers[i]) {
                    this.correctAnswers++;
                }
                break;
            }
        }
    },

    mounted() {
        this.$parent.getJson(this.urlQuestion)
            .then(data => {
                this.allAnswers = +data.length;
                for (let el of data) {
                    let index = +el.id_question;
                    if (index === this.id) {
                        this.contentQuestion.push(el);
                    }

                }
            });
        this.$parent.getJson(this.urlAnswers)
            .then(data => {
                for (let el of data) {
                    let index = +el.id_answer;
                    if (index === this.id) {
                        this.contentAnswers.push(el);
                    }
                }
            });
        this.$parent.getJson(this.urlCorrectAnswers)
            .then(data => {
                for (let el of data) {
                    this.correctAnswers.push(el);
                }
            });
    },

    template: `<div class="answer">
        <p class="answer__p">Пройдено {{total}} <span>{{text}}</span> из {{allAnswers}}</p>
        <question
        v-for="el of contentQuestion"
        :key="el.id_question"
        :question="el">
        </question>
        <div class="form-block">
        <form action="#" method="post" class="content__form">
        <answer
            v-for="elem of contentAnswers"
            :key="elem.id"
            :answer="elem"
            :value="elem.answer"
            :id="elem.id">
        </answer>
        </form>
        </div>
        <div class="content__item">
        <btn
        :link="link"
        :word="word"
        ></btn>
        </div>       
        </div>`
});

Vue.component('question', {
    props: ['question'],

    template: `<h2 class="answer__h1">Вопрос № {{question.id_question}} {{question.question}}</h2>`
                
});

Vue.component('answer', {
    props: ['answer', 'id', 'value'],

    template: ` <label>
                <input type="radio" name="answer" checked :id="id" :value="value" class="input-answer">{{answer.answer}}
                <br>
                </label>`
});

Vue.component('btn', {
    props: ['link', 'word'],
    template: `<a :href="link" class="content__button start" @click="$emit('getRightAnswer')">{{word}}</a>`
});