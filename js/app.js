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
                    newItem: '',
                    completedAt: null
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
            } else if (columnIndex === 1 && progress === 1) {
                card.completedAt = new Date();
                this.moveCard(card, 1, 2);
            } else if (columnIndex === 2 && progress < 1) {
                card.completedAt = null;
                this.moveCard(card, 2, 1);
            }
        },
        moveCard(card, fromColumnIndex, toColumnIndex) {
            this.columns[fromColumnIndex].cards = this.columns[fromColumnIndex].cards.filter(c => c !== card);
            this.columns[toColumnIndex].cards.push(card);
        },
        formatDate(date) {
            return new Intl.DateTimeFormat('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
        }
    }
});