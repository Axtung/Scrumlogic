Vue.component('final', {
    props: ['total', 'texts'],
    data() {
        return {
            urlQuestion: 'json/question.json',
            correctQuestion: 0,
            allQuestion: 0,
            text: ''
        }
    },

    mounted() {
        this.$parent.getJson(this.urlQuestion)
            .then(data => {
                this.allQuestion = +data.length
            });
    },

    template: `<div class="final">
                <p>Тест завершен</p>
                <p>Вы правильно ответили</p>
                <p>на {{correctQuestion}} {{texts}} из {{allQuestion}}</p>
                </div> `
});