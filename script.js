const form = document.getElementById('set-form');

const loggedSets = []; // Array to store logged sets

function renderSets() {
    const list = document.getElementById('sets-list');
    list.innerHTML = ""; // Clear the list before rendering

    loggedSets.forEach(function (set) {
        const li = document.createElement('li');
        li.textContent = `${set.exercise}: ${set.weight} lbs x ${set.reps} reps`;
        list.appendChild(li);
    })
}
// Call renderSets initially to display any existing sets

form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle form submission

    const exercise = document.getElementById('exercise-input').value;
    const weight = document.getElementById('weight-input').value;
    const reps = document.getElementById('reps-input').value;
    // Validate the input values (e.g., check if they are numbers, not empty, etc.)

    const newSet = {
        exercise: exercise,
        weight: Number(weight),
        reps: Number(reps)
    };
    // Store the new set in an array or send it to a server

    loggedSets.push(newSet);
    renderSets();
    // Update the UI to display the new set

    console.log(loggedSets);
    // Clear the form inputs after submission
});