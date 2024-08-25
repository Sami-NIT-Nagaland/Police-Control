document.addEventListener('DOMContentLoaded', () => {
    const manualToggle = document.getElementById('manualToggle');
    const manualButtons = document.getElementById('manualButtons');
    const localitySelect = document.getElementById('localitySelect');
    const startAutoButton = document.getElementById('startAuto');

    let autoMode = false;
    let currentLight = 0;
    const lightIds = ["redLight", "yellowLight", "greenLight"];
    let intervalId;

    function startAutoMode() {
        if (autoMode) return;
        autoMode = true;
        console.log('Starting auto mode');
        manualButtons.style.display = 'none'; // Hide manual buttons
        intervalId = setInterval(changeLight, 1000); // Change light every second
    }

    function stopAutoMode() {
        if (!autoMode) return;
        autoMode = false;
        console.log('Stopping auto mode');
        clearInterval(intervalId);
        manualButtons.style.display = 'block'; // Show manual buttons
    }

    function changeLight() {
        lightIds.forEach(id => {
            document.getElementById(id).classList.remove("active");
        });

        document.getElementById(lightIds[currentLight]).classList.add("active");
        currentLight = (currentLight + 1) % lightIds.length;
    }

    manualToggle.addEventListener('click', () => {
        if (autoMode) return; // Do nothing if in auto mode
        manualButtons.style.display = manualButtons.style.display === 'block' ? 'none' : 'block';
        console.log(`Manual buttons display: ${manualButtons.style.display}`);
    });

    localitySelect.addEventListener('change', (event) => {
        const selectedLocality = event.target.value;
        console.log(`Selected locality: ${selectedLocality}`);
    });

    startAutoButton.addEventListener('click', () => {
        startAutoMode();
    });

    manualButtons.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            stopAutoMode();
            currentLight = 2; // Set to green light for manual actions
            changeLight();
        });
    });
});
