const inpSearch = document.getElementById('inpSearch');
const findBookButton = document.getElementById('findBookButton');
const clearResultButton = document.getElementById('clearResultButton');
const resultDiv = document.getElementById('result');


inpSearch.addEventListener('input', function () {
    if (inpSearch.value.trim() === '') {
        resultDiv.innerHTML = '';
        findBookButton.disabled = true;
    }
    else {
        findBookButton.disabled = false;
    }
});



const Books = [
    {
        Category: "ROMAN",
        Id: 1,
        Fiction_Genres: [
            {
                Genre: "Polisiye",
                Id: 1,
                BooksOf: [
                    { BookName: "Bedenin Dili", Id: 1, Author: "Allan Pease", PublicationDate: 1981 },
                    { BookName: "Düşünce Gücüyle Tedavi", Id: 2, Author: "Joseph Murphy", PublicationDate: 1963 },
                    { BookName: "Psikoloji ve İnsan Davranışı", Id: 3, Author: "B.F. Skinner", PublicationDate: 1953 },
                    { BookName: "Gelişen Zihin", Id: 4, Author: "Daniel Goleman", PublicationDate: 1995 }
                ]
            },
            {
                Genre: "Dram",
                Id: 2,
                BooksOf: [
                    { BookName: "Suç ve Ceza", Id: 1, Author: "Fyodor Dostoyevski", PublicationDate: 1866 },
                    { BookName: "Sefiller", Id: 2, Author: "Victor Hugo", PublicationDate: 1862 },
                    { BookName: "Korku ve Düşünceler", Id: 3, Author: "William Shakespeare", PublicationDate: 1600 },
                    { BookName: "Yüzyıllık Yalnızlık", Id: 4, Author: "Gabriel García Márquez", PublicationDate: 1967 }
                ]
            },
            {
                Genre: "Psikoloji",
                Id: 3,
                BooksOf: [
                    { BookName: "Sherlock Holmes", Id: 1, Author: "Arthur Conan Doyle", PublicationDate: 1892 },
                    { BookName: "Cinayet Alfabesi", Id: 2, Author: "Agatha Christie", PublicationDate: 1967 },
                    { BookName: "Kayıp Zamanın Peşinde", Id: 3, Author: "John Grisham", PublicationDate: 1997 },
                    { BookName: "Zamanın Kıskacı", Id: 4, Author: "Dan Brown", PublicationDate: 2009 }
                ]
            }
        ]
    },
    {
        Category: "MASAL",
        Id: 2,
        Fiction_Genres: [
            {
                Genre: "Tür 1",
                Id: 1,
                BooksOf: [
                    { BookName: "Küçük Prens", Id: 1, Author: "Antoine de Saint-Exupéry", PublicationDate: 1943 },
                    { BookName: "Pamuk Prenses ve Yedi Cüceler", Id: 2, Author: "Grimm Kardeşler", PublicationDate: 1812 },
                    { BookName: "Ağaç Evdeki Masallar", Id: 3, Author: "Roald Dahl", PublicationDate: 1981 },
                    { BookName: "Çizmeli Kedi", Id: 4, Author: "Charles Perrault", PublicationDate: 1697 }
                ]
            },
            {
                Genre: "Tür 2",
                Id: 2,
                BooksOf: [
                    { BookName: "Hansel ve Gretel", Id: 1, Author: "Grimm Kardeşler", PublicationDate: 1812 },
                    { BookName: "Kırmızı Başlıklı Kız", Id: 2, Author: "Charles Perrault", PublicationDate: 1697 },
                    { BookName: "Uyuyan Güzel", Id: 3, Author: "Charles Perrault", PublicationDate: 1697 },
                    { BookName: "Çirkin Ördek Yavrusu", Id: 4, Author: "Hans Christian Andersen", PublicationDate: 1843 }
                ]
            },
            {
                Genre: "Tür 3",
                Id: 3,
                BooksOf: [
                    { BookName: "Altın Yumurtlayan Tavuk", Id: 1, Author: "Aesop", PublicationDate: 600 },
                    { BookName: "Rapunzel", Id: 2, Author: "Grimm Kardeşler", PublicationDate: 1812 },
                    { BookName: "Aladdin ve Sihirli Lamba", Id: 3, Author: "One Thousand and One Nights", PublicationDate: 1700 },
                    { BookName: "Cinderella", Id: 4, Author: "Grimm Kardeşler", PublicationDate: 1812 }
                ]
            }
        ]
    }
];





//---------------------------------------------------------
// Kitap arama fonksiyonu

function SearchBook() {
    let query = inpSearch.value.trim().toLowerCase();
    let result = '';
    let found = false;
    Books.forEach(kitaplar => {
        kitaplar.Fiction_Genres.forEach(turler => {
            turler.BooksOf.forEach(kitapAdi => {
                if (kitapAdi.BookName.toLowerCase().includes(query)) {
                    const okSimgesi = '\u2935'
                    result += `<p><strong>${kitapAdi.BookName}</strong><br>
                    kitap bilgileri ${okSimgesi}<br>
                    Kitap Türü : ${kitaplar.Category} > ${turler.Genre}<br>
                    Kitap Yazarı : ${kitapAdi.Author}<br>
                    Yayımlanma yılı : ${kitapAdi.PublicationDate}
                    </p>`;
                    found = true;
                }
            });
        });
    })
    if (found) {
        resultDiv.innerHTML = result;
    }
    else {
        resultDiv.innerHTML = 'Kitap bulunamadı.'
    }
}

findBookButton.addEventListener('click', SearchBook);

clearResultButton.addEventListener('click', function () {
    resultDiv.innerHTML = '';
    inpSearch.value = '';
    findBookButton.disabled = true;
});





// -------------------------------------------------------

// Kitapları bulduktan sonra bu bilgiyi ilgili rafın içine yerleştireceğiz.
function showBookLocation(bookName) {
    let found = false;
    Books.forEach(category => {
        category.Fiction_Genres.forEach(genre => {
            genre.BooksOf.forEach((book, index) => {
                if (book.BookName.toLowerCase().includes(bookName.toLowerCase())) {
                    found = true;
                    let genreName = genre.Genre;
                    let shelfId = category.Category === "ROMAN" ? "romance-shelf" : "fairy-tale-shelf";
                    let bookSlot = document.createElement("div");
                    bookSlot.classList.add("book-slot", "found");
                    bookSlot.innerHTML = `${book.BookName} - ${genreName} ${genre.Id}.Raf
                     ${book.Id}. Bölümünde`;

                    // Kitap yerini doğru rafta göster.
                    document.getElementById(shelfId).appendChild(bookSlot);
                }
            });
        });
    });

    if (!found) {
        alert("Kitap bulunamadı!");
    }
}

// Kullanıcı "Kitap Bul" butonuna tıkladığında kitabı göster
findBookButton.addEventListener('click', function () {
    let bookName = inpSearch.value.trim();
    showBookLocation(bookName);
});
