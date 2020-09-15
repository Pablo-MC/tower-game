let row = document.querySelector('.row');
let reset = document.querySelector('.reset');
let modes = document.querySelectorAll('.mode');

let colors = [];
let difficulty = 5;  // Inicio en modo Easy


init(difficulty);

function init (n) {
   setupSquares(n);
   setupEventSquares();
}

function setupSquares (n) {
   for (let i = 0; i < n; i++) {
      colors = generateMixedColors((n*2)-(i*2))
      for (let j = 0; j < ((n*2) - (i * 2)); j++) {
         row.insertAdjacentHTML('afterbegin', `<div class="square" color="${colors[j]}"></div>`);                       
      }     
      row.insertAdjacentHTML('afterbegin', '<div></div>'); // Salto de línea
   }
   row.insertAdjacentHTML('afterbegin', '<i class="far fa-smile icon-face"></i>');
}

function setupEventSquares () {
   let squares = document.querySelectorAll('.square');
   let iconSmile = document.querySelector('.fa-smile');

   squares.forEach(square => {
      square.addEventListener('click', () => {
         if (square.getAttribute('color').match('green')) {
            square.classList.add('green');
         } else {
            // Pinto todos los cuadrados de rojo
            squares.forEach(square => { square.classList.add('red') })
            // Elimino icono ganador y agrego en su lugar el icono perdedor 
            iconSmile.style.display = 'none';
            row.insertAdjacentHTML('afterbegin', '<i class="far fa-sad-tear icon-face"></i>');
         }
      })
   })
}

function clearAll() {
   let squares = document.querySelectorAll('.square');
   let icons = document.querySelectorAll('.far');

   squares.forEach(square => { square.remove() });
   icons.forEach(icon => { icon.remove() });
}

// Retorna un arreglo con n elementos desordenados. OBS: Contiene la misma cantidad de elementos 'green' y 'red'.
function generateMixedColors (n) {
   let arr = [];
   for (let i = 0; i < n; i++) {
      (i < (n/2)) ? arr[i] = 'green' : arr[i] = 'red';         
   }
   return mix(arr);
}

// Retorna un arreglo desordenado
function mix (arr) {
   for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
   }
   return arr;
}


reset.addEventListener('click', () => {
   clearAll();
   init(difficulty);
})

modes.forEach(mode => {
   mode.addEventListener('click', () => {
      switch (mode.textContent) {
         case 'Easy': difficulty = 5; break;
         case 'Medium': difficulty = 7; break;
         case 'Hard': difficulty = 9; break;
         default:
            break;
      }
      clearAll();
      init(difficulty);   
   })
})


// Funcionalidad del audio
let soundBtn = document.querySelector('.icon-sound');
let audio = document.getElementsByTagName('audio')[0];

soundBtn.addEventListener('click', () => {  
   if (soundBtn.getAttribute('class').match('fa-music')) {
      soundBtn.classList.remove('fa-music');
      soundBtn.classList.add('fa-pause-circle');
      audio.play();
   } else {
      soundBtn.classList.remove('fa-pause-circle');
      soundBtn.classList.add('fa-music');
      audio.pause();
   }
})


// Visión de la solución.
// let solution = document.querySelector('.test');

// solution.addEventListener('click', () => {
//    let squares = document.querySelectorAll('.square');
//    squares.forEach(square => { 
//       square.style.backgroundColor = square.getAttribute('color') });
// })