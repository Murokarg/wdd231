const capturedInfo = new URLSearchParams(window.location.search);

// console.log(capturedInfo.get('firstname'));
// console.log(capturedInfo.get('lastname'));

document.querySelector('#fullName').innerHTML = `${capturedInfo.get('firstname')} ${capturedInfo.get('lastname')}`
document.querySelector('#email').innerHTML = `${capturedInfo.get('email')}`
document.querySelector('#phone').innerHTML = `${capturedInfo.get('phone')}`
document.querySelector('#businessName').innerHTML = `${capturedInfo.get('businessname')}`
document.querySelector('#membership').innerHTML = `${capturedInfo.get('membership')}`
document.querySelector('#timestamp').innerHTML = `${capturedInfo.get('timestamp')}`
document.querySelector('#orgtitle').innerHTML = `${capturedInfo.get('orgtitle')}`
document.querySelector('#description').innerHTML = `${capturedInfo.get('description')}`
