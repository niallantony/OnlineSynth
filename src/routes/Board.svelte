<script>
	import KeyBoard from './KeyBoard.svelte';
	import Visualiser from './Visualiser.svelte';
	import { SignalChain } from '$lib/SignalChain';
	import { EventBus } from '$lib/EventBus';
	import Amplifier from './Amplifier.svelte';

	const eventBus = EventBus();
	const signalChain = SignalChain(eventBus);
</script>

<KeyBoard {eventBus} />
<Visualiser {eventBus} />
<Amplifier {eventBus} />
