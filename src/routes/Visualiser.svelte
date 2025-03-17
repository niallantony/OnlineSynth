<script>
	let { input } = $props();

	let played = $state([]);

	const updateDisplay = (data) => {
		played = data.map((note) => note.name);
	};

	const passSignal = (data) => {
		updateDisplay(data);
	};

	input.attachOutput({ passSignal });
</script>

<div class="visualiser">
	<h2>Currently playing:</h2>
	<p>{played}</p>
</div>
