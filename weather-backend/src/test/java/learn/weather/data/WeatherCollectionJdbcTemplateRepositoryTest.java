package learn.weather.data;

import learn.weather.models.WeatherCollection;
import learn.weather.models.WeatherForecast;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WeatherCollectionJdbcTemplateRepositoryTest {
    final static int NEXT_ID = 3;

    @Autowired
    WeatherCollectionJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByUserId() {
        List<WeatherCollection> actual = repository.findByUserId(1);
        assertEquals(2, actual.size());
        assertEquals("Utah Speedflying", actual.get(1).getName());
        assertEquals(2, actual.get(0).getForecasts().size());
        assertEquals("Pyramid", actual.get(0).getForecasts().get(0).getName());

        actual = repository.findByUserId(10);
        assertEquals(0, actual.size());
    }

    @Test
    void shouldFindById() {
        WeatherCollection collection = repository.findById(1);
        assertEquals(1, collection.getWeatherCollectionId());
        assertEquals("Utah Base Jumping", collection.getName());
        assertEquals(1, collection.getUserId());
        assertEquals("Pyramid", collection.getForecasts().get(0).getName());

        collection = repository.findById(10);
        assertNull(collection);
    }

    @Test
    void shouldAdd() {
        WeatherCollection collection = makeCollection();
        WeatherCollection actual = repository.add(collection);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getWeatherCollectionId());

        collection = makeCollection();
        collection.setDescription(null);
        actual = repository.add(collection);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getWeatherCollectionId());
    }

    @Test
    void shouldUpdate() {
        WeatherCollection collection = makeCollection();
        collection.setWeatherCollectionId(1);
        assertTrue(repository.update(collection));
        collection.setWeatherCollectionId(10);
        assertFalse(repository.update(collection));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(1));
    }

    private WeatherCollection makeCollection() {
        WeatherCollection collection = new WeatherCollection();
        collection.setName("Test");
        collection.setDescription("Test Description");
        collection.setUserId(1);
        return collection;
    }
}
