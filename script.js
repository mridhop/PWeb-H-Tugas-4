$(document).ready(function(){
    // Fungsi untuk menampilkan data cuaca berdasarkan jam yang dipilih
    function displayWeatherData(hourSelected) {
        // API dari https://open-meteo.com/
        $.getJSON("https://api.open-meteo.com/v1/forecast?latitude=-7.289&longitude=112.7987&hourly=temperature_2m,precipitation_probability&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok", function(data) {
            // Isi dropdown dengan opsi jam yang tersedia
            data.hourly.time.forEach(function(hour, index) {
                // Ubah Unix timestamp ke format yang mudah dibaca
                var formattedTime = new Date(hour * 1000).toLocaleString();
                $('#hour-select').append($('<option>', {
                    value: index,
                    text: formattedTime
                }));
            });

            if (hourSelected !== undefined) {
                // Tampilkan data cuaca berdasarkan jam yang dipilih
                var temperature = data.hourly.temperature_2m[hourSelected];
                var probabilityOfRain = data.hourly.precipitation_probability[hourSelected]; // Asumsi ada field 'rain_probability'
                var selectedTime = new Date(data.hourly.time[hourSelected] * 1000).toLocaleString();

                $('#weather-info').html(
                    "Tanggal dan Jam: " + selectedTime + "<br>" +
                    "Suhu: " + temperature + "°C<br>" +
                    "Kemungkinan Hujan: " + probabilityOfRain + "%<br>"
                );
            }
        });
    }

    // Panggil fungsi saat halaman dimuat
    displayWeatherData();

    // Ketika tombol "Tampilkan Cuaca" diklik, tampilkan data cuaca untuk jam yang dipilih
    $('#fetch-weather').click(function() {
        var selectedHourIndex = $('#hour-select').val();
        displayWeatherData(selectedHourIndex);
    });
});
