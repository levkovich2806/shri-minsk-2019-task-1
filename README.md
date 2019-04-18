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
