// Untuk menampilkan video pada latar belakang
const video = document.getElementById('background-video');

video.addEventListener('canplay', () => {
  video.play();
});

video.addEventListener('error', () => {
  console.error('Error playing video');
});

//  Saran pencarian
function showSuggestions() {
    const input = document.getElementById('search').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    const data = getData();
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';

    if (input.length === 0) {
        return;
    }

    // Ambil saran berdasarkan input kata
    let suggestions = data.map(item => item.word)
        .filter(word => word.toLowerCase().startsWith(input))
        .slice(0, 5);

    if (suggestions.length === 0) {
        // Jika tidak ada kata, cari dalam kalimat
        suggestions = data.flatMap(item => item.sentences.map(s => s.sentence))
            .filter(sentence => sentence.toLowerCase().startsWith(input))
            .slice(0, 5);
    }

    if (suggestions.length > 0) {
        suggestionsDiv.style.display = 'block';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.onclick = () => {
                document.getElementById('search').value = suggestion;
                showNextSuggestions(suggestion);
            };
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

function showNextSuggestions(selected) {
    const input = selected.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    const data = getData();
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'none';

    let suggestions = data.flatMap(item => item.sentences.map(s => s.sentence))
        .filter(sentence => sentence.toLowerCase().startsWith(input) && sentence.toLowerCase() !== input)
        .slice(0, 5);

    if (suggestions.length > 0) {
        suggestionsDiv.style.display = 'block';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.onclick = () => {
                document.getElementById('search').value = suggestion;
                showNextSuggestions(suggestion);
            };
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

// Search
function search() {
    const query = document.getElementById("search").value.toLowerCase();
    console.log("Query:", query); // Memeriksa nilai input
    const data = getData();
    console.log('Data',data); // Memeriksa data yang diambil
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ''; // Kosongkan hasil sebelumnya
    
    data.forEach(item => {
        if (item.word.toLowerCase().includes(query)) {
            item.sentences.forEach(sentence => {
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result");

                // Menambahkan kalimat
                const sentenceEl = document.createElement("h2");
                sentenceEl.textContent = sentence.sentence;
                resultDiv.appendChild(sentenceEl);

                // Menambahkan informasi
                const infoEl = document.createElement("p");
                infoEl.textContent = sentence.information;
                resultDiv.appendChild(infoEl);

                // Menambahkan gambar
                if (sentence.image) {
                    const imgEl = document.createElement("img");
                    imgEl.src = sentence.image;
                    imgEl.classList.add("img-fluid"); // Menggunakan class Bootstrap untuk responsive image
                    resultDiv.appendChild(imgEl);
                }

                // Menambahkan video (YouTube iframe)
                if (sentence.video) {
                    const videoEl = document.createElement("iframe");
                    videoEl.width = "560";
                    videoEl.height = "315";
                    videoEl.src = `https://www.youtube.com/embed/${sentence.video}`;
                    videoEl.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    videoEl.allowFullscreen = true;
                    resultDiv.appendChild(videoEl);
                }

                // Append hasil pencarian ke container
                resultsContainer.appendChild(resultDiv);
            });
        }
    });
}
