describe('Перемещение ингредиента в конструктор', function() {

    it('Открыли сайт', function() {
      cy.visit('http://localhost:3000');
    });

    it('Открыта страница Конструктор', function() {
      cy.contains('Соберите бургер');
    });

    it('Переместили ингредиенты в конструктор', function() {
      const dataTransfer = new DataTransfer();
      //Добавили булку
      cy.get('[data-id="60d3b41abdacab0026a733c6"]').trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-type="constructor"]').trigger('drop', {
        dataTransfer
      });

      //Добавили соусец

      cy.get('[data-id="60d3b41abdacab0026a733cc"]').trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-type="constructor"]').trigger('drop', {
        dataTransfer
      });

      //Добавили мяса
      cy.get('[data-id="60d3b41abdacab0026a733c9"]').trigger('dragstart', {
        dataTransfer
      });

      cy.get('[data-type="constructor"]').trigger('drop', {
        dataTransfer
      });

      cy.get('[data-element="totalPrice"]').should('have.text', 3937);
    });

    it('Создали заказ и закрыли модальное окно', function() {
      cy.get('main button').as('orderBtn');
      cy.get('@orderBtn').trigger('click');

      cy.location('pathname').should('eq', '/login');

      cy.get('[data-element="loginForm"]').as('loginForm');
      cy.get('@loginForm').find('input[name="email"]').type('feel2036@yandex.ru');
      cy.get('@loginForm').find('input[name="password"]').type('1234567');

      cy.get('@loginForm').submit();

      cy.location('pathname').should('eq', '/');
      cy.get('@orderBtn').trigger('click');


      cy.get('[data-element="loader"]').should('exist');

      cy.get('[data-element="modal"]', {timeout: 20000}).should('exist');
      cy.get('[data-element="orderNumber"]').should('exist');

      cy.get('[data-element="modal"] svg').trigger('click');
      cy.get('[data-element="modal"]').should('not.exist');

    });

    it('Открыли модальное окно ингредиента и закрыли его', function() {

      cy.get('[data-id="60d3b41abdacab0026a733cc"]').trigger('click');

      cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733cc');
      cy.get('[data-element="modal"]').as('ingredientModal');
      cy.get('@ingredientModal').should('exist');

      cy.get('@ingredientModal').find('[data-element="modalIngrImage"]').
      should('have.attr', 'src').
      and('eq', 'https://code.s3.yandex.net/react/code/sauce-02-large.png');

      cy.get('@ingredientModal').find('[data-element="modalIngrName"]').should('have.text', 'Соус Spicy-X');
      cy.get('@ingredientModal').find('[data-element="modalIngrCalories"]').should('have.text', '30');
      cy.get('@ingredientModal').find('[data-element="modalIngrProteins"]').should('have.text', '30');
      cy.get('@ingredientModal').find('[data-element="modalIngrFat"]').should('have.text', '20');
      cy.get('@ingredientModal').find('[data-element="modalIngrCarbo"]').should('have.text', '40');

      cy.get('@ingredientModal').find('svg').trigger('click');
      cy.get('@ingredientModal').should('not.exist');
    });
}); 