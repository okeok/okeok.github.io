const findPGameRoot = document.querySelector('.find-p-game');

const findPGameGridSizeFromAttr = parseInt(findPGameRoot.getAttribute('data-findpgame-col'));
const findPGameCardFinalTextFromAttr = findPGameRoot.getAttribute('data-win-text');
const findPGameCardCoverStyleFromAttr = findPGameRoot.getAttribute('data-findpgame-cover');
const findPGameCardRestartBtnTextFromAttr = findPGameRoot.getAttribute('data-restart-btn');

let findPGameImgsArray = [];
let findPGameCardBackArrayOfKeys = [];

let strForGridStyle = '';
let howManyCardsAreOpen = 0;
const findPGameGridSizeDefault = 4;
const findPGameCardFinalTextDefault = 'You win!';
const findPGameCardRestartBtnTextDefault = 'Restart';
const findPGameArrayOfColorsOfCardsWithoutImg = ['#FDFF99', '#21EA00', '#FF0000', '#FF6AE7', '#00FFD1', '#FFA800', '#FAFF00', '#093E00', '#6BFFE4', '#FF3D00', '#FF00A8', '#706DFF', '#FF8585', '#6EC500', '#FFA5E0', '#003E3A', '#5F0000'];
let findPGameArrayOfColorsOfCardsWithoutImgIndex = 0;

let findPGameGridSize;
let firstSelectedCardElem;
let findPGameCardFinalText;
let findPGameCardCoverStyle;
let findPGameCardRestartBtnText;

//set grid columns
if (findPGameGridSizeFromAttr) {
    if (findPGameGridSizeFromAttr % 2 == 0) {
        findPGameGridSize = findPGameGridSizeFromAttr;
    }
    else {
        findPGameGridSize = findPGameGridSizeFromAttr + 1;
    }
}
else {
    findPGameGridSize = findPGameGridSizeDefault;
}
for (let i = 0; i < findPGameGridSize; i++) {
    strForGridStyle += '1fr ';
}
//set cover background
if (findPGameCardCoverStyleFromAttr) {
    if (findPGameCardCoverStyleFromAttr[0] == '#') {
        findPGameCardCoverStyle = 'background: ' + findPGameCardCoverStyleFromAttr;
    }
    else {
        findPGameCardCoverStyle = 'background-image: url(' + findPGameCardCoverStyleFromAttr + ')';
    }
}
//set restart button text
if (findPGameCardRestartBtnTextFromAttr) {
    findPGameCardRestartBtnText = findPGameCardRestartBtnTextFromAttr;
}
else {
    findPGameCardRestartBtnText = findPGameCardRestartBtnTextDefault;
}
//set restart win text
if (findPGameCardFinalTextFromAttr) {
    findPGameCardFinalText = findPGameCardFinalTextFromAttr;
}
else {
    findPGameCardFinalText = findPGameCardFinalTextDefault;
}

//create array with information about squares
for (let i = 0; i < Math.pow(findPGameGridSize, 2) / 2; i++) {
    //create img square
    if (findPGameRoot.getElementsByTagName('img')[i]) {
        findPGameImgsArray.push([findPGameRoot.getElementsByTagName('img')[i].getAttribute('src'), i]);
    }
    //create color square
    else {
        findPGameImgsArray.push([findPGameArrayOfColorsOfCardsWithoutImg[findPGameArrayOfColorsOfCardsWithoutImgIndex], i]);
        findPGameArrayOfColorsOfCardsWithoutImgIndex++;
    }
}

//create final screen
const findPGameFinalScreen = document.createElement('div');
findPGameFinalScreen.classList.add('find-p-game__final')
const findPGameFinalText = document.createElement('div');
findPGameFinalText.classList.add('find-p-game__text')
const findPGameFinalBtn = document.createElement('button');
findPGameFinalBtn.classList.add('find-p-game__restart')
findPGameFinalText.innerHTML = findPGameCardFinalText;
findPGameFinalBtn.innerHTML = findPGameCardRestartBtnText;
findPGameFinalBtn.addEventListener('click', () => {
    createGame();
});
findPGameFinalScreen.appendChild(findPGameFinalText);
findPGameFinalScreen.appendChild(findPGameFinalBtn);

const createGame = () => {
    //create array with pairs
    findPGameImgsArray = findPGameImgsArray.concat(findPGameImgsArray)

    //shuffle findPGameImgsArray
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(findPGameImgsArray)

    //clear root
    findPGameRoot.innerHTML = '';
    findPGameRoot.classList.remove('find-p-game_win');

    //create grid with cards
    const findPGameCardGrid = document.createElement('div');
    findPGameCardGrid.classList.add('find-p-game__grid');
    findPGameCardGrid.style.gridTemplateColumns = strForGridStyle;
    for (let i = 0; i < Math.pow(findPGameGridSize, 2); i++) {
        const findPGameCard = document.createElement('div');
        const findPGameCardCover = document.createElement('div');

        let findPGameCardImg;
        if (findPGameImgsArray[i][0][0] != '#') {
            findPGameCardImg = document.createElement('img');
            findPGameCardImg.setAttribute('src', findPGameImgsArray[i][0]);
        }
        else {
            findPGameCardImg = document.createElement('div');
            findPGameCardImg.classList.add('find-p-game__color');
            findPGameCardImg.style.background = findPGameImgsArray[i][0];
        }

        findPGameCard.classList.add('find-p-game__card');
        findPGameCard.setAttribute('data-findpgame', findPGameImgsArray[i][1]);
        findPGameCardCover.classList.add('find-p-game__cover');

        if (findPGameCardCoverStyle) {
            findPGameCardCover.style.cssText = findPGameCardCoverStyle;
        }

        findPGameCard.appendChild(findPGameCardCover);
        findPGameCard.appendChild(findPGameCardImg);
        findPGameCardGrid.appendChild(findPGameCard);

        /*addEventListener*/

        findPGameCard.addEventListener('click', function () {
            openPGameCard(findPGameCard);
        });

        findPGameCardBackArrayOfKeys.push(findPGameImgsArray[i][1].toString());
    }

    findPGameRoot.appendChild(findPGameCardGrid);


    //main game logic
    const openPGameCard = (elem) => {
        if (firstSelectedCardElem != elem && findPGameCardBackArrayOfKeys.includes(elem.getAttribute('data-findpgame'))) {
            if (howManyCardsAreOpen == 1) {
                howManyCardsAreOpen = 2;
                elem.classList.add('find-p-game__card_open');

                setTimeout(() => {
                    if (firstSelectedCardElem.getAttribute('data-findpgame') != elem.getAttribute('data-findpgame')) {
                        elem.classList.remove('find-p-game__card_open');
                        firstSelectedCardElem.classList.remove('find-p-game__card_open');
                        howManyCardsAreOpen = 0;
                    }

                    else {
                        howManyCardsAreOpen = 0;
                        findPGameCardBackArrayOfKeys = findPGameCardBackArrayOfKeys.filter((i) => { return i != elem.getAttribute('data-findpgame') });

                        //Victory!
                        if (findPGameCardBackArrayOfKeys.length == 0) {
                            findPGameRoot.classList.add('find-p-game_win');
                            findPGameRoot.appendChild(findPGameFinalScreen);
                        }
                    }
                }, 1000);
            }
        }

        if (howManyCardsAreOpen < 1) {
            elem.classList.add('find-p-game__card_open');
            firstSelectedCardElem = elem;
            howManyCardsAreOpen = 1;
        }
    }
}

//_ready 
createGame();