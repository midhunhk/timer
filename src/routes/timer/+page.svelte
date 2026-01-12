<script>
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';

    let minutes = 10;
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

    onMount(() => {
        if (!browser) return;

        // initial read from URL on client
        const params = new URLSearchParams(window.location.search);
        const m = parseInt(params.get('minutes') ?? '', 10);
        if (!Number.isNaN(m) && m > 0) minutes = m;

        startTimer();

        // update if client-side navigation changes the query param
        const unsubscribe = page.subscribe(($page) => {
            const m2 = parseInt($page.url.searchParams.get('minutes') ?? '', 10);
            if (!Number.isNaN(m2) && m2 > 0 && m2 !== minutes) {
                minutes = m2;
                startTimer();
            }
        });

        onDestroy(() => {
            clearInterval(timer);
            unsubscribe();
        });
    });
</script>

<div class="hero is-fullheight is-flex is-justify-content-center is-align-items-center">
    <div class="box has-text-centered p-6 has-background-success" style="min-width: 300px;">
        <h1 class="title is-size-1">{formatTime(remaining)}</h1>
        <p class="mt-6">
            <a href="/" class="button is-light is-outlined">Back</a>
        </p>
    </div>
</div>