const box = document.querySelector('.box');
const colorPicker = document.querySelector('.picker');
let rowDiv;
let bgColor;
let child;

// column
function cols(col) {
  for (let j = 0; j < col; j++) {
    rows(col);
  }
};

// row
function rows(row) {
  for (let i = 0; i < row ; i++) {
      let rowDiv = document.createElement('div');
      rowDiv.style.border = '1px solid #999999';
      rowDiv.style.width = `calc(100% / ${row})`;
      rowDiv.style.height = `calc(100% / ${row})`;
      
      rowDiv.classList.add('childDivs');
      box.appendChild(rowDiv);

      child = document.querySelectorAll('.childDivs');
      
      colorPicker.addEventListener('input', () => {
        bgColor = colorPicker.value;
      });

      rowDiv.addEventListener('mouseover', () => {
        rowDiv.style.backgroundColor = `${bgColor}`;
      })

  }
};

// Default draw
const defaultMode = document.querySelector('.pencil');
defaultMode.addEventListener('click', () =>{
  child.forEach(rowDiv => {
    rowDiv.addEventListener('mouseover', () => {
      rowDiv.style.backgroundColor = colorPicker.value;
    })
  })
})

// Rainbow effect
const random = document.querySelector('.random')
random.addEventListener('click', () => {
  child.forEach(rowDiv => {
    rowDiv.addEventListener('mouseover', () => {
      rowDiv.style.backgroundColor = randomRGB();
    })
  })
});

function randomRGB() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

// Eraser
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
  child.forEach(rowDiv => {
    rowDiv.addEventListener('mouseover', () => {
      rowDiv.style.backgroundColor = '#fff';
    })
  })
})

// Reset
const reset = document.querySelector('.reset')
reset.addEventListener('click', () => {
  child.forEach(rowDiv => {
    rowDiv.style.backgroundColor = '#fff';
  })
})

// grid size slider
const gridSize = document.querySelector('.slider');
let values = document.querySelectorAll('.size');

values.forEach(span => {
  span.textContent = gridSize.value;
});

gridSize.addEventListener('input', () => {
  values.forEach(span => {
    span.textContent = gridSize.value;
});

box.innerHTML = '';
const size = gridSize.value;
cols(size);

});
cols(gridSize.value);


//Export your work!
document.querySelector('.export').addEventListener('click', () => {
  const container = document.querySelector('.box');

  html2canvas(container).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'odin-sketch.jpg';
    link.click();
  })
})

