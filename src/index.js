import "./style.css";
import db from "./api";
import DOM from "./DOM";

const noteForm = document.querySelector("dialog#noteDialog form");

class App {
	constructor() {
		this.notes = [];
		this.loading = true;
	}
	async init() {
		try {
			const notes = await db.getNotes();
			this.notes = notes;
			console.log(this.notes);
			this.loading = false;
		} catch (err) {
			console.log(err);
		}
	}
	async addNote(data) {
		const id = crypto.randomUUID();
		const { title, content, addingDate } = data;
		const note = { id, addingDate, ...new Note(title, content) };
		this.notes = [...this.notes, note];
		DOM.renderNotes(this.notes);
		db.addNote(note);
	}
	async deleteNote(id) {
		this.notes = this.notes.filter((note) => note.id !== id);
		DOM.renderNotes(this.notes);
		db.deleteNote(id);
	}
	async editNote(id, updates) {
		this.notes = this.notes.map((note) => {
			if (note.id === id) {
				return {
					...note,
					...updates,
				};
			} else {
				return note;
			}
		});
		console.log(this.notes, "update");
		DOM.renderNotes(this.notes);
		const modifiedNote = this.notes.find((note) => note.id === id);
		db.editNote(id, modifiedNote);
	}
}

class Note {
	constructor(title, content) {
		this.title = title;
		this.content = content;
	}
}

export const app = new App();
app.init().then(() => {
	DOM.renderNotes(app.notes);
});

noteForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const dialog = e.target.closest("dialog");
	const dialogMode = dialog.getAttribute("data-mode");

	const data = new FormData(noteForm);
	const noteData = {
		title: data.get("note-title"),
		content: data.get("note-text"),
	};
	if (dialogMode === "add") {
		app.addNote({
			...noteData,
			addingDate: new Date(Date.now()),
		});
	} else if (dialogMode === "edit") {
		const noteId = dialog.getAttribute("data-noteId");
		app.editNote(noteId, noteData);
	}
	DOM.closeDialog();
});
