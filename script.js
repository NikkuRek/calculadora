let K = 0; // Initialize K

fetch('https://pydolarve.org/api/v2/dollar?page=bcv')
    .then(response => response.json())
    .then(data => {
        if (data && data.monitors && data.monitors.usd && data.monitors.usd && data.monitors.usd.price) {
            // Guarda el precio del USD en BCV y en K
            let BCV = parseFloat(data.monitors.usd.price);
            K = BCV; // Asigna BCV a K
            // Recalcula los resultados con el nuevo valor de K
            calculateResults();
        }
    })
    .catch(error => {
        console.error('Error fetching BCV USD value:', error);
    });

function calculateResults() {
    // Get the input value (X)
    const inputNumber = document.getElementById('inputNumber').value;
    const X = parseFloat(inputNumber);

    // Get references to the result labels
    const labelA = document.getElementById('labelA');
    const labelK = document.getElementById('labelK');
    const labelB = document.getElementById('labelB');
    const labelC = document.getElementById('labelC');

    // Check if the input is a valid number
    if (isNaN(X) || inputNumber.trim() === '') {
        // If not a number or empty, clear the results
        labelA.textContent = '0';
        labelK.textContent = K.toString(); // Still show K
        labelB.textContent = '0';
        labelC.textContent = '0';
        return; // Exit the function
    }

    // Calculate A: X * 1.4
    const A = X * 1.4;
    labelA.textContent = A.toFixed(2); // Display with 2 decimal places

    // Display K (constant value)
    labelK.textContent = K.toString();

    // Calculate B: X * K
    const B = X * K;
    labelB.textContent = B.toFixed(2);

    // Calculate C: A * K
    const C = A * K;
    labelC.textContent = C.toFixed(2);
}

// Initial calculation when the page loads to display K
document.addEventListener('DOMContentLoaded', calculateResults);