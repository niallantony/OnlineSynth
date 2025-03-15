import { vi, beforeEach, describe, test, expect } from 'vitest';
import { EventBus } from './EventBus';

describe('EventBus initialises', () => {
	test('Event bus initialises', () => {
		const eventBus = EventBus();

		expect(eventBus).toBeDefined();
	});

	test('subscribe functions work', () => {
		const eventBus = EventBus();
		const mockCb = vi.fn();

		eventBus.subscribe('event', mockCb);
		eventBus.publish('event', 1);

		expect(mockCb).toHaveBeenCalledExactlyOnceWith(1);
	});

	test('Multiple subscribers possible', () => {
		const eventBus = EventBus();
		const mockCb1 = vi.fn();
		const mockCb2 = vi.fn();

		eventBus.subscribe('event', mockCb1);
		eventBus.subscribe('event', mockCb2);
		eventBus.publish('event', 1);

		expect(mockCb1).toHaveBeenCalledExactlyOnceWith(1);
		expect(mockCb2).toHaveBeenCalledExactlyOnceWith(1);
	});

	test('Unsubscribe possible', () => {
		const eventBus = EventBus();
		const mockCb1 = vi.fn();
		const mockCb2 = vi.fn();

		eventBus.subscribe('event', mockCb1);
		eventBus.subscribe('event', mockCb2);
		eventBus.unsubscribe('event', mockCb1);
		eventBus.publish('event', 1);

		expect(mockCb1).not.toHaveBeenCalled();
		expect(mockCb2).toHaveBeenCalledExactlyOnceWith(1);
	});

	test('No subscribers is fine', () => {
		const eventBus = EventBus();

		expect(() => eventBus.publish('event', 1)).not.toThrow();
	});

	test('Unsubscribing a non-existent subscriber does not throw', () => {
		const eventBus = EventBus();

		expect(() =>
			eventBus.unsubscribe('event', () => {
				return 1;
			})
		).not.toThrow();
	});

	test('Multiple subscriptions to the same event should only call once', () => {
		const eventBus = EventBus();
		const mockCb = vi.fn();

		eventBus.subscribe('event', mockCb);
		eventBus.subscribe('event', mockCb);
		eventBus.publish('event', 1);

		expect(mockCb).toHaveBeenCalledExactlyOnceWith(1);
	});

	test('Differentiates between different event names', () => {
		const eventBus = EventBus();
		const mockCb1 = vi.fn();
		const mockCb2 = vi.fn();

		eventBus.subscribe('event', mockCb1);
		eventBus.subscribe('unevent', mockCb2);
		eventBus.publish('event', 1);

		expect(mockCb1).toHaveBeenCalledExactlyOnceWith(1);
		expect(mockCb2).not.toHaveBeenCalled();
	});
});
