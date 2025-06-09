const gallery = document.querySelector('#gallery_img');

const gallerySelect = document.querySelector('#gallery_select_animals');

const gallery_loader = document.querySelector('#gallery_loader');

document.querySelector('#gallery_button_load-img').addEventListener('click', (event) => {
    
    event.preventDefault();
    
    gallery.classList.add('none')
    
    gallery.innerHTML = '';
    
    gallery_loader.classList.remove('none');

    
    let apiUrl
   
    switch (gallerySelect.value) {
        
        case 'cats':
            apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10'
            break        
        case 'dogs':
            apiUrl = 'https://dog.ceo/api/breeds/image/random/10';
            break
    }

    
    fetch(apiUrl)        
        .then(response => {           
            if (!response.ok) {
                throw new Error(`Упс. Ошибка: ${response.status}`);
            }           
            return response.json();
        })

        
        .then(data => {           
            function getUrlDogs(data) {
                try {
                    if (data.message) {
                        return data.message
                    }
                }
                catch (error) {
                    console.log('Упс. Ошибка при выполнении функции getUrlDogs(data): ', error)
                }
            }
            
            function getUrlCats(data) {
                try {                    
                    const arrUrlCats = []
                    
                    if (data) {
                        data.forEach(obj => {
                            if (obj.url) {
                                arrUrlCats.push(obj.url)
                            }
                        })
                        return arrUrlCats
                    }
                }
                catch (error) {
                    console.log('Ошибка при выполнении функции getUrlCats(data): ', error)
                }
            }

            const imagesUrl = gallerySelect.value === 'dogs' ? getUrlDogs(data) : getUrlCats(data);
            let numberImagesUrl = imagesUrl.length
            let counterLoadedImg = 0

            imagesUrl.forEach(imageUrl => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery_img_item');


                const image = new Image();
                image.src = imageUrl;
                image.alt = 'Картинки животных';
                image.onload = function () {
                    counterLoadedImg = counterLoadedImg + 1


                    console.log(`Картинок загружено: ${counterLoadedImg} из ${numberImagesUrl}`)


                    if (counterLoadedImg === numberImagesUrl) {
                        gallery_loader.classList.add('none');
                        gallery.classList.remove('none')
                        console.log('Картинки успешно загружены')
                    }
                }
                galleryItem.appendChild(image);
                gallery.appendChild(galleryItem);
            });
        })

        .catch(error => {
            console.error('Упс. Ошибка', error);
        })
        .finally(() => {
            console.log('Ссылки на картинки успешно получены')
        });
})

