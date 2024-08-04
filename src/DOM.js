import { app } from "./index.js";

export default class DOM {
	static notesContainer = document.querySelector(".notes-container");
	static dialog = document.querySelector("dialog#noteDialog");

	static renderNotes(notes) {
		DOM.notesContainer.innerHTML = "";
		const addNoteBtn = DOM.createAddNoteBtn();

		DOM.notesContainer.appendChild(addNoteBtn);

		for (const note of notes) {
			const noteElem = DOM.createNote(note);
			DOM.notesContainer.appendChild(noteElem);
		}
	}
	static createAddNoteBtn() {
		const button = document.createElement("button");
		button.className = "grid place-items-center bg-gray-100 shadow shadow-black/20 rounded-lg min-h-80 h-80";
		button.innerHTML = `
		<div class="w-20 text-gray-300">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
				fill="currentColor"
			>
				<!--Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
				/>
			</svg>
		</div>
		`;

		button.addEventListener("click", () => {
			DOM.setDialogAddMode();
			DOM.showDialog();
		});
		return button;
	}
	static showDialog() {
		DOM.dialog.showModal();
	}
	static closeDialog() {
		DOM.resetDialog();
		DOM.dialog.close();
	}
	static resetDialog() {
		this.dialog.removeAttribute("data-noteId");
		DOM.setDialogAddMode("add");
		DOM.clearFormInputs();
	}
	static setDialogEditMode() {
		DOM.dialog.setAttribute("data-mode", "edit");

		const noteDialogTitle = this.dialog.querySelector(".note-dialog-title");
		const submitBtn = this.dialog.querySelector("button[type=submit]");

		noteDialogTitle.textContent = "Edit Note";
		submitBtn.textContent = "Edit";
	}
	static setDialogAddMode() {
		DOM.dialog.setAttribute("data-mode", "add");

		const noteDialogTitle = this.dialog.querySelector(".note-dialog-title");
		const submitBtn = this.dialog.querySelector("button[type=submit]");

		noteDialogTitle.textContent = "Add A New Note";
		submitBtn.textContent = "Add";
	}
	static fillFormInputs({ title, content }) {
		const form = document.querySelector("dialog#noteDialog form");
		const titleInput = form.querySelector("input#note-title");
		const textInput = form.querySelector("textarea#note-text");

		titleInput.value = title;
		textInput.value = content;
	}
	static storeCurrentNoteId(id) {
		DOM.dialog.setAttribute("data-noteId", id);
	}
	static clearFormInputs() {
		const inputs = document.querySelectorAll("dialog#noteDialog form input,textarea");
		inputs.forEach((input) => (input.value = ""));
	}
	static createNote(note) {
		const article = document.createElement("article");
		article.className = `flex flex-col min-h-80 h-80 bg-white shadow shadow-black/20 rounded-lg overflow-y-auto`;
		article.innerHTML = `
			<h3 class="text-2xl font-bold py-6 text-center sticky top-0 bg-white">${note.title}
			<div class="absolute h-1 w-full bottom-0" style="background-image: radial-gradient( circle 382px at 50% 50.2%,  rgba(73,76,212,1) 0.1%, rgba(3,1,50,1) 100.2% );"></div>
			</h3>
			<div class="px-6 pb-6 mt-4 flex-1">
				<p>${note.content}</p>
			</div>
			<div class="pb-6 px-6 text-white font-bold flex justify-center gap-12">
				<button class="delete-note-btn bg-red-600 flex items-center gap-2 p-2 rounded-lg">
          <div class="w-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><!--Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </div>
				Delete</button>
        <button class="edit-note-btn bg-blue-500 flex items-center gap-2 p-2 px-3 rounded-lg">
          <div class="w-4">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
          </div>
				Edit</button>

			</div>
		`;
		const deleteBtn = article.querySelector(".delete-note-btn");
		deleteBtn.addEventListener("click", () => {
			app.deleteNote(`${note.id}`);
		});
		const editBtn = article.querySelector(".edit-note-btn");
		editBtn.addEventListener("click", () => {
			DOM.setDialogEditMode();
			DOM.storeCurrentNoteId(note.id);
			DOM.fillFormInputs({ title: note.title, content: note.content });
			DOM.showDialog();
		});

		return article;
	}
}

const dialogCloseBtn = document.querySelector("dialog#noteDialog .close-dialog");
dialogCloseBtn.addEventListener("click", () => {
	DOM.closeDialog();
});
