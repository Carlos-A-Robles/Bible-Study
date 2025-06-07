const openBibleButton = document.getElementById('bibleImage');
const openBibleImage = document.getElementById('openBibleButton');
const button = document.getElementById('verse-box');

const versesToStudy = [
    {
        reference: "John 3:16",
        text: "For God so loved the world, that He gave His only begotten son, that whoever believes in him shall not perish, but have everlasting life."
    },
    {
        reference: "Romans 8:28",
        text: "And we know that for those who love God all things work together for good, for those who are called according to His purpose,"
    },
    {
        reference: "2 Timothy 3:16",
        text: "All Scripture is God breathed and useful for teaching, rebuking, correcting and training in righteousness."
    }
]


function showRandomVerse() {
    const randomVerse = Math.floor(Math.random() * versesToStudy.length);
    const verse = versesToStudy[randomVerse];
    const verseBox = document.getElementById('verse-box');
    verseBox.textContent = verse.reference + ": " + verse.text;
}

function openBible() {
    const bibleImage = document.getElementById('bibleImage');
    bibleImage.src = 'bibleOpen.jpg'; // Make sure this file exists
    alert('Listen to God and His word!');
    const verseBox = document.getElementById('verse-box');
    verseBox.style.display = 'block';  // show the verse box
    showRandomVerse();                 // update verse text
    return;
}

function closeBible() {
    const bibleImage = document.getElementById('bibleImage');
    bibleImage.src = 'bibleClosed.jpg';
    alert('Take care and may God bless you.');
    const verseBox = document.getElementById('verse-box');
    verseBox.style.display = 'none';    // hide the verse box
    return;
}

fetch('api/verses')
    .then(response => response.json())
    .then(data => {
        console.log('Verses from DB: ', data);
        //Dipslay verses in your HTML as you want, e.g.:
        const container = document.getElementById('verses-container');
        data.forEach(verse => {
            const p = document.createElement('p');
            p.textContent = `${verse.book}:${verse.chapter} ${verse.verse_number} - ${verse.text}`;
            container.appendChild(p);
        });
    })

    .catch(err => console.error('Error fetching verses: ', err));
    