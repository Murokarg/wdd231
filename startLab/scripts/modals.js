const openBtn1 = document.querySelector("#openBtn1");
const openBtn2 = document.querySelector("#openBtn2");
const openBtn3 = document.querySelector("#openBtn3");


const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogBox div");
const closeBtn = document.querySelector("#closeBtn");

// "Show the dialog" button opens the dialog modally
openBtn1.addEventListener("click", () => {
    dialogBoxText.innerHTML="An apple has 95 calories."
    dialogBox.showModal();
});

openBtn2.addEventListener("click", () => {
    dialogBoxText.innerHTML="An orange has 45 calories."
    dialogBox.showModal();
});

openBtn3.addEventListener("click", () => {
    dialogBoxText.innerHTML="A banana has 105 calories."
    dialogBox.showModal();
});




// "Close" button closes the dialog
closeBtn.addEventListener("click", () => {
    dialogBox.close();
});

