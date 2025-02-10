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
        },
        checkCardProgress(card, columnIndex) {
            if (columnIndex === 0) {
                const totalItems = card.items.length;
                const completedItems = card.items.filter(item => item.completed).length;
                if (completedItems > totalItems / 2) {
                    this.moveCardToSecondColumn(card);
                }
            }
        },
        moveCardToSecondColumn(card) {
            this.columns[0].cards = this.columns[0].cards.filter(c => c !== card);
            this.columns[1].cards.push(card);
        }
    }
});