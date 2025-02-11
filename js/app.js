new Vue({
    el: '#app',
    data: {
        newCardTitle: '',
        isFirstColumnLocked: false,
        maxCardsInSecondColumn: 5,
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
    created() {
        const savedData = localStorage.getItem('kanbanData');
        if (savedData) {
            try {
                const { columns, isFirstColumnLocked } = JSON.parse(savedData);
                columns.forEach(column => {
                    column.cards.forEach(card => {
                        if (card.completedAt && typeof card.completedAt === 'string') {
                            card.completedAt = new Date(card.completedAt);
                        }
                    });
                });
                this.columns = columns;
                this.isFirstColumnLocked = isFirstColumnLocked;
            } catch (e) {
                console.error("Ошибка при загрузке данных из localStorage:", e);
                localStorage.removeItem('kanbanData');
            }
        }
    },
    watch: {
        columns: {
            handler(newColumns) {
                localStorage.setItem('kanbanData', JSON.stringify({
                    columns: newColumns,
                    isFirstColumnLocked: this.isFirstColumnLocked
                }));
            },
            deep: true
        },
        isFirstColumnLocked(newValue) {
            localStorage.setItem('kanbanData', JSON.stringify({
                columns: this.columns,
                isFirstColumnLocked: newValue
            }));
        }
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
            if (card.newItem.trim() && card.items.length < 5) {
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
                if (this.columns[1].cards.length < this.maxCardsInSecondColumn) {
                    this.moveCard(card, 0, 1);
                } else {
                    this.isFirstColumnLocked = true;
                }
            } else if (columnIndex === 1 && progress <= 0.5) {
                this.moveCard(card, 1, 0);
                this.isFirstColumnLocked = false;
            } else if (columnIndex === 1 && progress === 1) {
                card.completedAt = new Date();
                this.moveCard(card, 1, 2);
                this.isFirstColumnLocked = false;
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
            if (!date) return '';
            const dateObj = (typeof date === 'string') ? new Date(date) : date;
            return new Intl.DateTimeFormat('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(dateObj);
        }
    }
});