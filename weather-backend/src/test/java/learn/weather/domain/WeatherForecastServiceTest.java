package learn.weather.domain;

import learn.weather.data.WeatherForecastRepository;
import learn.weather.models.WeatherForecast;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.swing.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class WeatherForecastServiceTest {

    @Autowired
    WeatherForecastService service;

    @MockBean
    WeatherForecastRepository repository;

    @Test
    void shouldFindById() {
        WeatherForecast forecast = makeForecast();
        when(repository.findById(1)).thenReturn(forecast);
        WeatherForecast actual = service.findById(1);
        assertEquals(forecast, actual);
    }

    @Test
    void shouldAddWhenValid() {
        WeatherForecast expected = makeForecast();
        WeatherForecast arg = makeForecast();
        arg.setWeatherForecastId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<WeatherForecast> result = service.add(arg);
        assertEquals(ActionStatus.SUCCESS, result.getStatus());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        //forecastId is 1
        WeatherForecast forecast = makeForecast();
        Result<WeatherForecast> result = service.add(forecast);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        forecast.setWeatherForecastId(0);
        forecast.setName(null);
        result = service.add(forecast);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        forecast.setName("Test");
        forecast.setLatitude(300);
        result = service.add(forecast);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        forecast.setLatitude(30);
        forecast.setLongitude(300);
        result = service.add(forecast);
        assertEquals(ActionStatus.INVALID, result.getStatus());

        forecast.setLongitude(-111);
        forecast.setWeatherCollectionId(0);
        result = service.add(forecast);
        assertEquals(ActionStatus.INVALID, result.getStatus());
    }

    private WeatherForecast makeForecast() {
        WeatherForecast forecast = new WeatherForecast();
        forecast.setWeatherForecastId(1);
        forecast.setName("Test");
        forecast.setNotes("Test Notes");
        forecast.setLatitude(36.615528);
        forecast.setLongitude(-105.597803);
        forecast.setWeatherCollectionId(1);
        return forecast;
    }
}
