function loadChart1(response){
    var labels = response.data.map(function(e) {
        return e.category;
    });
    var data = response.data.map(function(e) {
        return e.totalamount;
    });

    var config = {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
         label: 'Category',
         data: data,
         backgroundColor: 'rgba(0, 119, 204, 0.3)'
      }]
    }
    };

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, config);
}

function loadChart() {
    var config = {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, config)
}
