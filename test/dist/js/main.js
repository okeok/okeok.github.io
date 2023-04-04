const ranges = document.querySelectorAll('.range'); 

function setInputRange(e) {
    let target = e.target;

    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    target.closest('.range-wrap').querySelector('.range-output').innerHTML = val + 'px';
}

ranges.forEach(input => {
    input.addEventListener('input', setInputRange);
})

/*ready*/
ranges.forEach(elem => {
    const min = elem.min;
    const max = elem.max;
    const val = elem.value;
    elem.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    elem.closest('.range-wrap').querySelector('.range-output').innerHTML = val + 'px';
})