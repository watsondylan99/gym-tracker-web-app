const form = document.getElementById('set-form');

const savedSets = localStorage.getItem('loggedSets');
const loggedSets = savedSets ? JSON.parse(savedSets) : [];

function saveSets() {
    localStorage.setItem('loggedSets', JSON.stringify(loggedSets));
} // Render the logged sets in the list

function renderSets() {
    const list = document.getElementById('sets-list');
    list.innerHTML = "";

    loggedSets.forEach(function (set) {
        const li = document.createElement('li');
        li.textContent = `${set.exercise}: ${set.weight} lbs x ${set.reps} reps`;
        list.appendChild(li);
    })
} // Check if the new set is a personal record (PR) for the exercise

function isNewWeightPR(newSet, loggedSets) {
    const setsForThisExercise = loggedSets.filter(function (set) {
        return set.exercise === newSet.exercise;
    });

    if (setsForThisExercise.length === 0) {
        return true;
    }

    const weights = setsForThisExercise.map(function (set) {
        return set.weight;
    });

    const heaviestWeight = Math.max(...weights);

    return newSet.weight > heaviestWeight;
} // Handle form submission to log a new set

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise-input').value;
    const weight = document.getElementById('weight-input').value;
    const reps = document.getElementById('reps-input').value;

    const newSet = {
        exercise: exercise,
        weight: Number(weight),
        reps: Number(reps)
    }; // Check if the new set is a personal record (PR) for the exercise

    const isPR = isNewWeightPR(newSet, loggedSets); // Add the new set to the logged sets, save to localStorage, and render the updated list

    loggedSets.push(newSet);
    saveSets();
    renderSets(); // Alert the user if the new set is a personal record (PR) for the exercise

    if (isPR) {
        alert(`New PR! ${newSet.weight} lbs on ${newSet.exercise}`);
    } // Log the updated logged sets to the console for debugging purposes

    console.log(loggedSets);
});

renderSets();