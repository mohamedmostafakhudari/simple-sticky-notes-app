const API_URL = "http://localhost:3000";
const Notes_EndPoint = "/notes";

async function getNotes() {
	try {
		const response = await fetch(`${API_URL}${Notes_EndPoint}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

async function getNote(id) {
	try {
		const response = await fetch(`${API_URL}${Notes_EndPoint}/${id}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

async function addNote(note) {
	try {
		const response = await fetch(`${API_URL}${Notes_EndPoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

async function deleteNote(id) {
	try {
		const response = await fetch(`${API_URL}${Notes_EndPoint}/${id}`, {
			method: "DELETE",
		});
		console.log("deleted successfully");
	} catch (err) {
		console.log(err);
	}
}

async function editNote(id, updates) {
	try {
		const response = await fetch(`${API_URL}${Notes_EndPoint}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updates),
		});
		console.log("deleted successfully");
	} catch (err) {
		console.log(err);
	}
}

export default {
	getNotes,
	getNote,
	addNote,
	deleteNote,
	editNote,
};
