;(function () {
    let todoApps = [];
    let filters = ['all', 'active', 'completed'];
    let filter = 'all';
    let completeAll = false;

    function Todo(todoName, parentEl, todoItems = []) {
        if (!todoName) {
            return new Error('Please supply Todo name');
        }

        if (typeof parentEl !== 'string') {
            return new Error('Parent element is not a CSS selector');
        }

        this.$parent = document.querySelector(parentEl);
        this.$ul = this.$parent.querySelector('ul.todo-list');
        this.$input = this.$parent.querySelector('input.create-todo');
        this.$counter = this.$parent.querySelector('#counter');
        this.$completeAll = this.$parent.querySelector('.complete-all');

        this.todoItems = todoItems;

        this.bindEvents();

        this.render();
    }

    Todo.prototype.bindEvents = function () {
        let self = this;

        window.addEventListener('hashchange', function () {
            let hash = location.hash.replace(/\#+\/+/gi, '');



            switch(hash) {
                case '':
                filter = 'all';
                break;
                case 'active':
                filter = 'active';
                break;
                case 'completed':
                filter = 'completed';
                break;
                default:
                filter = 'all';
            }

            self.render();
        }, false);

        this.$parent.addEventListener('click', function (e) {
            if (e.target.classList.contains('checkbox')) {
                let id = e.target.parentNode.parentNode.getAttribute('data-id');
                self.toggleListItem(id);
                self.render();
            }

            if (e.target.classList.contains('delete') ) {
                let id = e.target.parentNode.parentNode.getAttribute('data-id');
                if(confirm('Are you sure')) {
                self.deleteListItem(id);
                self.render();
                }
            }

            if(e.target.classList.contains('complete-all')){
                self.completeAll();
                self.render();
            }
            
        }, false);

        this.$input.addEventListener('keyup', function (e) {
            // Check for enter!
            if (e.which === 13 && e.target.value !== '') {
                self.todoItems.push({
                    id: +new Date(),
                    title: e.target.value,
                    completed: false
                });

                self.render();
                e.target.value = '';
            }
        }, false);
    };

    Todo.prototype.render = function () {
        let self = this;

        while (this.$ul.firstChild) {
            this.$ul.removeChild(this.$ul.firstChild);
        }

        this.todoItems.forEach(function (todo) {
           
            if(filter === 'all' 
                || (filter === 'active' && !todo.completed) 
                || (filter === 'completed' && todo.completed) ) {

            let $todoLi = self.createListItem(todo);

            self.$ul.appendChild($todoLi);
        }
        });

        this.updateCounter();

        if (completeAll) {
            this.$completeAll.classList.add('completed');
        } else {
            this.$completeAll.classList.remove('completed');
        }

    };

    Todo.prototype.completeAll = function() {
        completeAll = !completeAll;

        this.todoItems.map(function (todo) {
            return todo.completed = completeAll;
        });


    };

    Todo.prototype.updateCounter = function() {
        let count = this.todoItems.filter(function (todo) {
            return !todo.completed;
        });

        this.$counter.textContent = count.length;
    };

    Todo.prototype.createListItem = function (todoObj) {
        let $li = document.createElement('li');
        $li.setAttribute('data-id', todoObj.id);

        if (todoObj.completed) {
            $li.setAttribute('class', 'completed');
        }

        let $div = document.createElement('div');
        $div.setAttribute('class', 'list-item');

        let $checkbox = document.createElement('span');
        $checkbox.setAttribute('class', 'checkbox');

        let $label = document.createElement('label');

        let $text = document.createTextNode(todoObj.title);

        let $delete = document.createElement('span');
        $delete.setAttribute('class', 'delete');

        $div.appendChild($checkbox);
        $div.appendChild($label);
        $div.appendChild($delete);

        $label.appendChild($text);

        $li.appendChild($div);

        return $li;
    };

    Todo.prototype.deleteListItem = function (id) {
        this.todoItems = this.todoItems.filter(function (todo) {
            return todo.id !== +id;
        });
    };

    Todo.prototype.toggleListItem = function (id) {
        let todoItem = this.todoItems.find(function (todo) {
            return todo.id === +id;
        });

        if (todoItem) {
            todoItem.completed = !todoItem.completed;
        }
    };

    window.todo = new Todo("DHTML Todo Project", "#firstTodo");
})();

