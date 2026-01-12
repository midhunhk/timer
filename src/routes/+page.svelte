<script>
    import { goto } from '$app/navigation';
    let customMinutes = '';

    function startCustom() {
        const m = parseInt(customMinutes, 10);
        if (!Number.isNaN(m) && m > 0) {
            goto(`timer?minutes=${m}`);
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
                    <a href="timer?minutes=10" class="button is-rounded is-large is-success">10 Minute Timer</a>
                </p>
                <p class="my-6">
                    <a href="timer?minutes=15" class="button is-rounded is-medium is-success">15 Minute Timer</a>
                </p>
                <p class="my-6">
                    <a href="timer?minutes=20" class="button is-rounded is-medium is-success">20 Minute Timer</a>
                </p>
                <form on:submit|preventDefault={startCustom} class="controls" style="display:flex; gap:0.5rem;">
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
