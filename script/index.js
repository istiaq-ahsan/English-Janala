const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displaylessons(json.data));
};

loadLessons();

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-full group">

    <!-- Word -->
    <div class="space-y-2">
      <h2 class="font-bold text-2xl text-gray-800 group-hover:text-sky-600 transition">
        ${word.word ? word.word : "শব্দ পাওয়া যায়নি"}
      </h2>

      <p class="text-sm text-gray-500">Meaning / Pronunciation</p>

      <p class="text-lg font-medium text-gray-700 font-bangla">
        ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} 
        <span class="text-gray-400">/</span> 
        ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex justify-between items-center mt-6">

      <button 
        onclick="loadWordDetail(${word.id})"
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition"
      >
        <i class="fa-solid fa-circle-info"></i>
        <span class="text-sm font-medium">Details</span>
      </button>

      <button 
        onclick="pronounceWord('${word.word}')"
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition"
      >
        <i class="fa-solid fa-volume-high"></i>
        <span class="text-sm font-medium">Speak</span>
      </button>

    </div>
  </div>
`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displaylessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
    `;

    levelContainer.append(btnDiv);
  }
};
