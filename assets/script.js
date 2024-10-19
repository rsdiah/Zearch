// Untuk menampilkan video pada latar belakang
const video = document.getElementById('background-video');

video.addEventListener('canplay', () => {
  video.play();
});

video.addEventListener('error', () => {
  console.error('Error playing video');
});

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const characterInput = document.getElementById("character-input");
const wordSelectInput = document.getElementById("word-input");
const sentenceSelectInput = document.getElementById("sentence-input");
const button = document.getElementById('btn');

const outputInformation = document.querySelector('.output-information');

let dataTemp = getData();

// fungsi untuk menampil opsi kata 
function showWordOption(character) {
  wordSelectInput.innerHTML = '';
  let option = document.createElement("option");
  option.innerText = "-- pilih kata --";
  wordSelectInput.append(option);

  // Memfilter kata yang ditampilkan pada opsi
  // Hanya menampilkan kata yang berawalannya sama dengan character
  dataTemp.filter(words => {
    if(words.word[0].toLowerCase() === character.toLowerCase()) {
      let wordOption = document.createElement("option");
      wordOption.innerText = words.word;
      wordSelectInput.append(wordOption);
    }
  })
}

// fungsi untuk menampilkan opsi kalimat
function showSentenceOption(word) {
  sentenceSelectInput.innerHTML = '';
  let option = document.createElement("option");
  option.innerText = "-- pilih kalimat --";
  sentenceSelectInput.append(option);

  // Memfilter kalimat yang ditampilkan pada opsi, sesuai dengan masukan kata/word
  dataTemp.filter(e => e.word === word)[0].sentences
    .map(sentence => {
      let sentenceOption = document.createElement("option");
      sentenceOption.innerText = sentence.sentence;
      sentenceSelectInput.append(sentenceOption);
    })
}

// fungsi untuk menampilkan semua informasi, deskripsi, gambar, dan video
function showInformation() {
  let word = wordSelectInput.value;
  let sentence = sentenceSelectInput.value

  let isWord = word === '-- pilih kata --';
  let isSentence = sentence === '-- pilih kalimat --';


  outputInformation.classList.add('hide');

  if(isSentence) return false;

  outputInformation.classList.remove('hide');

  let sentenceInformation = dataTemp.filter(data => {
    return word === data.word;
  })[0].sentences.filter(data => {
    return sentence === data.sentence;
  })[0]

  const titleInformation = document.getElementById('information-title');
  const descInformation = document.getElementById('information-desc');
  const imageInformation = document.getElementById('information-image');
  const videoInformation = document.getElementById('information-video');

  titleInformation.innerText = sentenceInformation.sentence;
  descInformation.innerText = sentenceInformation.information;
  imageInformation.src = sentenceInformation.image;
  videoInformation.src =`https://www.youtube.com/embed/${sentenceInformation.video}`;
}

// fungsi yang bekerja saat character di-input
characterInput.addEventListener("input", (e) => {
  outputInformation.classList.add('hide');
  showWordOption(e.target.value);
  sentenceSelectInput.innerHTML = "<option>-- pilih kalimat --</option>"
})

// fungsi yang bekerja saat memilih opsi kata
wordSelectInput.addEventListener("change", e => {
  showSentenceOption(e.target.value)
})

// fungsi yang bekerja saat button diklik
// maka fungsi tersebut akan memanggil fungsi ShowInformation()
button.addEventListener('click', () => {
  showInformation();
})
