$(document).ready(function() {
    if(localStorage.getItem('data') !== null) {
        $('.creds').css('display', 'none');
        data = localStorage.getItem('data');
        data = JSON.parse(data);
        $('.profile').css('display', 'flex');
        showLoadingOverlay('Getting Your Attendence...');
        getdetails(data.username, data.password)
            .done((data, textStatus, jqXHR) => {
                hideLoadingOverlay();
                if (jqXHR.status === 200) {
                    localStorage.setItem('data', JSON.stringify({ "username": username, "password": password }));
                    loaddata(data);
                } else {
                    alert('Invalid username or password ..');
                }
            })
            .fail(() => {
                hideLoadingOverlay();
                alert('Invalid username or password ..');
            });
    }
    else {
        $('.creds').css('display', 'flex');
        $('.profile').css('display', 'none');
}
});

const getdetails = (username, password) => {
    return $.ajax({
        url: 'https://parulattendanceapi.vercel.app',
        type: 'POST',
        data: JSON.stringify({ "admin": username, "password": password }),
        contentType: 'application/json'
    });
};

const showLoadingOverlay = (text) => {
    $('#loadingText').text(text);
    $('#loadingOverlay').css('display', 'flex');
};

const hideLoadingOverlay = () => {
    $('#loadingOverlay').css('display', 'none');
};



const loaddata = (data) =>{
    let html = `
                <h1>Attendence</h1>
                <h4>Present Slots : ${data.present_slots}</h4>
                <h4>Absent Slots : ${data.absent_slots}</h4>
                <h4>Total Slots : ${data.total_slots}</h4>
                <h4>Percentage : ${data.percent_age}</h4>
    `;
    $('.attendence').html(html);
    $('.stdname').text(data.name);
    $('pic').src = data.image;
}


const logout = () => {
    localStorage.removeItem('data');
    $('.creds').css('display', 'flex');
    $('.profile').css('display', 'none');
}
const login = () => {
    const username = $('#username').val();
    const password = $('#password').val();
    if (username.length != '' && password !== '') {
        showLoadingOverlay('Logging in...');
        getdetails(username, password)
            .done((data, textStatus, jqXHR) => {
                hideLoadingOverlay();
                if (jqXHR.status === 200) {
                    localStorage.setItem('data', JSON.stringify({ "username": username, "password": password }));
                    loaddata(data);
                    $('.creds').css('display', 'none');
                    $('.profile').css('display', 'flex');
                } else {
                    alert('Invalid username or password ..');
                }
            })
            .fail(() => {
                hideLoadingOverlay();
                alert('Invalid username or password ..');
            });
    } else {
        alert('Enter username and password');
    }
};