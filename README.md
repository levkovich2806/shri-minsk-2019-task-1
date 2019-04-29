# shri-minsk-2019-task-1


https://shri2019.herokuapp.com/

<h1 align="center">Домашняя работа - Адаптивная верстка</h1>
<h2 align="center">Выполнил - Левкович Сергей</h2>

1. Сборка проекта - npm install + npm run build
2. Собранные файлы проекта будут расоложены в папке dist

<h3>Что в проекте:</h3>
<p>- React НЕ использовался;</p>
<p>- с помощью webpack производится сборка проекта по установленным правилам в файле webpack.config.js, в частности: транспилятор кода (babel), сборщик scss (перевод в css и его минификация), сборщик изображений и шрифтов;</p>
<p>- перед каждой сборкой, спомощью плагина clean-webpack-plugin производится полная очистка папки dist;</p>
<p>- добавлен StyleLint (в частности в git hook (pre-commit)с использованием husky);</p>
<p>- добавлен ESLint.</p>

<h3>Почему я использовал те или иные вещи:</h3>
<p>1. SCSS - работаю с ним уже несколько месяцев и доволен выбором - переменные, возможность использовать вложенности (вида &__), математические операторы и т.п.;</p>
<p>2. Для парсинга json написал <b>собственный парсер</b>, что бы полностью контролировать этот процесс (src/js/parser.js) - суть парсера (думаю, как и у любого другого) состоит в том, что бы пройтись последовательно по всем элементам массива заметок и, исходя из конкретных условий, "подготовить" HTML код отдельной заметки - затем все они добавляются в один "контейнер";</p>
<p></p>

<h3>На что можно обратить внимание по верстке:</h3>
<p>1. Добавлено отображение элементов "подтвердить" и "редактировать" по "ховеру" на заметку.</p>
<p>2. Добавлено отображение границы заметки по "ховеру" на заметку.</p>
<p>3. Добавлена "подсветка" цветных блоков в "шапке" заметок</p>
<p>4. Добавлены hover и active на кнопки Найти и Добавить</p>
<p>5. Постарался сделать, что бы при изменениях размеров экрана заметки меняли свое положение почаще, что бы не было совсем единобразно</p>
<p>6. На картинки "под заметками" добавил ссылки на открытие полной картинки</p>
<p>7. При малых размерах экрана (мобильники) появляется возможность "прокручивать" список "цветов" заметок
<p>8. По клику по заметке не делал вызов модального окна - модальное окно буду вызывать позже при клике на "Добавить" - прошу не снимать за это баллы в 1 домашнем задании.</p>
<p>... Все смены стилей по hover или active производятся с transition</p>

<h1 align="center">Домашняя работа 2 - Типизация</h1>
<h3>Что сделано:</h3>
<p>К проекту подключен TypeScript;</p>
<p>tslint подключен (eslint был подключен ранее);</p>
<p>подключена проверка tslint (eslint была подключена ранее) в husky на pre-commit;</p>
<p>описан набор интерфейсов (src/ts/interfaces/) ;</p>
<p>создан класс Notes с нужными методами;</p>

<h3>На что обратить внимание:</h3>
<p>Нигде не используется явно <any></p>
<p>в tsconfig.json установлен "strict": true;</p>
<p>// @ts-ignore нигде не использовал</p>
<p>по моему, "someVar as SomeType" нигде не использовал

<h3>Алгоритм выбора размера заметки: </h3>
<p>Для тестирования корректности работы моего алгоритма вычисления размера заметки создал метод createRandomNote (/src/js/helper.js), который случайным образом (даже выходят отличные от JSON заметки - на пример, появляются attachment там, где их не было в примерах - считаю, что лучше отработать сразу и такие вырианты) формируют заметку - если запустить проект, то по нажатию на "Добавить" автоматически добавляется новая заметка и перерисовывается интерфейс (про perfomance этого процесса пока не было времени подумать...)</p>
<h4>Сам алгоритм</h4>
<p>Я решил отказаться от варианта, когда мы проверяем один какой-то "случай" и сразу возвращаем результат, на пример, при маленьком размере текста в заметке с типов "text" можно было бы сразу вернуть "s" и получить в итоге заметку маленького размера с 5 attachment ссылками - в этом случае они минимум по высоте будет подходить под "m" и т.п. - по этому было принято решение проводить полный анализ, по моему мнению, важных элементов с последующей постобработкой полной картины - если критериев того, что заметка подходит под размер 'm' больше 2 (3 и более), то принимает, что заметка должна быть размера 'l'; если кол-во с критерием 'm' от 1 до 2, то возвращаем 'm'; если не найдено критериев для 'm', то возвращаем 's'</p>
<p>Так же если мы находим хоть одно предположение, что заметка подходит под критерий БОЛЬШАЯ, то сразу возвращаем 'l' (на пример, при  кол-ве item в заметках типа "list" или при большом размере текста в "test")</p>
<p>Остальные критерии таковы:</p>
<p> - если тип "image" - это 'm';</p>
<p> - если тип "text": если размер текста больше 450 - это 'l'; если больше 150 - это 'm';</p>
<p> - если в заметке более 5 tag, то это 'm';</p>
<p> - если attachment больше 3, то это 'm';</p>

