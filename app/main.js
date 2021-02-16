


const filterTerm = location.search.replace("?s=", "");

window.addEventListener('load', () => {
    nightOn();
    initFormEvents();
    initTweetEvents();
    renderTweets();
    resetAllTweets();
    initModalFormEvents();
    initialModalEvent();
    renderMenuItemsAsLi()
});


const nightOn = () => {

    let buttonNight = document.querySelector('.on_off_night')
    let bodyNight = document.querySelector('.twitter');
    let menuNight = document.querySelector('.menu_tw');
    let shadowNight = document.querySelector('.collection_tweets');
    let modalNight = document.querySelector('.modal_tweet .modal_holder');

    let nightModeOn = false;

    let nightOn = () => {
        bodyNight.classList.add('night');
        menuNight.classList.add('night');
        shadowNight.classList.add('night');
        buttonNight.classList.add('night');
        modalNight.classList.add('night');
        nightModeOn = true;
    };

    let nightOff = () => {
        bodyNight.classList.remove('night');
        menuNight.classList.remove('night');
        shadowNight.classList.remove('night');
        buttonNight.classList.remove('night');
        modalNight.classList.remove('night');
        nightModeOn = false;
    };

    buttonNight.addEventListener('click', () => {
        if (!nightModeOn) {
            nightOn();
        } else {
            nightOff();
        }
    });
}


let tweets = [{
    text: "Mi primer tweet, olé olé !!!!!!",
    likes: 12,
    retweets: 0,
    comments: 0,
    userId: 0
}];

const initFormEvents = () => {
    let form = document.forms.new;
    let textArea = form.elements.new_tweet;

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (textArea.value != '') {
            tweets.unshift({
                text: textArea.value,
                likes: 0,
                retweets: 0,
                comments: 0,
                dateCreation: new Date(), 
                userId: Math.floor(Math.random() * twitterData.userData.length)
            });
        };

        form.reset();
        trendingToppic01();
        renderTweets();

    });

    // textArea.addEventListener('keyup', () => {
    //     console.log(textArea.value.length);
    //     if (textArea.value.length > 280){
    //         return false;
    //     }
    // });
};


const renderTweets = () => {

    let othersTweets = document.querySelector('.others_tweets');
    let HTMLString = '';
    

    tweets
    .filter(tweet => tweet.text.includes(filterTerm))
    .forEach(tweet  => {
        // const user = twitterData.userData.find(user => user.id == tweet.userId);
        let sUser = {};
        twitterData.userData.forEach(user => {
            if (user.id == tweet.userId) {
                sUser = user;
            }
        })

        HTMLString+= `
        <div class="tweet_into_collection">
                    <div class="user_tweet">
                        <img src="assets/imagenes/elsa.png" alt="">
                    </div>
                    <div class="tweet_user">
                        <div class="name_user">${sUser.userName} <span class="ec ec-sparkles"></span> <span class="ident">@elsa_reina_frouzen</span><span class="hour_tweet">- 6h</span></div>
                        <div class="tweet">
                          <div class="all_tweet">${tweet.text}</div>
                          <div class="interaction_tweet">
                            <span class="fa fa-comment"><span class="counter">${tweet.comments}</span></span>
                            <span class="fa fa-retweet"><span class="counter">${tweet.retweets}</span></span>
                            <span class="fa fa-heart"><span class="counter">${tweet.likes}</span></span>
                            <span class="fa fa-edit"></span>
                            <span class="fa fa-trash-alt"></span>
                          </div>  
                        </div>
                    </div>
        </div>
        `;
    });


    othersTweets.innerHTML = HTMLString;
    initTweetEvents();
    renderTweetsAmount();
};

const initTweetEvents = () => {

    let tweetsDom = document.querySelectorAll('.tweet_into_collection');
    // console.log(tweetsDom);

    tweetsDom.forEach((tweetDom, i) => {
        // borrar
        let trash = tweetDom.querySelector('.fa-trash-alt');
        trash.addEventListener('click', () => {
            tweets.splice(i, 1);
            renderTweets();
        });

        //likes
        let likes = tweetDom.querySelector('.fa-heart');
        likes.addEventListener('click', () => {
            tweets[i].likes++;
            renderTweets();
        });

        //retweets
        let retweet = tweetDom.querySelector('.fa-retweet');
        // let rt = tweetDom;
        // console.log(rt);
        // let rtOn = () => {
        //     rt.classList.add('rt');
        // };
        retweet.addEventListener('click', () => {
            tweets[i].retweets++;
            tweets.unshift(tweets[i]);
            // rtOn();
            // console.log(tweets[i]);
            renderTweets();
        });

        //comments
    });
};

const renderTweetsAmount = () => {
    let amount = tweets.length;
    let amountDom = document.querySelector('.explore .num_tweets .num_cont');

    let HTMLString = `${amount} tweets`;

    amountDom.innerHTML = HTMLString;
};

const resetAllTweets = () => {
    let resetDom = document.querySelector('.explore .num_tweets .trush_all_tweets');
    resetDom.addEventListener('click', () => {
        tweets.splice(0);
        renderTweets();
    });
}

const initModalFormEvents = () => {
    let form = document.forms.new_modal;
    let textArea = form.elements.new_tweet;

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (textArea.value != '') {
            tweets.unshift({
                text: textArea.value,
                likes: 0,
                retweets: 0,
                comments: 0,
                dateCreation: new Date(),
                userId: Math.floor(Math.random() * twitterData.userData.length)
            });
        };

        form.reset();
        let windowModal = document.querySelector(".modal_tweet");
        closeModal(windowModal);
        
        renderTweets();

    });
};

const openModal = (windowModal) => {
    windowModal.classList.add('opened');
    document.body.style.overflow = "hidden";
};

const closeModal = (windowModal) => {
    windowModal.classList.remove('opened');
    document.body.style.overflow = "";
};

const initialModalEvent = () => {
    let toggleModal = document.querySelector(".menu .tweet");
    let windowModal = document.querySelector(".modal_tweet");
    let closeModalX = document.querySelector(".modal_header .close_modal");
    let closeModalOverlay = document.querySelector(".overlay");

    toggleModal.addEventListener('click', () => {
        // windowModal.classList.add('opened');
        // document.body.style.overflow = "hidden";
        openModal(windowModal);
    });

    closeModalX.addEventListener('click', () => {
        // windowModal.classList.remove('opened');
        // document.body.style.overflow = "";
        closeModal(windowModal);
    });

    closeModalOverlay.addEventListener('click', () => {
        // windowModal.classList.remove('opened');
        // document.body.style.overflow = "";
        closeModal(windowModal);
    });

    initModalFormEvents()
};

// MENU 

const renderMenuItemsAsLi = () => {
    let menuItemsAsLi = "";

    for (let i = 0; i < twitterData.lateralMenu.length; i++) {
        menuItemsAsLi += `
            <li><a class="menu_a ${twitterData.lateralMenu[i].localitation}" href="#"><span class="fa ${twitterData.lateralMenu[i].icon}"></span>${twitterData.lateralMenu[i].category}</a></li>
        `;
    }

    const ulMenu = document.querySelector('.into_menu .menu_tw ul');
    ulMenu.innerHTML = menuItemsAsLi;

};

// TRENDIG TOPPIC

const trendingToppic01 = () => {

    let trend = tweets[0].text.split(` `);
    let trendArray = [];

    for (let i = 0; i < trend.length; i++) {
            trendArray.push(trend[i]); 
    };

    // trendArray.value_counts();

    console.log(trendArray);
    
}
trendingToppic01();
