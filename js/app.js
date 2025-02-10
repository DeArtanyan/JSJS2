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
            const totalItems = card.items.length;
            const completedItems = card.items.filter(item => item.completed).length;
            const progress = completedItems / totalItems;

            if (columnIndex === 0 && progress > 0.5) {
                this.moveCard(card, 0, 1);
            } else if (columnIndex === 1 && progress <= 0.5) {
                this.moveCard(card, 1, 0);
            }
        },
        moveCard(card, fromColumnIndex, toColumnIndex) {
            this.columns[fromColumnIndex].cards = this.columns[fromColumnIndex].cards.filter(c => c !== card);
            this.columns[toColumnIndex].cards.push(card);
        }
    }
});