<script>
	let { sendNote, removeNote, note } = $props();
</script>

<button onmousedown={() => sendNote(note)} onmouseup={() => removeNote(note)}>{note}</button>
