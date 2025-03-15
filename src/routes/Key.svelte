<script>
	let { sendNote, releaseNote, note } = $props();
</script>

<button
	onpointerdown={() => sendNote(note)}
	onpointerup={() => releaseNote(note)}
	onpointerout={() => releaseNote(note)}>{note.name}</button
>
