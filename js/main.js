document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const objTabs = {
        content: document.querySelectorAll('.tabcontent'),
        contentName: document.querySelectorAll('.tabheader__item'),

        startTabs: function() {
            this.content.forEach((item) => {
                item.style.display = 'none';
            });
            
            this.content[0].style.display ='';

            this.contentName.forEach((item, i) => {
                item.addEventListener('click', () => {
                    item.classList.add('tabheader__item_active');
                    this.content[i].style.display = '';

                    for (let j = 0; j < 4; j++) {                        
                        if (i == j) {
                            continue;
                        } else {
                           this.contentName[j].classList.remove('tabheader__item_active');
                           this.content[j].style.display = 'none';
                            
                        }
                    }
                });
            });
        }
    };
    
    objTabs.startTabs();
});