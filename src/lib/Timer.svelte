<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    export let minutes = 10;

    const dispatch = createEventDispatcher();

    let total = minutes * 60;
    let remaining = total;
    let timer;

    function formatTime(sec) {
        const mm = String(Math.floor(sec / 60)).padStart(2, '0');
        const ss = String(sec % 60).padStart(2, '0');
        return `${mm}:${ss}`;
    }

    function startTimer() {
        clearInterval(timer);
        total = minutes * 60;
        remaining = total;
        timer = setInterval(() => {
            if (remaining > 0) remaining -= 1;
            else clearInterval(timer);
        }, 1000);
    }

    $: if (minutes != null) startTimer();

    onMount(startTimer);
    onDestroy(() => clearInterval(timer));

    function close() {
        clearInterval(timer);
        dispatch('close');
    }
</script>

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.99);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }
    .box-centered {
        min-width: 300px;
        text-align: center;
    }

    /* more prominent countdown style */
    .countdown {
        font-family: 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
        font-weight: 800;
        color: #fff;
        text-shadow: 0 6px 18px rgba(88, 96, 94, 0.2);
        letter-spacing: 0.02em;
        line-height: 1;
        margin: 0;
        /* responsive large size */
        font-size: clamp(3rem, 14vw, 10rem);
    }
</style>

<div class="overlay" role="dialog" aria-modal="true">
    <div class="box box-centered has-background-success p-6">
        <h1 class="countdown" role="timer" aria-live="polite" aria-atomic="true">
            {formatTime(remaining)}
        </h1>
        <p class="mt-6">
            <button class="button is-light is-outlined" on:click={close}>Close</button>
        </p>
    </div>
</div>