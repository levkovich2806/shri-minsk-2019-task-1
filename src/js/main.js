import data from './shri';
//import Notes from "../ts/Notes.ts";
import NotesColl from '../ts/NotesColl.ts';
import createRandomNote from './helper';

document.addEventListener('DOMContentLoaded', function() {
  initPage();

  //const notes = Notes.factory(data.notes);

  // for (let i of notes) {
  //   console.log(i);
  // }

  const notesCollecion = NotesColl.factory(data);
  notesCollecion.generateNotesHtml();

  const btnAdd = document.getElementById('btnAdd');
  btnAdd.addEventListener('click', e => {
    e.preventDefault();
    //Показываем модалку с формой для добавления новой заметки, пока сдесь будем вызывать статическое добавление рандомной заметки
    const newNote = createRandomNote();
    notesCollecion.addNote(newNote);
  });
});

function createTitleBlock({ color }) {
  return `
    <div class="block" style="background-color: ${color}"></div>
  `;
}

function initPage() {
  const mainNav = document.getElementsByClassName('js-menu');
  const navBarToggle = document.getElementById('js-navbar-toggle');

  navBarToggle.addEventListener('click', function() {
    for (let i = 0; i < mainNav.length; ++i) {
      const item = mainNav[i];
      item.classList.toggle('active');
    }
  });

  const notesBlocks = document.getElementsByClassName('notes__title_blocks');

  data.colors.forEach(color => {
    notesBlocks[0].innerHTML += createTitleBlock(color);
  });
}
