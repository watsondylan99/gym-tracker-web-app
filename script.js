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

function getWeightReccommendation(exercise, loggedSets, targetLow, targetHigh) {
    const mostRecentSet = getMostRecentSet(exercise, loggedSets);

    if(mostRecentSet === null) {
        return "No history yet - log a set to get a recommendation!";
    } // If the most recent set's reps are greater than or equal to the target high, suggest increasing the weight

    if (mostRecentSet.reps >= targetHigh) {
        const newWeight = mostRecentSet.weight + 5;
        return `Last time: ${mostRecentSet.weight} lbs x ${mostRecentSet.reps} reps. Try increasing to ${newWeight} lbs.`;
    } // If the most recent set's reps are less than the target low, suggest decreasing the weight

    if (mostRecentSet.reps < targetLow) {
        const newWeight = mostRecentSet.weight - 5;
        return `Last time: ${mostRecentSet.weight} lbs x ${mostRecentSet.reps} reps. Consider decreasing to ${newWeight} lbs.`;
    } // If the most recent set's reps are within the target range, suggest staying at the same weight and aiming for more reps

    return `Last time: ${mostRecentSet.weight} lbs x ${mostRecentSet.reps} reps. Stay at ${mostRecentSet.weight} lbs and aim for more reps.`;
}

function getMostRecentSet(exercise, loggedSets) {
    const setsForThisExercise = loggedSets.filter(function (set) {
        return set.exercise === exercise;
    });

    if (setsForThisExercise.length === 0) {
        return null;
    }

    return setsForThisExercise[setsForThisExercise.length - 1];
} // Add an event listener to the form to handle submission

const exerciseInput = document.getElementById('exercise-input');

exerciseInput.addEventListener('blur', function () {
    const exercise = exerciseInput.value;
    if (exercise === "") return;

    const recommendation = getWeightReccommendation(exercise, loggedSets, 8, 12);
    document.getElementById('recommendation').textContent = recommendation; //
});

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