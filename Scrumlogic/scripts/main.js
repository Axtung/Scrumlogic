const indexAp = new Vue( {
    el: '.content',
    data: {
        totalCountAnswers: 0,
        totalCorrectAnswers: 0
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        }
    },

    computed: {
        getRightEnd() {
            let number = +this.totalCountAnswers;
            if (number === 1) {
                return 'вопрос';
            } else if (number === 2 || number === 3 || number === 4) {
                return 'вопроса';
            } else {
                return 'вопросов';
            }
        },
    },
});
