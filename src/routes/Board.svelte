<script>
	import KeyBoard from './KeyBoard.svelte';
	import Visualiser from './Visualiser.svelte';
	import { SignalChain } from '$lib/SignalChain';
	import { EventBus } from '$lib/EventBus';

	const eventBus = EventBus();
	const signalChain = SignalChain(eventBus);
</script>

<KeyBoard {eventBus} />
<Visualiser {eventBus} />
