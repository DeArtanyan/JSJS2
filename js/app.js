new Vue({
    el: '#app',
    data: {
        newCardTitle: '',
        columns: [
            {
                title: 'Столбец 1',
                cards: []
            },
            {
                title: 'Столбец 2',
                cards: []
            },
            {
                title: 'Столбец 3',
                cards: []
            }
        ]
    },
    methods: {
        addCard() {
            if (this.newCardTitle.trim()) {
                this.columns[0].cards.push({
                    title: this.newCardTitle,
                    items: [],
                    newItem: ''
                });
                this.newCardTitle = '';
            }
        },
        addListItem(card) {
            if (card.newItem.trim()) {
                card.items.push({
                    text: card.newItem,
                    completed: false
                });
                card.newItem = '';
            }
        }
    }
});