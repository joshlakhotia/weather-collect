package learn.weather.data;

import learn.weather.models.WeatherForecast;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WeatherForecastJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 5;

    @Autowired
    WeatherForecastJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        WeatherForecast forecast = repository.findById(1);

        assertEquals(1, forecast.getWeatherForecastId());
        assertEquals("Pyramid", forecast.getName());
        assertEquals(1, forecast.getWeatherCollectionId());

        forecast = repository.findById(10);
        assertNull(forecast);
    }

    @Test
    void shouldFindByCollectionId() {
        List<WeatherForecast> actual = repository.findByCollectionId(1);

        assertEquals(2, actual.size());
        assertEquals("Black Dragon", actual.get(1).getName());

        actual = repository.findByCollectionId(10);
        assertEquals(0, actual.size());
    }

    @Test
    void shouldAdd() {
        WeatherForecast forecast = makeForecast();
        WeatherForecast actual = repository.add(forecast);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getWeatherForecastId());

        forecast = makeForecast();
        forecast.setNotes(null);
        actual = repository.add(forecast);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getWeatherForecastId());
    }

    @Test
    void shouldUpdate() {
        WeatherForecast forecast = makeForecast();
        forecast.setWeatherForecastId(1);
        assertTrue(repository.update(forecast));
        forecast.setWeatherForecastId(10);
        assertFalse(repository.update(forecast));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.delete(1));
        assertFalse(repository.delete(1));
    }

    private WeatherForecast makeForecast() {
        WeatherForecast forecast = new WeatherForecast();
        forecast.setName("Test");
        forecast.setNotes("Test Notes");
        forecast.setLatitude(36.615528);
        forecast.setLongitude(-105.597803);
        forecast.setWeatherCollectionId(1);
        return forecast;
    }
}