<h1>Домашняя работа 3 - Node.js</h1>
<h3>Запуск - npm start (клиент и сервер одновременно)</h3>
<p>Сервер написан на express, поднимается на 8000 порту</p>
<p>Для получения коллекции заметок реализован GET /api/cards</p>
<p>Для добавления заметки релизован POST /api/cards.</p>
<p>Для удалениея заметки реализован DELETE /api/cards/:id</p>
<p>Для модификации заметки реализован PATCH /api/cards/:id</p>
<p>Для получения заметок отправленных в архив реализован /api/cards/archive</p>
<p>Реализована возможность получать отфильтрованный список заметок в зависимости от переданного id цвета заметки, на пример, /api/cards?color=1. Если передан цвет не содержащийся в коллекции цветов - сервер отвечает "Incorrect color" со статусом 400</p>
<p>Все роуты, не описанные на сервере отдают Page not found (с тэгом h1) со статусом 404</p>
<p>Так же в файле server/utils/utils.js созданы вспомогательные функции, в частности:</p>
  <ul>
  <li>getColorsHash() - создаем хэш коллекции цветов для доступа к нужному цвету по id без постоянного мапинга массива</li>
  <li>getCardSequence() - увеличиваем счетчик id заметок (если бы была реализована БД, то это помогло бы нам избежать дубликатов ID (работает быстрее, чем поиск ID последнего добавленного жлемента))</li>
  <li>getCardSize() - функция, которая по придуманному мною во 2 домашнем задании алгоритму вовзращает размер заметки, если он не был передан с клиента при добавлении новой заметки</li>
  <li> и др. - их назначение описаны в файле
  </ul>
<hr>
<p>На стороне клиента реализованы функции, с помощью которых происходит обращение к серверу за нужной информацией (или передача информации на сервер) - src/service/main.js - запрос заметок, добавление заметки, модицикация заметки, удаление заметки, изменение статуса заметки ( archive (status = 0) или inUse (status = 1) )</p>
<p>Так же в отдельно созданном файле utils/request.js подготовлена асинхронная функция sendRequest. Для взимодействия с сервером используется fetch - выбран из-за того, что возвращает Promise,что бы можно было корректно обрабатывать любой вид ошибки или корректный ответа сервера. Так же много с ним работал и зарекомендовал себя только с положительной стороны</p>

<h1>Что дальше?</h1>
<p>Так как 3 домашняя работа не предусматривала привязку всех запросов к сайту, в дальнейшем приложение будет переведено на React с последующим подключением всех API к элементам системы</p>


<h1 align="center">Домашняя работа 4 - React+Redux</h1>
<h3>Запуск реакта + node - npm start</h3>
<h3>Что сделано:</h3>
<p>1. Страница разбита на компоненты (src/js/components)</p>
<p>2. Разработан функционла фильтрации карточек по цветам (можно выбрать не один)</p>
<p>3. Добавлено интерактивное взаимеодйствие с карточками - добавлеие, редактирование, перенос в архив и удаление (вообще) карточки, которая в архиве</p>
<p>4. К проекту подключен редакс, запросы к API осуществляются через асинхронные действия</p>
<p>5. Прикрутил combineReducers, что бы можно было использовать два редюсера - один для карточек, второй для поиска (смысла большого не вкладывал - хотел показать, что и такое можно использовать и использовал :) )</p>
<p>6. Выбранные фильты сохраняются в sessionStorage и восстанавливаются, если перезагрузить страницу</p>
<p>7. Реализован "Поиск" - без перезароса на сервер - поиск происходит по Названию и Тексту (описание) - ищется на нажатию на Найти или Enter, когда Input в фокусе. Сначала сделал на onChange, но потом вспомнил про кнопку и переделал на поиск по запросу</p>
<p>8. Разработал окно добавления/редактирования заметки - не использовал upload, т.к. это не входило в обязательно, но сильно усложнило бы приложение - хотелось сделать побольше необходимого до дедлайна</p>
<p>9. Почти все действия происходят через запросы с сервера - большого смысла сюда не вкладывал (не думал про то, что может не надо так часто или надо запрашивать с сервера) - главная задача была взаимодействие с разработанным API</p>
<p>10. Переработана часть функционала сервера (по сравнению со 2 домашкой) - в частности, фильтр по нескольких цветам, запросы ВСЕХ данных, активных и архивных данных с использованием цветов и т. п.</p>

<h3>Что еще можно отметить:</h3>
<p>Все что смог забросил в константы (старался не использоваться в коде "магических" строк - все в константах)</p>


<h1 align="center">Домашняя работа 5 - Тестирование</h1>
<h3>Запуск тестов проекта - npm run test</h3>
<h3>Что сделано:</h3>
<p>Прописаны тесты к утилитам frontend (JEST);</p>
<p>Прописаны тесты к компонентам frontend (JEST, enzyme, Snapshot, simulate );</p>
<p>Прописаны тесты к утилитам backend (JEST - проверка на корректную работу утилит);</p>
<p>Прописаны тесты к API backend (использовался supertest - где-то применены проверки на статус, где-то на содержимое);</p>
