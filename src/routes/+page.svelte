<script>
    import Timer from '$lib/Timer.svelte';
    let customMinutes = '';
    let showTimer = false;
    let timerMinutes = 10;

    function startWith(m) {
        timerMinutes = m;
        showTimer = true;
    }

    function startCustom() {
        const m = parseInt(customMinutes, 10);
        if (!Number.isNaN(m) && m > 0) {
            timerMinutes = m;
            showTimer = true;
        } else {
            alert('Please enter a positive integer for minutes.');
        }
    }
</script>

<div class="container">
    <div class="section">
        <div class="columns is-centered">
            <div class="column is-half is-centered has-text-centered">
                <h1 class="is-size-1">Start a Timer</h1>
                <p class="my-6">
                    <button class="button is-rounded is-large is-success" on:click={() => startWith(10)}>10 Minute Timer</button>
                </p>
                <p class="my-6">
                    <button class="button is-rounded is-medium is-success" on:click={() => startWith(15)}>15 Minute Timer</button>
                </p>
                <p class="my-6">
                    <button class="button is-rounded is-medium is-success" on:click={() => startWith(20)}>20 Minute Timer</button>
                </p>
                <form on:submit|preventDefault={startCustom} class="controls" style="display:flex; gap:0.5rem; justify-content:center;">
                    <div class="control">
                        <input class="input is-large" type="number" min="1" bind:value={customMinutes} placeholder="Enter Minutes" aria-label="Minutes">
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-large is-success">Custom Timer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{#if showTimer}
    <Timer minutes={timerMinutes} on:close={() => showTimer = false} />
{/if}